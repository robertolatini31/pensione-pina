import React from "react";
import "./MessageBox.scss";

const MessageBox = ({ type, message }) => {
  return <div className={`message-box ${type}`}>{message}</div>;
};

export default MessageBox;
