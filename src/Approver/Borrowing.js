import React, { useState, useEffect } from 'react';
import axios from "axios";
import DashboardApprover from "./DashboardApprover.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarehouse } from "@fortawesome/free-solid-svg-icons";
import './Borrowing.css';

const Borrowing = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBorrowRequests = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/borrow-requests');
                setRequests(response.data);
            } catch (error) {
                console.error('Error fetching borrow requests:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBorrowRequests();
    }, []);

    return (
        <>
            <DashboardApprover />
            <div className="borrowing-container">
                <div className="borrowing-title">
                    <FontAwesomeIcon icon={faWarehouse} style={{ marginRight: "10px" }} />
                    ข้อมูลการยืม
                </div>
                <div className="borrowing-count">จำนวนการขอยืม: {requests.length} รายการ</div>

                <div className="button-container">
                    <button onClick={() => window.location.href = '/borrow-form'}>ขอยืม</button>
                    <button onClick={() => window.location.href = '/borrow-return'}>ยืม - คืน</button>
                </div>

                <div className="search-bar">
                    <input type="date" id="searchDate" placeholder="ค้นหาด้วยวันที่" />
                    <button onClick={() => console.log('Implement search function')}>ค้นหา</button>
                </div>

                <table className="table" id="dataTable">
                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>ชื่อผู้ขอยืม</th>
                            <th>ฝ่ายสำนัก</th>
                            <th>ชื่อวัสดุอุปกรณ์</th>
                            <th>วันที่ขอยืม</th>
                            <th>จำนวน</th>
                            <th>สถานะ</th>
                            <th>หมายเหตุ</th>
                        </tr>
                    </thead>
                    <tbody id="tableBody">
                        {loading ? (
                            <tr>
                                <td colSpan="8" style={{ textAlign: "center", verticalAlign: "middle" }}>กำลังโหลดข้อมูล...</td>
                            </tr>
                        ) : requests.length > 0 ? (
                            requests.map((request, index) => (
                                <tr key={request.id}>
                                    <td>{index + 1}</td>
                                    <td>{request.borrower_name}</td>
                                    <td>{request.department}</td>
                                    <td>{request.equipment}</td>
                                    <td>{request.request_date}</td>
                                    <td>{request.quantity_requested}</td>
                                    <td>{request.status}</td>
                                    <td>{request.note || '-'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" style={{ textAlign: "center", verticalAlign: "middle" }}>ไม่มีข้อมูล</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="back-button-container">
                    <a href="/approver-page" className="back-button">ย้อนกลับ</a>
                </div>
            </div>
        </>
    );
};

export default Borrowing;
