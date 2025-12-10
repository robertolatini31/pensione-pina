import React, { useEffect, useRef, useState } from "react";
import "./SecondSection.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import espressodrink from "../../assets/espressodrink.webp";

const SecondSection = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      {
        threshold: 0.7,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      id="second-section"
      ref={sectionRef}
      className="second-section-container section"
    >
      <div className="text-wrapper text">
        <h2 className="subtitle">Il lavoro finisce, ma l'amicizia resta.</h2>
        Grazie di aver fatto parte di questo viaggio, grazie di ogni parola
        gentile, per l'aiuto, per la pazienza e per le pause caffè.
      </div>

      <img
        className={`wow-img avatar-pina ${visible ? "visible" : ""}`}
        src={espressodrink}
      />

      <a className="link" href="#third-section">
        <FontAwesomeIcon icon="fa-solid fa-arrow-down" />
      </a>
    </div>
  );
};

export default SecondSection;
