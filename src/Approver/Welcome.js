import React from 'react';
import DashboardApprover from "./DashboardApprover.js";
import './Welcome.css';

const Welcome = () => {
  return (
    <div className="welcome-users-container">
      <DashboardApprover />
      <div className="user-role-card">
        <div className="user-icon-circle">
          <i className="fas fa-user user-icon-welcome"></i>
        </div>
        <div className="user-role-text">ผู้อนุมัติ</div>
      </div>
    </div>
  );
};

export default Welcome;
