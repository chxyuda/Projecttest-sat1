import React, { useState, useEffect } from 'react';
import './WithdrawalHistory.css';
import Navbar from "./Navbar.js";
import Header from "../Header.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const WithdrawalHistory = () => {
    


    return (
        <>
            <Header />
            <Navbar />

            <div className="content-wdh">
                <div className="box-container-wdh">
                    <h2>ประวัติการเบิก-การยืม-คืน</h2>
                    
                    <div className="card-container-wdh">
                        <Link to="/RequestHistory" className="card-wdh card-issue-wdh">
                            <FontAwesomeIcon icon={faFileAlt} className="icon" />
                            ประวัติการขอเบิก
                        </Link>
                        <Link to="/returning-history" className="card-wdh card-borrow-wdh">
                            <FontAwesomeIcon icon={faClipboardList} className="icon" />
                            ประวัติการยืม-คืน
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WithdrawalHistory;
