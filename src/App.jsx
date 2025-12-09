import React, { useState, useEffect } from "react";
import "./index.scss";
import FirstSection from "./partials/firstSection/FirstSection";
import SecondSection from "./partials/secondSection/SecondSection";
import ThirdSection from "./partials/thirdSection/ThirdSection";
import FormSection from "./partials/formSection/FormSection";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import FireworksOverlay from "./components/fireworksOverlay/FireworksOverlay";

library.add(fas, far, fab);

const App = () => {
  const [showFw, setShowFw] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Dopo 5s fai partire il fade-out
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 5000);

    // Dopo altri 800ms rimuovi totalmente i fuochi
    const removeTimer = setTimeout(() => {
      setShowFw(false);
    }, 5800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <div className="app-container">
      {showFw && (
        <FireworksOverlay
          autorun
          intensity={2}
          fadeOut={fadeOut}
          zIndex={99999}
        />
      )}
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FormSection />
    </div>
  );
};

export default App;
