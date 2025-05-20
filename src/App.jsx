import React, { useState } from "react";
import { OptInResponsive } from "./components/optin";
import { QuizResponsive } from "./components/quiz";
import { ResultsResponsive } from "./components/results";

function App() {
  const [view, setView] = useState("optin");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [zone, setZone] = useState("");
  const [color, setColor] = useState("");
  const [workHrs, setWorkHrs] = useState(null);
  const [bleedPerWeek, setBleedPerWeek] = useState(null);
  const [chokePoints, setChokePoints] = useState([]);
  const [chokePointsHTML, setChokePointsHTML] = useState([]);

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      {view === "optin" && (
        <OptInResponsive onNext={() => setView("quiz")} />
      )}

      {view === "quiz" && (
        <QuizResponsive
          onComplete={(data) => {
            setUserName(data.name || "");
            setEmail(data.email || "");
            setAnswers(data.answers);
            setScore(data.score);
            setZone(data.zone);
            setColor(data.color);
            setWorkHrs(data.workHrs);
            setBleedPerWeek(data.bleedPerWeek);
            setChokePoints(data.chokePoints);
            setChokePointsHTML(data.chokePointsHTML);
            setView("results");
          }}
        />
      )}

      {view === "results" && (
        <ResultsResponsive
          name={userName}
          email={email}
          answers={answers}
          score={score}
          zone={zone}
          color={color}
          workHrs={workHrs}
          bleedPerWeek={bleedPerWeek}
          chokePoints={chokePointsHTML}
        />
      )}
    </div>
  );
}

export default App;
