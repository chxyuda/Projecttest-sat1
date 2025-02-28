import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserDashboard from "./UserDashboard.js";
import './BorrowStatus.css';

const BorrowStatus = () => {
    const [borrowings, setBorrowings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;
    const [selectedBorrowing, setSelectedBorrowing] = useState(null);
    const [showModal, setShowModal] = useState(false); // ✅ เพิ่ม state ควบคุม Modal
    const storedUser = JSON.parse(localStorage.getItem('user')) || {};
    const userId = storedUser.id;

    useEffect(() => {
        fetchBorrowings();
    }, []);

    const fetchBorrowings = async () => {
        try {
            const response = await axios.get(`http://newstock.sat.or.th:5001/api/borrow-requests/user/${userId}`);
            console.log("📌 ข้อมูลจาก API:", response.data);
            setBorrowings(response.data);
        } catch (error) {
            console.error('Error fetching borrowings:', error);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = borrowings.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(borrowings.length / itemsPerPage);

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

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

    const handleShowDetails = (borrowing) => {
        setSelectedBorrowing(borrowing);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedBorrowing(null);
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
                        <th>วันที่ยืม</th>
                        <th>วันที่คืน</th>
                        <th>สถานะ</th>
                        <th>รายละเอียด</th> {/* ✅ เพิ่มคอลัมน์รายละเอียด */}
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length > 0 ? (
                        currentItems.map((borrowing, index) => (
                            <tr key={borrowing.id}>
                                <td>{indexOfFirstItem + index + 1}</td>
                                <td>{borrowing.borrower_name}</td>
                                <td>{borrowing.department}</td>
                                <td>{borrowing.equipment}</td>
                                <td>{formatDate(borrowing.request_date)}</td>
                                <td>{formatDate(borrowing.return_date)}</td>
                                <td>{renderStatus(borrowing.status)}</td>
                                <td>
                                    <button className="details-button-brs" onClick={() => handleShowDetails(borrowing)}>
                                        ดูรายละเอียด
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">ไม่พบข้อมูลการยืม - คืน</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="pagination">
                <button onClick={goToPreviousPage} disabled={currentPage === 1}>ก่อนหน้า</button>
                <span>หน้า {currentPage} จาก {totalPages}</span>
                <button onClick={goToNextPage} disabled={currentPage === totalPages}>ถัดไป</button>
            </div>

            <div className="button-group-brs">
                <button onClick={() => window.history.back()} className="back-button-brs">ย้อนกลับ</button>
                <button onClick={fetchBorrowings} className="refresh-button-brs">รีเฟรชข้อมูล</button>
            </div>
            {showModal && selectedBorrowing && (
    <div className="borrow-modal-overlay">
        <div className="borrow-modal-content">
        <button className="borrow-modal-close-x" onClick={handleCloseModal}>×</button>
            <h3 className="borrow-modal-title">รายละเอียดการยืม - คืน</h3>
            <form className="borrow-details-form">
                <div className="borrow-grid">
                    <div>
                        <label>ชื่อผู้ยืม:</label>
                        <input type="text" value={selectedBorrowing.borrower_name} readOnly />
                    </div>
                    <div>
                        <label>ฝ่ายสำนัก:</label>
                        <input type="text" value={selectedBorrowing.department} readOnly />
                    </div>
                    <div>
                        <label>อุปกรณ์:</label>
                        <input type="text" value={selectedBorrowing.equipment} readOnly />
                    </div>
                    <div>
                        <label>ยี่ห้อ:</label>
                        <input type="text" value={selectedBorrowing.brand || '-'} readOnly />
                    </div>
                    <div>
                        <label>หมายเลขครุภัณฑ์:</label>
                        <input type="text" value={selectedBorrowing.equipment_number || '-'} readOnly />
                    </div>
                    <div>
                        <label>Serial Number:</label>
                        <input type="text" value={selectedBorrowing.serial_number || '-'} readOnly />
                    </div>
                    <div>
                        <label>วันที่ยืม:</label>
                        <input type="text" value={formatDate(selectedBorrowing.request_date)} readOnly />
                    </div>
                    <div>
                        <label>วันที่คืน:</label>
                        <input type="text" value={formatDate(selectedBorrowing.return_date)} readOnly />
                    </div>
                    <div>
                        <label>หมายเหตุ:</label>
                        <input type="text" value={selectedBorrowing.note || '-'} readOnly />
                    </div>
                    <div>
                        <label>สถานะ:</label>
                        <input type="text" value={selectedBorrowing.status} readOnly />
                    </div>
                </div>
            </form>
        </div>
    </div>
)}



        </div>
    );
};

export default BorrowStatus;
