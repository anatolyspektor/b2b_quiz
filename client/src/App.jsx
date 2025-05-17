import React, { useState } from "react";
import { OptInResponsive } from "./components/optin";
import { QuizResponsive } from "./components/quiz";
import { ResultsResponsive } from "./components/results";

function App() {
  const [view, setView] = useState("optin");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState("");

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      {view === "optin" && (
        <OptInResponsive onNext={() => setView("quiz")} />
      )}

      {view === "quiz" && (
        <QuizResponsive
          onComplete={(answers) => {
            setAnswers(answers);
            setUserName(answers.name || "");
            setEmail(answers.email || "");
            
            setView("results");
          }}
        />
      )}

      {view === "results" && (
        <ResultsResponsive
          name={userName}
          email={email}
          answers={answers}
          result={result}
        />
      )}
    </div>
  );
}

export default App;
