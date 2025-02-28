import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import UserDashboard from "./UserDashboard";
import "./RequestStatus.css";

const RequestStatus = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const storedUser = JSON.parse(localStorage.getItem('user')) || {};
  const userId = storedUser.id;
  const itemsPerPage = 15;

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`http://newstock.sat.or.th:5001/api/requests/user/${userId}`);
      setRequests(response.data);
      setFilteredRequests(response.data);
    } catch (error) {
      console.error('เกิดข้อผิดพลาด:', error);
    }
  };

  // ✅ แบ่งหน้า
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

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
        return <span>{status || '-'}</span>;
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRequest(null);
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
            <th>รายละเอียด</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((request, index) => (
              <tr key={request.id}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{request.borrower_name}</td>
                <td>{request.department}</td>
                <td>{request.equipment}</td>
                <td>{request.date_requested ? new Date(request.date_requested).toLocaleDateString('th-TH') : '-'}</td>
                <td>{renderStatus(request.status)}</td>
                <td>
                  <button 
                    className="details-button" 
                    onClick={() => { setSelectedRequest(request); setShowModal(true); }}
                  >
                    ดูรายละเอียด
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">ไม่พบข้อมูลคำขอเบิก</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ✅ ปุ่มแบ่งหน้า */}
      <div className="pagination">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>ก่อนหน้า</button>
        <span>หน้า {currentPage} จาก {totalPages}</span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>ถัดไป</button>
      </div>

      {/* ✅ ปุ่มย้อนกลับและรีเฟรช */}
      <div className="button-group-srq">
        <button onClick={() => window.history.back()} className="back-button-srq">ย้อนกลับ</button>
        <button onClick={fetchRequests} className="refresh-button-srq">รีเฟรชข้อมูล</button>
      </div>

      {/* ✅ Modal แสดงรายละเอียด */}
      {showModal && selectedRequest && (
  <div className="request-modal-overlay">
    <div className="request-modal-content">
      <div className="request-modal-header">
        <h3>รายละเอียดคำขอเบิก</h3>
        <button className="request-close-button" onClick={handleCloseModal}>×</button>
      </div>
      <form className="request-details-form">
        <div className="request-form-grid">
          <div className="request-form-field">
            <label>ชื่อผู้เบิก:</label>
            <input type="text" value={selectedRequest.borrower_name} readOnly />
          </div>
          <div className="request-form-field">
            <label>ฝ่ายสำนัก:</label>
            <input type="text" value={selectedRequest.department} readOnly />
          </div>
        </div>

        <div className="request-form-grid">
          <div className="request-form-field">
            <label>อุปกรณ์:</label>
            <input type="text" value={selectedRequest.equipment} readOnly />
          </div>
          <div className="request-form-field">
            <label>ยี่ห้อ:</label>
            <input type="text" value={selectedRequest.brand || '-'} readOnly />
          </div>
        </div>

        <div className="request-form-grid">
          <div className="request-form-field">
            <label>หมายเลขครุภัณฑ์:</label>
            <input type="text" value={selectedRequest.equipment_number || '-'} readOnly />
          </div>
          <div className="request-form-field">
            <label>Serial Number:</label>
            <input type="text" value={selectedRequest.serial_number || '-'} readOnly />
          </div>
        </div>

        <div className="request-form-grid">
          <div className="request-form-field">
            <label>จำนวน:</label>
            <input type="text" value={selectedRequest.quantity_requested} readOnly />
          </div>
          <div className="request-form-field">
            <label>หมายเหตุ:</label>
            <input type="text" value={selectedRequest.note || '-'} readOnly />
          </div>
        </div>

        <div className="request-form-grid">
          <div className="request-form-field">
            <label>วันที่ขอเบิก:</label>
            <input 
              type="text" 
              value={selectedRequest.date_requested ? new Date(selectedRequest.date_requested).toLocaleDateString('th-TH') : '-'} 
              readOnly 
            />
          </div>
          <div className="request-form-field">
            <label>สถานะ:</label>
            <div className="request-status">
              {renderStatus(selectedRequest.status)}
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default RequestStatus;
