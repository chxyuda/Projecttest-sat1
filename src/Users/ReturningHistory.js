import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ReturningHistory.css';
import UserDashboard from "./UserDashboard.js";

const ReturningHistory = () => {
    const [borrowings, setBorrowings] = useState([]);
    const [searchDate, setSearchDate] = useState('');
    const [filteredBorrowings, setFilteredBorrowings] = useState([]);

    useEffect(() => {
        const fetchBorrowings = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/borrow-requests');
                setBorrowings(response.data);
                setFilteredBorrowings(response.data); // ตั้งค่าเริ่มต้นให้เหมือนกัน
            } catch (error) {
                console.error('เกิดข้อผิดพลาดในการดึงข้อมูลการยืม - คืน:', error);
            }
        };

        fetchBorrowings();
    }, []);

    const formatDate = (dateString) => {
        return dateString ? new Date(dateString).toLocaleDateString('th-TH') : '-';
    };

    const renderStatus = (status) => {
        switch (status) {
            case 'Pending':
                return <span className="status-pending">รอดำเนินการ</span>;
            case 'Approved':
                return <span className="status-approved">อนุมัติ</span>;
            case 'Received':
                return <span className="status-received">รับของแล้ว</span>;
            case 'Returned':
                return <span className="status-returned">คืนแล้ว</span>;
            case 'Rejected':
                return <span className="status-rejected">ไม่อนุมัติ</span>;
            default:
                return <span>{status || '-'}</span>;
        }
    };

    const handleSearch = () => {
        const filtered = borrowings.filter((item) =>
            item.request_date && item.request_date.startsWith(searchDate)
        );
        setFilteredBorrowings(filtered);
    };

    return (
        <>
            <UserDashboard />
            <div className="content-breth">
                <div className="history-box-breth">
                    <h2>ประวัติการยืม - คืน</h2>

                    <div className="search-bar">
                        <input
                            type="date"
                            value={searchDate}
                            onChange={(e) => setSearchDate(e.target.value)}
                        />
                        <button onClick={handleSearch}>ค้นหา</button>
                    </div>

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
                                {filteredBorrowings.length > 0 ? (
                                    filteredBorrowings.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.borrower_name}</td>
                                            <td>{item.department}</td>
                                            <td>{item.equipment}</td>
                                            <td>
                                                {formatDate(item.request_date)} - {formatDate(item.return_date)}
                                            </td>
                                            <td>{renderStatus(item.status)}</td>
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
                        <a href="/withdrawalHistory">ย้อนกลับ</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReturningHistory;
