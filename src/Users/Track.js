import React, { useState, useEffect, useMemo } from 'react';
import { NavLink } from 'react-router-dom'; // ✅ ใช้ NavLink แทน a
import './Track.css';
import UserDashboard from "./UserDashboard.js";


const Track = () => {
   

    return (
        <>
            
            <UserDashboard />


            <div className="content-track">
                <div className="box-container-track">
                    <h2>ติดตามสถานะคำขอ</h2>

                    <div className="card-container-track">
                        <NavLink to="/RequestStatus" className="card-track card-issue-track">
                            สถานะการขอเบิก
                        </NavLink>
                        <NavLink to="/BorrowStatus" className="card-track card-borrow-track">
                            สถานะการยืม-คืน
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Track;
