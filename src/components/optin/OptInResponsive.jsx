import React from "react";
import { isMobile } from "react-device-detect";
import OptInDesktop from "./OptInDesktop";
import OptInMobile from "./OptInMobile";

export default function OptInResponsive({ onNext }) {
  return isMobile ? <OptInMobile onNext={onNext} /> : <OptInDesktop onNext={onNext} />;
}
