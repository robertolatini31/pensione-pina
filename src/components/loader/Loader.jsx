import React from "react";
import "./Loader.scss";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";

const Loader = ({ isLoading, children }) => {
  useLockBodyScroll(isLoading);

  return (
    <div className="loader-container">
      {isLoading && (
        <div className="loader-overlay">
          <div className="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default Loader;
