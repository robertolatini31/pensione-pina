import React from "react";
import "./FirstSection.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import woohoo from "../../assets/woohoo.webp";

const FirstSection = () => {
  return (
    <div id="first-section" className="first-section-container section">
      <div className="text-wrapper">
        <h2 className="subtitle">
          Cari colleghi, la tanto attesa chiamata è arrivata!
        </h2>
        <h1 className="title">Vado in pensione!</h1>
      </div>
      <img className="wow-img avatar-pina" src={woohoo} />
      <a className="link" href="#second-section">
        <FontAwesomeIcon icon="fa-solid fa-arrow-down" />
      </a>
    </div>
  );
};

export default FirstSection;
