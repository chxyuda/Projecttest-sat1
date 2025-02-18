import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardApprover from './DashboardApprover.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarehouse, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './ReqBorrowHistory.css';

const ReqBorrowHistory = () => {
  const [view, setView] = useState('menu');
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [borrowRequests, setBorrowRequests] = useState([]);
  const [filteredBorrowRequests, setFilteredBorrowRequests] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchDate, setSearchDate] = useState('');
  const itemsPerPage = 15;

  const navigate = useNavigate();

  // เบิกวัสดุ
  useEffect(() => {
    if (view === 'withdrawHistory') {
      fetchRequests();
    }
  }, [view]);

  // ยืมวัสดุ
  useEffect(() => {
    if (view === 'borrowHistory') {
      fetchBorrowRequests();
    }
  }, [view]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentRequests = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);
  const currentBorrowRequests = filteredBorrowRequests.slice(indexOfFirstItem, indexOfLastItem);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // ฟังก์ชันค้นหาตามวันที่ สำหรับเบิกวัสดุ
  const handleSearch = () => {
    const filtered = requests.filter(
      (request) =>
        request.date_requested.includes(searchDate) && request.status !== 'Pending'
    );
    setFilteredRequests(filtered);
    setCurrentPage(1);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  };

  // ฟังก์ชันค้นหาตามวันที่ สำหรับยืมวัสดุ
  const handleSearchBorrow = () => {
    const filtered = borrowRequests.filter(
      (request) =>
        request.request_date.includes(searchDate) && request.status !== 'Pending'
    );
    setFilteredBorrowRequests(filtered);
    setCurrentPage(1);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  };

  // ดึงข้อมูลเบิกวัสดุ ยกเว้น Pending
  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/requests');
      const approvedOrRejected = response.data.filter(
        (request) => request.status !== 'Pending'
      );
      setRequests(approvedOrRejected);
      setFilteredRequests(approvedOrRejected);
      setTotalPages(Math.ceil(approvedOrRejected.length / itemsPerPage));
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  // ดึงข้อมูลยืมวัสดุ ยกเว้น Pending
  const fetchBorrowRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/borrow-requests');
      const approvedOrOtherStatus = response.data.filter(
        (request) => request.status !== 'Pending'
      );
      setBorrowRequests(approvedOrOtherStatus);
      setFilteredBorrowRequests(approvedOrOtherStatus);
      setTotalPages(Math.ceil(approvedOrOtherStatus.length / itemsPerPage));
    } catch (error) {
      console.error('Failed to fetch borrow data:', error);
    }
  };
  
  const [selectedRequest, setSelectedRequest] = useState(null);

const handleViewDetails = (request) => {
  setSelectedRequest(request);
};

const handleCloseModal = () => {
  setSelectedRequest(null);
};


  return (
    <>
      <DashboardApprover />
      <div className="req-borrow-history-container">
        <div className="content-rqhi">
          {view === 'menu' && (
            <div className="box-container-rqhi">
              <div className="section-title-rqhi">
                <FontAwesomeIcon icon={faWarehouse} style={{ marginRight: '10px' }} />
                ประวัติการเบิกยืม
              </div>
              <div className="box-row-rqhi">
                <div className="box-rqhi box-request-rqhi" onClick={() => setView('withdrawHistory')}>
                  ประวัติการเบิก
                </div>
                <div className="box-rqhi box-borrow-rqhi" onClick={() => setView('borrowHistory')}>
                  ประวัติการยืม - คืน
                </div>
              </div>
            </div>
          )}

          {view === 'withdrawHistory' && (
            <div className="content">
              <h2 className="section-title">ประวัติการเบิก</h2>
              <div className="search-bar">
                <input
                  type="date"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                />
                <button className="search-button" onClick={handleSearch}>
                  ค้นหา
                </button>
              </div>
              <p id="page-info">หน้าที่ {currentPage} จากทั้งหมด {totalPages} หน้า</p>
              <table className="table">
                <thead>
                  <tr>
                    <th>ลำดับ</th>
                    <th>ชื่อผู้ขอเบิก</th>
                    <th>ชื่อฝ่ายสำนัก</th>
                    <th>อุปกรณ์</th>
                    <th>วันที่ขอเบิก</th>
                    <th>วันที่อนุมัติ</th>
                    <th>สถานะ</th>
                    <th>รายละเอียด</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRequests.length > 0 ? (
                    currentRequests.map((request, index) => (
                      <tr key={request.id}>
                        <td>{indexOfFirstItem + index + 1}</td>
                        <td>{request.borrower_name}</td>
                        <td>{request.department}</td>
                        <td>{request.equipment}</td>
                        <td>
                        {request.date_requested
                          ? new Date(request.date_requested).toLocaleDateString('th-TH', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })
                        : '-'}
                      </td>
                      <td>
                        {request.date_approved
                          ? new Date(request.date_approved).toLocaleDateString('th-TH', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })
                        : '-'}
                      </td>
                      <td>
                        {request.status === 'Approved'
                          ? 'อนุมัติแล้ว'
                          : request.status === 'Rejected'
                          ? 'ไม่อนุมัติ'
                          : request.status === 'Received'
                          ? 'รับของแล้ว'
                          : request.status === 'Returned'
                          ? 'คืนของแล้ว'
                          : request.status}
                        </td>
                        <td>
                          <button onClick={() => handleViewDetails(request)}>ดูรายละเอียด</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center' }}>ไม่มีข้อมูล</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="pagination">
                {[...Array(totalPages)].map((_, index) => (
                  <button key={index} onClick={() => goToPage(index + 1)}>
                    {index + 1}
                  </button>
                ))}
              </div>
              <button onClick={() => setView('menu')}>ย้อนกลับ</button>
            </div>
          )}

          {view === 'borrowHistory' && (
            <div className="content">
              <h2 className="section-title">ประวัติการยืม - คืน</h2>
              <div className="search-bar">
                <input
                  type="date"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                />
                <button className="search-button" onClick={handleSearchBorrow}>
                  ค้นหา
                </button>
              </div>
              <p id="page-info">หน้าที่ {currentPage} จากทั้งหมด {totalPages} หน้า</p>
              <table className="table">
                <thead>
                  <tr>
                    <th>ลำดับ</th>
                    <th>ชื่อยืม-คืน</th>
                    <th>ฝ่ายสำนัก</th>
                    <th>อุปกรณ์</th>
                    <th>วันที่ยืม-คืน</th>
                    <th>วันที่อนุมัติ</th>
                    <th>สถานะ</th>
                    <th>รายละเอียด</th>
                  </tr>
                </thead>
                <tbody>
                  {currentBorrowRequests.length > 0 ? (
                    currentBorrowRequests.map((request, index) => (
                      <tr key={request.id}>
                        <td>{indexOfFirstItem + index + 1}</td>
                        <td>{request.borrower_name}</td>
                        <td>{request.department}</td>
                        <td>{request.equipment}</td>
                        <td>
                          {request.request_date
                            ? new Date(request.request_date).toLocaleDateString('th-TH', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          })
                          : '-'}
                        </td>
                        <td>
                          {request.date_approved
                            ? new Date(request.date_approved).toLocaleDateString('th-TH', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          })
                          : '-'}
                        </td>
                        <td>
                          {request.status === 'Approved'
                            ? 'อนุมัติแล้ว'
                            : request.status === 'Rejected'
                            ? 'ไม่อนุมัติ'
                            : request.status === 'Received'
                            ? 'รับของแล้ว'
                            : request.status === 'Returned'
                            ? 'คืนของแล้ว'
                          : request.status}
                        </td>
                        <td>
                          <button onClick={() => handleViewDetails(request)}>
                            ดูรายละเอียด
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center' }}>ไม่มีข้อมูล</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <button onClick={() => setView('menu')}>ย้อนกลับ</button>
            </div>
          )}
          {selectedRequest && (
  <div className="modal-overlay">
    <div className="modal">
      <FontAwesomeIcon
        icon={faTimesCircle}
        className="modal-close-icon"
        onClick={handleCloseModal}
      />
      <h3>รายละเอียดการเบิกวัสดุ</h3>
      <div className="form-grid">
        <div className="form-group">
          <label>ชื่อผู้เบิก:</label>
          <input type="text" value={selectedRequest.borrower_name} readOnly />
        </div>
        <div className="form-group">
          <label>ฝ่าย/สำนัก:</label>
          <input type="text" value={selectedRequest.department} readOnly />
        </div>
        <div className="form-group">
          <label>เบอร์โทร:</label>
          <input type="text" value={selectedRequest.phone} readOnly />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="text" value={selectedRequest.email} readOnly />
        </div>
        <div className="form-group">
          <label>วัสดุ:</label>
          <input type="text" value={selectedRequest.material} readOnly />
        </div>
        <div className="form-group">
          <label>ประเภท:</label>
          <input type="text" value={selectedRequest.type} readOnly />
        </div>
        <div className="form-group">
          <label>อุปกรณ์:</label>
          <input type="text" value={selectedRequest.equipment} readOnly />
        </div>
        <div className="form-group">
          <label>ยี่ห้อ:</label>
          <input type="text" value={selectedRequest.brand} readOnly />
        </div>
        <div className="form-group">
          <label>จำนวน:</label>
          <input
            type="text"
            value={selectedRequest.quantity_requested || "-"}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>วันที่ขอเบิก:</label>
          <input
            type="text"
            value={
              selectedRequest.date_requested
                ? new Date(selectedRequest.date_requested).toLocaleDateString(
                    "th-TH",
                    { day: "2-digit", month: "2-digit", year: "numeric" }
                  )
                : "-"
            }
            readOnly
          />
        </div>
        <div className="form-group">
          <label>วันที่อนุมัติ:</label>
          <input
            type="text"
            value={
              selectedRequest.date_approved
                ? new Date(selectedRequest.date_approved).toLocaleDateString(
                    "th-TH",
                    { day: "2-digit", month: "2-digit", year: "numeric" }
                  )
                : "-"
            }
            readOnly
          />
        </div>
        <div className="form-group">
          <label>สถานะ:</label>
          <input
            type="text"
            value={
              selectedRequest.status === "Pending"
                ? "รอดำเนินการ"
                : selectedRequest.status === "Approved"
                ? "อนุมัติ"
                : selectedRequest.status === "Rejected"
                ? "ไม่อนุมัติ"
                : selectedRequest.status === "Received"
                ? "รับของแล้ว"
                : selectedRequest.status === "Returned"
                ? "คืนของแล้ว"
                : selectedRequest.status
            }
            readOnly
          />
        </div>
        <div className="form-group">
          <label>วันรับของ:</label>
          <input
            type="text"
            value={
              selectedRequest.date_received
                ? new Date(selectedRequest.date_received).toLocaleDateString(
                    "th-TH",
                    { day: "2-digit", month: "2-digit", year: "numeric" }
                  )
                : "-"
            }
            readOnly
          />
        </div>
        <div className="form-group full-width">
          <label>หมายเหตุ:</label>
          <textarea
            value={
              selectedRequest.status === "Rejected"
                ? selectedRequest.reject_note || "-"
                : selectedRequest.note || "-"
            }
            readOnly
          />
        </div>
      </div>
    </div>
  </div>
)}
{selectedRequest && (
  <div className="modal-overlay">
    <div className="modal">
      <FontAwesomeIcon
        icon={faTimesCircle}
        className="modal-close-icon"
        onClick={handleCloseModal}
      />
      <h3>รายละเอียดการยืม - คืนวัสดุ</h3>
      <div className="form-grid">
        <div className="form-group">
          <label>ชื่อผู้ยืม:</label>
          <input type="text" value={selectedRequest.borrower_name} readOnly />
        </div>
        <div className="form-group">
          <label>ฝ่าย/สำนัก:</label>
          <input type="text" value={selectedRequest.department} readOnly />
        </div>
        <div className="form-group">
          <label>เบอร์โทร:</label>
          <input type="text" value={selectedRequest.phone} readOnly />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="text" value={selectedRequest.email} readOnly />
        </div>
        <div className="form-group">
          <label>อุปกรณ์:</label>
          <input type="text" value={selectedRequest.equipment} readOnly />
        </div>
        <div className="form-group">
          <label>จำนวน:</label>
          <input type="text" value={selectedRequest.quantity_requested || '-'} readOnly />
        </div>
        <div className="form-group">
          <label>วันที่ยืม:</label>
          <input
            type="text"
            value={
              selectedRequest.request_date
                ? new Date(selectedRequest.request_date).toLocaleDateString('th-TH', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })
                : '-'
            }
            readOnly
          />
        </div>
        <div className="form-group">
          <label>วันที่คืน:</label>
          <input
            type="text"
            value={
              selectedRequest.return_date
                ? new Date(selectedRequest.return_date).toLocaleDateString('th-TH', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })
                : '-'
            }
            readOnly
          />
        </div>
        <div className="form-group">
          <label>สถานะ:</label>
          <input
            type="text"
            value={
              selectedRequest.status === 'Pending'
                ? 'รอดำเนินการ'
                : selectedRequest.status === 'Approved'
                ? 'อนุมัติ'
                : selectedRequest.status === 'Rejected'
                ? 'ไม่อนุมัติ'
                : selectedRequest.status === 'Received'
                ? 'รับของแล้ว'
                : selectedRequest.status === 'Returned'
                ? 'คืนของแล้ว'
                : selectedRequest.status
            }
            readOnly
          />
        </div>
        <div className="form-group full-width">
          <label>หมายเหตุ:</label>
          <textarea value={selectedRequest.note || '-'} readOnly />
        </div>
        <div className="form-group full-width">
          <label>หมายเหตุสภาพอุปกรณ์ตอนคืน:</label>
          <textarea value={selectedRequest.return_condition || '-'} readOnly />
        </div>
      </div>
    </div>
  </div>
)}


            </div>
          </div>
        </>
      );
    };

export default ReqBorrowHistory;
