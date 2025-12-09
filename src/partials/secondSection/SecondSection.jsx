import React from "react";
import "./SecondSection.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SecondSection = () => {
  return (
    <div className="second-section-container section">
      <div className="text-wrapper text">
        <h2 className="subtitle">Il lavoro finisce, ma l'amicizia resta.</h2>
        Grazie di aver fatto parte di questo viaggio, grazie di ogni parola
        gentile, per l'aiuto, per la pazienza e per le pause caffè.
      </div>
      <img className="wow-img avatar-pina" src="/assets/thankyou.webp" />
      <FontAwesomeIcon icon="fa-solid fa-arrow-down" />
    </div>
  );
};

export default SecondSection;
