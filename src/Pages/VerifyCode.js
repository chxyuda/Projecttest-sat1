import React from "react";
import "./VerifyCode.css";

const VerifyCode = () => {
  return (
    <div className="verify-code-container">
      <div className="verify-code-box">
        <h1>Verify Code</h1>
        <p>We sent a code to your email. Please enter the code below:</p>
        <div className="code-inputs">
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
        </div>
        <button className="verify-code-button">Verify</button>
      </div>
    </div>
  );
};

export default VerifyCode;
