
import React, { useState } from "react";
import questions from "../../questions";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { saveCustomer } from "../../utils/saveCustomer";
import { trackEvent } from "../../utils/trackEvent";
import { getSessionId } from "../../utils/getSessionId";
import { sendSlackEmailAdded } from "@/utils/slack"
import { generateScorecard, getChokePoints} from "@/utils/quizUtils";
import { trackFbEvent } from "@/utils/fbPixel";
import { sendToKlaviyo } from "@/utils/sendToKlaviyo";
import EmailGateMobile from "./EmailGateMobile";

export default function QuizMobile({ onComplete }) {
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [finalAnswers, setFinalAnswers] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const currentQuestion = questions[step];
  const TOTAL_QUESTIONS = questions.length;

  const sessionId = getSessionId();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleAnswer = (option) => {
    const value = option.label;
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
      device: "mobile",
      metadata: {
        question: currentQuestion?.question,
        answer: value,
      },
    });

    trackFbEvent('AnswerSelected', {
      question: currentQuestion?.question,
      answer: value
    });
  };

  const handleBack = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };

  const handleFinalSubmit = async ({ sessionId, name, email }) => {
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");

    const scorecard = generateScorecard(answers);
    const { score, zone, color, workHrs, bleedPerWeek } = scorecard;
    const chokePointsHTML = getChokePoints(answers);

    await saveCustomer({
      name,
      email,
      sessionId,
      device: "mobile",
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

    sendToKlaviyo({ name, email, score, zone, workHrs, bleedPerWeek, revenue: answers.revenue, chokePoints: chokePointsHTML.join("\n") });

    onComplete({
      name,
      email,
      answers,
      ...scorecard,
      sessionId,
      chokePointsHTML,
    });

    trackEvent({
      event: "quiz_complete",
      sessionId,
      device: "mobile",
      metadata: answers,
    });

    trackFbEvent('Lead', {
      content_name: '2 Minute Quiz',
      email,
    });
  };

  const isSelected = (value) => {
    const val = answers[currentQuestion?.field];
    return currentQuestion?.multi
      ? Array.isArray(val) && val.includes(value)
      : val === value;
  };

  if (isQuizFinished) {
    const scorecard = generateScorecard(finalAnswers); // make sure this exists or move from submit handler
    const chokePointsHTML = getChokePoints(answers);

    return (
      <EmailGateMobile
        name={name}
        email={email}
        setName={setName}
        setEmail={setEmail}
        error={error}
        onSubmit={() => handleFinalSubmit({ sessionId, name, email })}

        // 👇 preview data
        score={scorecard.score}
        zone={scorecard.zone}
        color={scorecard.color}
        workHrs={scorecard.workHrs}
        bleedPerWeek={scorecard.bleedPerWeek}
        chokePoints={chokePointsHTML}
      />
    );
  }


  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-10" style={{ backgroundColor:"#0f373c"}}>
      <div className="w-full px-2 py-8 text-center">
        <div className="mb-30">
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${((step + 1) / TOTAL_QUESTIONS) * 100}%`,
                backgroundColor: "#FF5C5C",
              }}
            ></div>
          </div>
          <p className="mt-5 text-4xl text-[#F1FDED]">
            Question {step + 1} of {TOTAL_QUESTIONS}
          </p>
        </div>

        <h2 className="text-6xl font-bold mt-5 mb-10 leading-snug text-[#F1FDED]">
          {currentQuestion.question}
        </h2>

        {currentQuestion.type === "text" ? (
          <div className="flex flex-col items-center space-y-10">
            <input
              type="text"
              className="bg-white w-full rounded-md px-4 py-3 text-base text-[#275659] font-semibold focus:outline-none"
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
              className="text-[#F1FDED] text-base font-medium hover:text-orange-300 transition"
            >
              Continue
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-y-4">
            {currentQuestion.options.map((opt) => (
              <button
                key={opt.label}
                onClick={() => handleAnswer(opt)}
                className={`w-full rounded-2xl px-6 py-6 text-5xl mt-10 transition ${
                  isSelected(opt.label) ? "ring-2 ring-offset-2 ring-white" : ""
                }`}
                style={{ backgroundColor: "#FF5C5C", color: "#F1FDED" }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {step > 0 && (
          <div className="mt-20 text-left">
            <button
              onClick={handleBack}
              className="text-[#F1FDED] text-5xl flex items-center gap-2"
            >
              <ArrowLeftIcon className="h-10 w-10" />
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
            className="mt-6 w-full rounded-md px-10 py-10 text-white text-6xl font-semibold transition disabled:opacity-50"
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
