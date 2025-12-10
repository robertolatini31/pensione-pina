import React, { useEffect, useRef, useState } from "react";
import "./ThirdSection.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Champagne from "../../assets/Champagne.webp";

const ThirdSection = () => {
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

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="third-section"
      ref={sectionRef}
      className="third-section-container section"
    >
      <img
        className={`wow-img avatar-pina ${visible ? "visible" : ""}`}
        src={Champagne}
      />

      <div className="wrapper-text">
        <p className="text">
          Per celebrare questo momento speciale, ho organizzato una piccola
          festa di pensionamento presso <strong>Trattoria Zi Maria</strong> al
          Sasso, il <strong>09/01/2026</strong> alle ore <strong>19:30</strong>.
          Sarebbe davvero bello condividere questa serata con te!
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

      <a className="link" href="#form-section">
        <FontAwesomeIcon icon="fa-solid fa-arrow-down" />
      </a>
    </div>
  );
};

export default ThirdSection;
