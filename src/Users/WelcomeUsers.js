import React from 'react';
import UserDashboard from './UserDashboard';
import './WelcomeUsers.css';

const WelcomeUsers = () => {
  return (
    <div className="welcome-users-container">
      <UserDashboard />
      <div className="user-role-card">
        <div className="user-icon-circle">
          <i className="fas fa-user user-icon-welcome"></i>
        </div>
        <div className="user-role-text">ฝ่ายสำนัก</div>
      </div>
    </div>
  );
};

export default WelcomeUsers;
