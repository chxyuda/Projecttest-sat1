import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import Navbar from "../../../components/common/navbar/navbar";
import './request-history.css';
import UserDashboard from "./UserDashboard.js";

const RequestHistory = () => {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [requests, setRequests] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();

            const formattedDate = now.toLocaleDateString('th-TH', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });

            const formattedTime = now.toLocaleTimeString('th-TH', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });

            setDate(formattedDate);
            setTime(formattedTime);
        };

        updateDateTime();
        const timer = setInterval(updateDateTime, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/borrowings');
                const data = await response.json();

                // Calculate total pages
                setTotalPages(Math.ceil(data.length / itemsPerPage));

                // Get current page items
                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                setRequests(data.slice(startIndex, endIndex));
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };

        fetchRequests();
    }, [currentPage]);

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'pending':
                return 'status-badge status-pending';
            case 'approved':
                return 'status-badge status-approved';
            case 'returned':
                return 'status-badge status-returned';
            default:
                return 'status-badge';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending':
                return 'รอดำเนินการ';
            case 'approved':
                return 'อนุมัติแล้ว';
            case 'returned':
                return 'คืนแล้ว';
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
            <div class="content-breth">
                <h2>ประวัติการยืม - คืน</h2>
                <div class="table-container-breth">
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
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="pagination-breth">
                        <button>1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>4</button>
                        <button>5</button>
                        <button>6</button>
                        <button>7</button>
                        <button>8</button>
                        <button>9</button>
                        <button>10</button>
                    </div>
                </div>
                <div class="back-button-breth">
                    <a href="/withdrawal-history">ย้อนกลับ</a>
                </div>
            </div>
        </>
    );
};

export default RequestHistory;