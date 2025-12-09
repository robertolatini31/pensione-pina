import React from "react";
import "./ThirdSection.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Champagne from "../../assets/Champagne.webp";

const ThirdSection = () => {
  return (
    <div className="third-section-container section">
      <img className="wow-img avatar-pina" src={Champagne} />
      <div className="wrapper-text">
        <p className="text">
          Per festeggiare ho pensato di organizzare una festa di pensionamento
          presso: Trattoria Zi Maria al sasso. Il 09/01/2026 alle ore 19:30. Ci
          terrei molto alla vostra presenza.
        </p>
        <div className="links-wrapper">
          <a
            className="link cta"
            href="https://www.trattoriazimaria.com/"
            target="_blank"
          >
            👀 Vedi location
          </a>
          <a
            className="link cta"
            href="https://maps.app.goo.gl/UfvviZ3KAbrc4Fx1A"
            target="_blank"
          >
            📍 Posizione
          </a>
        </div>
      </div>
      <FontAwesomeIcon icon="fa-solid fa-arrow-down" />
    </div>
  );
};

export default ThirdSection;
