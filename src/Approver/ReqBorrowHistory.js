import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardApprover from './DashboardApprover.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarehouse } from '@fortawesome/free-solid-svg-icons';
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
        </div>
      </div>
    </>
  );
};

export default ReqBorrowHistory;
