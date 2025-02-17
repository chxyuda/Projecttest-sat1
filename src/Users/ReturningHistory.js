import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ReturningHistory.css';
import UserDashboard from "./UserDashboard.js";

const ReturningHistory = () => {
    const [borrowings, setBorrowings] = useState([]);

    useEffect(() => {
        const fetchBorrowings = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/borrow-requests');
                setBorrowings(response.data);
            } catch (error) {
                console.error('เกิดข้อผิดพลาดในการดึงข้อมูลการยืม - คืน:', error);
            }
        };

        fetchBorrowings();
    }, []);

    return (
        <>
            <UserDashboard />
            <div className="content-breth">
                <div className="history-box-breth">
                    <h2>ประวัติการยืม - คืน</h2>
                    <div className="table-container-breth">
                        <table>
                            <thead>
                                <tr>
                                    <th>ลำดับ</th>
                                    <th>ชื่อผู้ยืม</th>
                                    <th>ชื่อฝ่ายสำนัก</th>
                                    <th>อุปกรณ์</th>
                                    <th>วันที่ยืม - วันที่คืน</th>
                                    <th>สถานะ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {borrowings.length > 0 ? (
                                    borrowings.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.borrower_name}</td>
                                            <td>{item.department}</td>
                                            <td>{item.equipment}</td>
                                            <td>
                                                {item.request_date} - {item.return_date || 'ยังไม่คืน'}
                                            </td>
                                            <td>{item.approval_status}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center' }}>
                                            ไม่พบข้อมูลการยืม - คืน
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="back-button-breth">
                        <a href="/withdrawal-history">ย้อนกลับ</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReturningHistory;
