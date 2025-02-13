import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserDashboard from "./UserDashboard";
import "./RequestStatus.css";

const RequestStatus = () => {
  const [requests, setRequests] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/requests");
        const userRequests = response.data.filter(req => req.email === storedUser.email);
        setRequests(userRequests);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const renderStatus = (status) => {
    switch (status) {
      case 'Pending':
        return <span className="status-pending">รอดำเนินการ</span>;
      case 'Approved':
        return <span className="status-approved">อนุมัติ</span>;
      case 'Received':
        return <span className="status-received">รับของแล้ว</span>;
      case 'Rejected':
        return <span className="status-rejected">ไม่อนุมัติ</span>;
      default:
        return status;
    }
  };

  return (
    <div className="table-container-srq">
      <UserDashboard />
      <h2 className="title-srq">สถานะคำขอเบิก</h2>
      <table className="request-table-srq">
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>ชื่อผู้เบิก</th>
            <th>ฝ่ายสำนัก</th>
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
                <td>{request.equipment}</td>
                <td>{new Date(request.created_at).toLocaleDateString('th-TH')}</td>
                <td>{renderStatus(request.status)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">ไม่พบข้อมูลคำขอเบิก</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={() => window.history.back()} className="back-button-srq">ย้อนกลับ</button>
    </div>
  );
};

export default RequestStatus;
