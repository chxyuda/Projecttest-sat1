import React, { useEffect, useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom'; // ✅ ใช้ NavLink แทน <a>
import UserDashboard from "./UserDashboard.js";
import './BorrowStatus.css';

const BorrowStatus = () => {
    const [currentTime, setCurrentTime] = useState("");
    const [borrowings, setBorrowings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // ✅ ใช้ useMemo ลดการคำนวณวันที่
    const currentDate = useMemo(() => {
        return new Date().toLocaleDateString('th-TH', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }, []);

    // ✅ อัปเดตเวลาแบบเรียลไทม์
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

    // ✅ ดึงข้อมูลการยืม-คืน
    useEffect(() => {
        const fetchBorrowings = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/borrowings');
                const data = await response.json();
                setBorrowings(data);
            } catch (error) {
                console.error('Error fetching borrowings:', error);
            }
        };

        fetchBorrowings();
    }, []);

    // ✅ คำนวณหน้าของข้อมูล
    const totalPages = Math.ceil(borrowings.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentBorrowings = borrowings.slice(startIndex, endIndex);

    // ✅ แสดงสถานะ
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'pending':
                return 'status-pending-brs';
            case 'approved':
                return 'status-approved-brs';
            case 'returned':
                return 'status-returned-brs';
            default:
                return '';
        }
    };

    // ✅ ฟอร์แมตวันที่
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('th-TH', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <>
            <UserDashboard />

            <div className="content-brs">
                <h2>สถานะการยืม - คืน</h2>
                <p className="date-time">{currentDate} | {currentTime}</p> {/* ✅ แสดงวันที่-เวลา */}

                <div className="table-container-brs">
                    <table>
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
                            {currentBorrowings.length > 0 ? (
                                currentBorrowings.map((borrowing, index) => (
                                    <tr key={borrowing.id}>
                                        <td>{startIndex + index + 1}</td>
                                        <td>{borrowing.borrower_name}</td>
                                        <td>{borrowing.department}</td>
                                        <td>{borrowing.equipment?.name || '-'}</td>
                                        <td>{formatDate(borrowing.borrow_date)} - {formatDate(borrowing.return_date)}</td>
                                        <td>
                                            <span className={`status-badge ${getStatusBadgeClass(borrowing.status)}`}>
                                                {borrowing.status === 'pending' && 'รอดำเนินการ'}
                                                {borrowing.status === 'approved' && 'อนุมัติแล้ว'}
                                                {borrowing.status === 'returned' && 'คืนแล้ว'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="no-data">ไม่พบข้อมูลการยืม</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* ✅ Pagination */}
                    {totalPages > 1 && (
                        <div className="pagination-brs">
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    className={currentPage === index + 1 ? 'active' : ''}
                                    onClick={() => setCurrentPage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* ✅ ปุ่มย้อนกลับ */}
                <div className="back-button-brs">
                    <NavLink to="/track">ย้อนกลับ</NavLink>
                </div>
            </div>
        </>
    );
};

export default BorrowStatus;
