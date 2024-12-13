import React from "react";
import { useNavigate } from "react-router-dom";

const PasswordResetConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Password Reset Confirmation</h1>
      <p>Your password reset is successful. Proceed to set a new password.</p>
      <button onClick={() => navigate("/set-new-password")}>Continue</button>
    </div>
  );
};

export default PasswordResetConfirmation;
