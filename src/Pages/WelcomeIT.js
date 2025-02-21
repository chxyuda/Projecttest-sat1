import React from 'react';
import ITDashboard from "./ITDashboard";
import './WelcomeIT.css';

const WelcomeIT = () => {
  return (
    <div className="welcome-users-container">
      <ITDashboard />
      <div className="user-role-card">
        <div className="user-icon-circle">
          <i className="fas fa-user user-icon-welcome"></i>
        </div>
        <div className="user-role-text">เจ้าหน้าที่ IT</div>
      </div>
    </div>
  );
};

export default WelcomeIT;
