import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserDashboard from "./UserDashboard.js";
import './BorrowStatus.css';

const BorrowStatus = () => {
    const [borrowings, setBorrowings] = useState([]);
    const storedUser = JSON.parse(localStorage.getItem('user')) || {};
    const userId = storedUser.id;

    // ✅ ดึงข้อมูลการยืม-คืนตาม userId
    const fetchBorrowings = async () => {
        try {
            const response = await axios.get(`http://localhost:5001/api/borrow-requests/user/${userId}`);
            setBorrowings(response.data);
        } catch (error) {
            console.error('Error fetching borrowings:', error);
        }
    };

    useEffect(() => {
        fetchBorrowings();
    }, []);

    const renderStatus = (status) => {
        switch (status) {
            case 'Pending':
                return <span className="status-pending-brs">รอดำเนินการ</span>;
            case 'Approved':
                return <span className="status-approved-brs">อนุมัติ</span>;
            case 'Received':
                return <span className="status-received-brs">รับของแล้ว</span>;
            case 'Returned':
                return <span className="status-returned-brs">คืนแล้ว</span>;
            case 'Rejected':
                return <span className="status-rejected-brs">ไม่อนุมัติ</span>;
            default:
                return <span>{status || ' - '}</span>;
        }
    };

    const formatDate = (dateString) => {
        return dateString ? new Date(dateString).toLocaleDateString('th-TH') : '-';
    };

    return (
        <div className="table-container-brs">
            <UserDashboard />
            <h2 className="title-brs">สถานะการยืม - คืน</h2>
            <table className="borrow-table-brs">
                <thead>
                    <tr>
                        <th>ลำดับ</th>
                        <th>ชื่อผู้ยืม</th>
                        <th>ฝ่ายสำนัก</th>
                        <th>อุปกรณ์</th>
                        <th>วันที่ยืม - วันที่คืน</th>
                        <th>สถานะ</th>
                    </tr>
                </thead>
                <tbody>
                    {borrowings.length > 0 ? (
                        borrowings.map((borrowing, index) => (
                            <tr key={borrowing.id}>
                                <td>{index + 1}</td>
                                <td>{borrowing.borrower_name}</td>
                                <td>{borrowing.department}</td>
                                <td>{borrowing.equipment}</td>
                                <td>{formatDate(borrowing.request_date)} - {formatDate(borrowing.return_date)}</td>
                                <td>{renderStatus(borrowing.status)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">ไม่พบข้อมูลการยืม - คืน</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="button-group-brs">
                <button onClick={() => window.history.back()} className="back-button-brs">ย้อนกลับ</button>
                <button onClick={fetchBorrowings} className="refresh-button-brs">รีเฟรชข้อมูล</button>
            </div>
        </div>
    );
};

export default BorrowStatus;
