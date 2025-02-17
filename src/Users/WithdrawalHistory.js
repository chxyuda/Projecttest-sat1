import React from 'react';
import './WithdrawalHistory.css';
import UserDashboard from "./UserDashboard.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoice, faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const WithdrawalHistory = () => {
    return (
        <>
            <UserDashboard />

            <div className="content-wdh">
                <div className="box-container-wdh">
                    <h2>ประวัติการเบิก-การยืม-คืน</h2>

                    <div className="card-container-wdh">
                        <Link to="/RequestHistory" className="card-wdh card-issue-wdh">
                            <FontAwesomeIcon icon={faFileInvoice} className="icon" />
                            ประวัติการขอเบิก
                        </Link>
                        <Link to="/returning-history" className="card-wdh card-borrow-wdh">
                            <FontAwesomeIcon icon={faExchangeAlt} className="icon" />
                            ประวัติการยืม-คืน
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WithdrawalHistory;
