import React, { useState, useEffect } from 'react';
import './RequestStatus.css';
import Navbar from "./Navbar.js";
import Header from "../Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle, faClock } from "@fortawesome/free-solid-svg-icons";

const RequestStatus = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [requests, setRequests] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/borrowings');
                const data = await response.json();

                // คำนวณจำนวนหน้าทั้งหมด
                setTotalPages(Math.ceil(data.length / itemsPerPage));

                // กำหนดรายการที่ต้องแสดงในหน้าปัจจุบัน
                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                setRequests(data.slice(startIndex, endIndex));
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };

        fetchRequests();
    }, [currentPage]);

    // ✅ เพิ่มไอคอนในสถานะ
    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending':
                return <span className="status-pending"> 
                    <FontAwesomeIcon icon={faClock} className="status-icon" /> รอดำเนินการ 
                </span>;
            case 'approved':
                return <span className="status-approved"> 
                    <FontAwesomeIcon icon={faCheckCircle} className="status-icon" /> อนุมัติแล้ว 
                </span>;
            case 'returned':
                return <span className="status-returned"> 
                    <FontAwesomeIcon icon={faTimesCircle} className="status-icon" /> คืนแล้ว 
                </span>;
            default:
                return status;
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('th-TH', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    return (
        <>
            <Header />
            <Navbar />

            <div className="content-srq">
                <h2>สถานะคำขอเบิก</h2>
                <div className="table-container-srq">
                    <table>
                        <thead>
                            <tr>
                                <th>ลำดับ</th>
                                <th>ชื่อผู้เบิก</th>
                                <th>ชื่อฝ่ายสำนัก</th>
                                <th>อุปกรณ์</th>
                                <th>วันที่ขอเบิก</th>
                                <th>สถานะ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.length > 0 ? (
                                requests.map((request, index) => (
                                    <tr key={request.id}>
                                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                        <td>{request.borrower_name}</td>
                                        <td>{request.department}</td>
                                        <td>{request.equipment?.name || 'N/A'}</td>
                                        <td>{formatDate(request.borrow_date)}</td>
                                        <td>{getStatusBadge(request.status)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="no-data">ไม่พบข้อมูลคำขอเบิก</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {totalPages > 1 && (
                        <div className="pagination-srq">
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
                <div className="back-button-srq">
                    <a href="/track">ย้อนกลับ</a>
                </div>
            </div>
        </>
    );
};

export default RequestStatus;
