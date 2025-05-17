import React from "react";
import { isMobile } from "react-device-detect";
import QuizMobile from "./QuizMobile";
import QuizDesktop from "./QuizDesktop";

export default function QuizResponsive({ onComplete }) {
  return isMobile ? (
    <QuizMobile onComplete={onComplete} />
  ) : (
    <QuizDesktop onComplete={onComplete} />
  );
}
