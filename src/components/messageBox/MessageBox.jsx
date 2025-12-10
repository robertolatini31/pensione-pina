import React, { useEffect } from "react";
import "./MessageBox.scss";

const MessageBox = ({ type, message }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  return (
    <div className="message-box-overlay">
      <div className={`message-box ${type}`}>{message}</div>;
    </div>
  );
};

export default MessageBox;
