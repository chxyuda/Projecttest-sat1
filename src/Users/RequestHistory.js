import React, { useState, useEffect } from 'react';
import UserDashboard from './UserDashboard';
import './RequestHistory.css';
import { useNavigate } from 'react-router-dom';

const RequestHistory = () => {
  const [requests, setRequests] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [filteredRequests, setFilteredRequests] = useState([]);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchDate) {
      const filtered = requests.filter(
        (request) =>
          request.date_requested.startsWith(searchDate) &&
          request.status === 'Received' // กรองเฉพาะสถานะ 'Received'
      );
      setFilteredRequests(filtered);
    } else {
      // แสดงเฉพาะ "Received" เมื่อไม่ได้กรองวันที่
      const filtered = requests.filter((request) => request.status === 'Received');
      setFilteredRequests(filtered);
    }
  };
  
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        const response = await fetch(`http://localhost:5001/api/requests/user/${userData.id}`);
        const data = await response.json();
  
        // กรองเฉพาะสถานะ 'Received' ตั้งแต่ดึงข้อมูลครั้งแรก
        const receivedData = data.filter((request) => request.status === 'Received');
  
        setRequests(receivedData);
        setFilteredRequests(receivedData);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };
  
    fetchRequests();
  }, []);
  

  const getStatusInThai = (status) => {
    switch (status) {
      case 'Pending':
        return 'รออนุมัติ';
      case 'Approved':
        return 'อนุมัติแล้ว';
      case 'Rejected':
        return 'ไม่อนุมัติ';
      case 'Received':
        return 'รับของแล้ว';
      default:
        return 'ไม่ทราบสถานะ';
    }
  };
  

  return (
    <>
      <UserDashboard />
      <div className="request-history-container">
        <div className="request-history-box">
          <h2>ประวัติการเบิก</h2>
          <div className="search-bar">
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
            <button onClick={handleSearch}>ค้นหา</button>
          </div>
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
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request, index) => (
                  <tr key={request.id}>
                    <td>{index + 1}</td>
                    <td>{request.borrower_name}</td>
                    <td>{request.department}</td>
                    <td>{request.material}</td>
                    <td>{new Date(request.date_requested).toLocaleDateString('th-TH')}</td>
                    <td>{getStatusInThai(request.status)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">ไม่พบข้อมูลการเบิก</td>
                </tr>
              )}
            </tbody>
          </table>
          <button className="back-button" onClick={() => navigate(-1)}>
          ย้อนกลับ
        </button>
        </div>
      </div>
    </>
  );
};

export default RequestHistory;
