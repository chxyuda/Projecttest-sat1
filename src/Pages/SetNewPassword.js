import React, { useState } from "react";
import axios from "axios";
import "./SetNewPassword.css";

const SetNewPassword = () => {
  const [email, setEmail] = useState(""); // อีเมล
  const [password, setPassword] = useState(""); // รหัสผ่านใหม่
  const [confirmPassword, setConfirmPassword] = useState(""); // ยืนยันรหัสผ่าน
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://newstock.sat.or.th:5001/api/set-new-password", {
        email,
        newPassword: password,
      });

      if (response.status === 200) {
        setMessage("Password updated successfully!");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setMessage(error.response?.data?.error || "An error occurred");
    }
  };

  return (
    <div className="container">
      <h2>Set a new password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Update Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SetNewPassword;
