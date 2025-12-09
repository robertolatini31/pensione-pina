import React from "react";
import "./index.scss";
import FirstSection from "./partials/firstSection/FirstSection";
import SecondSection from "./partials/secondSection/SecondSection";
import ThirdSection from "./partials/thirdSection/ThirdSection";
import FormSection from "./partials/formSection/FormSection";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, far, fab);

const App = () => {
  return (
    <div className="app-container">
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FormSection />
    </div>
  );
};

export default App;
