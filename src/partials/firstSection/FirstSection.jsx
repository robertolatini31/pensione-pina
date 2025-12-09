import React from "react";
import "./FirstSection.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FirstSection = () => {
  return (
    <div className="first-section-container section">
      <div className="text-wrapper">
        <h2 className="subtitle">
          Cari colleghi, la tanto attesa chiamata è arrivata!
        </h2>
        <h1 className="title">Vado in pensione!</h1>
      </div>
      <img className="wow-img avatar-pina" src="/assets/woohoo.webp" />
      <FontAwesomeIcon icon="fa-solid fa-arrow-down" />
    </div>
  );
};

export default FirstSection;
