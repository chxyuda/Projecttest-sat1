import React, { useState, useEffect, useMemo } from 'react';
import { NavLink } from 'react-router-dom'; // ✅ ใช้ NavLink แทน a
import './Track.css';
import Navbar from "./Navbar.js";
import Header from "../Header.js";

const Track = () => {
    const [currentTime, setCurrentTime] = useState("");

    // ✅ ใช้ useMemo ลดการคำนวณไม่จำเป็น
    const currentDate = useMemo(() => {
        const now = new Date();
        return now.toLocaleDateString('th-TH', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString('th-TH', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <Header />
            <Navbar />

            <div className="content-track">
                <div className="box-container-track">
                    <h2>ติดตามสถานะคำขอ</h2>
                    <p className="date-time">{currentDate} | {currentTime}</p> {/* ✅ แสดงวันที่-เวลา */}
                    
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
