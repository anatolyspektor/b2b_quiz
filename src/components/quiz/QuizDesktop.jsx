import React, { useState } from "react";
import questions from "../../questions";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { saveCustomer } from "../../utils/saveCustomer";
import { trackEvent } from "../../utils/trackEvent";
import { getSessionId } from "../../utils/getSessionId";
import { sendSlackEmailAdded } from "@/utils/slack"
import { generateScorecard, getChokePoints} from "@/utils/quizUtils";

export default function QuizDesktop({ onComplete }) {
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [finalAnswers, setFinalAnswers] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const currentQuestion = questions[step];
  const TOTAL_QUESTIONS = questions.length;

  const sessionId = getSessionId();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleAnswer = (option) => {
    const value = option.label; // ✅ Use option.label
    let updatedAnswers = { ...answers };

    if (currentQuestion.multi) {
      const currentVals = updatedAnswers[currentQuestion.field] || [];
      const exists = currentVals.includes(value);
      updatedAnswers[currentQuestion.field] = exists
        ? currentVals.filter((v) => v !== value)
        : [...currentVals, value];
    } else {
      updatedAnswers[currentQuestion.field] = value;
    }

    setAnswers(updatedAnswers);

    if (!currentQuestion.multi && currentQuestion.type !== "text") {
      if (step + 1 === TOTAL_QUESTIONS) {
        setFinalAnswers(updatedAnswers);
        setIsQuizFinished(true);
      } else {
        setStep((prev) => prev + 1);
      }
    }
    trackEvent({
      event: `quiz_step_${step + 1}`,
      sessionId,
      device: "desktop",
      metadata: {
        question: currentQuestion?.question,
        answer: value,
    },
});
  };

  const handleBack = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };

const handleFinalSubmit = async ({ sessionId, name, email }) => {
  if (name && isValidEmail(email)) {
    const scorecard = generateScorecard(answers);
    const chokePointsHTML = getChokePoints(answers);

    await saveCustomer({
      name,
      email,
      sessionId,
      device: "desktop",
      answers,
      ...scorecard,
    });

    await sendSlackEmailAdded({
      session_id: sessionId,
      name,
      email,
      answers,
      ...scorecard,
    });

    onComplete({
      name,
      email,
      answers,
      ...scorecard,
      sessionId,
      chokePointsHTML, // only for frontend
    });

    trackEvent({
      event: "quiz_complete",
      sessionId,
      device: "desktop",
      metadata: answers,
    });
  }
};



  const isSelected = (value) => {
    const val = answers[currentQuestion?.field];
    return currentQuestion?.multi
      ? Array.isArray(val) && val.includes(value)
      : val === value;
  };

  if (isQuizFinished) {
    return (
      <section className="min-h-screen flex items-center justify-center px-8 py-10" style={{ backgroundColor: "#275659" }}>
        <div className="w-full max-w-4xl bg-white/5 backdrop-blur px-8 py-10 text-center shadow-sm rounded-lg">
          <h2 className="text-4xl mb-6 leading-snug text-[#F1FDED]">
            If you get <strong>DISCONNECTED</strong>, where should we send the results?
          </h2>
          <input
            type="text"
            placeholder="Your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-6 w-full rounded-md border px-4 py-4 text-xl shadow-sm placeholder-white"
            style={{ color: "#F1FDED", borderColor: "#F1FDED", backgroundColor: "transparent" }}
          />
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-4 w-full rounded-md border px-4 py-4 text-xl shadow-sm placeholder-white"
            style={{ color: "#F1FDED", borderColor: "#F1FDED", backgroundColor: "transparent" }}
          />
        <button
          onClick={() =>
            handleFinalSubmit({
              sessionId,
              name,
              email,
            })
          }
          disabled={!name || !isValidEmail(email)}
          className="mt-6 w-full rounded-md px-6 py-5 text-white text-2xl font-semibold transition disabled:opacity-50"
          style={{ backgroundColor: "#FF5C5C" }}
        >
          See My Results
        </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-8 py-1" style={{ backgroundColor: "#275659" }}>
      <div className="w-full max-w-3xl px-8 py-12 text-center shadow-sm rounded-lg">
        <div className="mb-10">
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${((step + 1) / TOTAL_QUESTIONS) * 100}%`,
                backgroundColor: "#FF8257",
              }}
            ></div>
          </div>
          <p className="mt-3 text-lg text-[#F1FDED]">
            Question {step + 1} of {TOTAL_QUESTIONS}
          </p>
        </div>

        <h2 className="text-4xl font-bold mb-12 leading-snug text-[#F1FDED]">
          {currentQuestion.question}
        </h2>

        {currentQuestion.type === "text" ? (
          <div className="flex flex-col items-center space-y-8">
            <input
              type="text"
              className="bg-white w-full max-w-xl rounded-md px-4 py-4 text-xl text-[#275659] font-semibold focus:outline-none"
              placeholder="Type your answer here..."
              value={answers[currentQuestion.field] || ""}
              onChange={(e) =>
                setAnswers({
                  ...answers,
                  [currentQuestion.field]: e.target.value,
                })
              }
            />
            <button
              onClick={() => {
                if (step + 1 === TOTAL_QUESTIONS) {
                  setFinalAnswers(answers);
                  setIsQuizFinished(true);
                } else {
                  setStep((prev) => prev + 1);
                }
              }}
              className="text-[#F1FDED] text-xl font-medium hover:text-orange-300 transition"
            >
              Continue
            </button>
          </div>
        ) : (
          <div
            className={`grid gap-y-6 gap-x-4 ${
              currentQuestion.options?.length > 4 ? "grid-cols-2" : "grid-cols-4"
            }`}
          >
            {currentQuestion.options.map((opt) => (
              <button
                key={opt.label} // ✅ use label as key
                onClick={() => handleAnswer(opt)} // ✅ pass full option object
                className={`w-full rounded-md px-6 py-5 text-lg font-semibold hover:opacity-90 transition ${
                  isSelected(opt.label) ? "ring-2 ring-offset-2 ring-white" : ""
                }`}
                style={{ backgroundColor: "#FF8257", color: "#F1FDED" }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {step > 0 && (
          <div className="mt-10 text-left">
            <button
              onClick={handleBack}
              className="text-[#F1FDED] text-base hover:text-orange-300 transition flex items-center gap-2"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              <span className="font-medium">Back</span>
            </button>
          </div>
        )}

        {currentQuestion.multi && (
          <div className="mt-1 text-center">
            <button
            onClick={() => {
                if (step + 1 === TOTAL_QUESTIONS) {
                  setFinalAnswers(answers);
                  setIsQuizFinished(true);
                } else {
                  setStep((prev) => prev + 1);
                }
              }}
            disabled={
              !Array.isArray(answers[currentQuestion.field]) ||
              answers[currentQuestion.field].length === 0
            }
                        className="mt-6 w-full rounded-md px-6 py-5 text-white text-2xl font-semibold transition disabled:opacity-50"
            style={{ backgroundColor: "#FF5C5C" }}
          >
             Next Question
          </button>
          </div>
        )}
      </div>
    </section>
  );
}
