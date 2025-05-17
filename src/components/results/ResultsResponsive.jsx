import React from "react";
import { isMobile } from "react-device-detect";
import ResultsDesktop from "./ResultsDesktop";
import ResultsMobile from "./ResultsMobile";

export default function ResultsResponsive(props) {
  return isMobile ? <ResultsMobile {...props} /> : <ResultsDesktop {...props} />;
}