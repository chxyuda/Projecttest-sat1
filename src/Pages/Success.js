import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Success</h1>
      <p>Your password has been successfully changed.</p>
      <button onClick={() => navigate("/")}>Back to Login</button>
    </div>
  );
};

export default Success;
