import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserDashboard from "./UserDashboard";
import "./RequestStatus.css";

const RequestStatus = () => {
  const [requests, setRequests] = useState([]);

  const storedUser = JSON.parse(localStorage.getItem('user')) || {};
  const userId = storedUser.id;

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/requests/user/${userId}`);
      console.log('ข้อมูลที่ได้:', response.data);
      setRequests(response.data);
    } catch (error) {
      console.error('เกิดข้อผิดพลาด:', error);
    }
  };

  useEffect(() => {
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
        return <span>{status || ' - '}</span>;
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
                <td>{request.date_requested ? new Date(request.date_requested).toLocaleDateString('th-TH') : '-'}</td>
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

      <div className="button-group-srq">
        <button onClick={() => window.history.back()} className="back-button-srq">ย้อนกลับ</button>
        <button onClick={fetchRequests} className="refresh-button-srq">รีเฟรชข้อมูล</button>
      </div>
    </div>
  );
};

export default RequestStatus;
