import React, { useState, useEffect } from 'react';
import UserDashboard from './UserDashboard';
import './RequestHistory.css';
import { useNavigate } from 'react-router-dom';

const RequestHistory = () => {
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const userData = JSON.parse(localStorage.getItem('user'));
                const response = await fetch(`http://localhost:5001/api/requests/user/${userData.id}`);
                const data = await response.json();
                setRequests(data);
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };

        fetchRequests();
    }, []);

    return (
        <>
            <UserDashboard />
            <div className="request-history-container">
                <div className="request-history-box">
                    <h2>ประวัติการเบิก</h2>
                    <table className="request-history-table">
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
                                        <td>{index + 1}</td>
                                        <td>{request.borrower_name}</td>
                                        <td>{request.department}</td>
                                        <td>{request.material}</td>
                                        <td>{new Date(request.date_requested).toLocaleDateString('th-TH')}</td>
                                        <td>{request.status || 'รอดำเนินการ'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">ไม่พบข้อมูลการเบิก</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <button className="back-button" onClick={() => navigate(-1)}>ย้อนกลับ</button>
            </div>
        </>
    );
};

export default RequestHistory;
