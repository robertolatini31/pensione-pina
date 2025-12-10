import React from "react";
import "./MessageBox.scss";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";

const MessageBox = ({ type, message }) => {
  useLockBodyScroll(true);

  return (
    <div className="message-box-overlay">
      <div className={`message-box ${type}`}>{message}</div>;
    </div>
  );
};

export default MessageBox;
