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
  const [selectedBorrowRequest, setSelectedBorrowRequest] = useState(null);
  const [selectedReturnRequest, setSelectedReturnRequest] = useState(null);
  


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
    if (!searchDate) {
      setFilteredRequests(requests); // รีเซ็ตเป็นข้อมูลทั้งหมดหากไม่มีวันที่เลือก
      return;
    }
  
    // แปลงวันที่ที่เลือกเป็นรูปแบบ YYYY-MM-DD
    const formattedSearchDate = new Date(searchDate).toLocaleDateString('en-CA');
  
    // กรองข้อมูลโดยใช้ "วันที่อนุมัติ"
    const filtered = requests.filter((request) => {
      if (!request.date_approved) return false; // ถ้าวันที่อนุมัติเป็น null ให้ข้าม
  
      const approvedDate = new Date(request.date_approved).toLocaleDateString('en-CA');
  
      return approvedDate === formattedSearchDate && request.status !== 'Pending';
    });
  
    setFilteredRequests(filtered);
    setCurrentPage(1);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  };
  
  // ฟังก์ชันค้นหาตามวันที่ สำหรับยืมวัสดุ
  const handleSearchBorrow = () => {
    if (!searchDate) {
      setFilteredBorrowRequests(borrowRequests); // รีเซ็ตเป็นข้อมูลทั้งหมดหากไม่มีวันที่เลือก
      return;
    }
  
    // แปลงวันที่ที่เลือกเป็นรูปแบบ YYYY-MM-DD
    const formattedSearchDate = new Date(searchDate).toLocaleDateString('en-CA');
  
    // กรองข้อมูลโดยใช้ "วันที่อนุมัติ"
    const filtered = borrowRequests.filter((request) => {
      if (!request.date_approved) return false; // ถ้าวันที่อนุมัติเป็น null หรือ undefined ให้ข้าม
  
      const approvedDate = new Date(request.date_approved).toLocaleDateString('en-CA');
  
      return approvedDate === formattedSearchDate && request.status !== 'Pending';
    });
  
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

  const handleViewBorrowDetails = (request) => {
    setSelectedBorrowRequest(request);
  };
  
  const handleViewReturnDetails = (request) => {
    setSelectedReturnRequest(request);
  };
  

const handleCloseBorrowModal = () => {
  setSelectedBorrowRequest(null);
};

const handleCloseReturnModal = () => {
  setSelectedReturnRequest(null);
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

    {/* ✅ ช่องค้นหาวันที่ (แก้ไขให้เหลือแค่ช่องเดียว) */}
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
                <button onClick={() => handleViewBorrowDetails(request)}>ดูรายละเอียด</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" style={{ textAlign: 'center' }}>ไม่มีข้อมูล</td>
          </tr>
        )}
      </tbody>
    </table>

    <button onClick={() => setView('menu')}>ย้อนกลับ</button>
  </div>
)}

{view === 'borrowHistory' && (
  <div className="content">
    <h2 className="section-title">ประวัติการยืม - คืน</h2>

    {/* ✅ ช่องค้นหาวันที่ (แก้ไขให้เหลือแค่ช่องเดียว) */}
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
                <button onClick={() => handleViewReturnDetails(request)}>ดูรายละเอียด</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" style={{ textAlign: 'center' }}>ไม่มีข้อมูล</td>
          </tr>
        )}
      </tbody>
    </table>

    <button onClick={() => setView('menu')}>ย้อนกลับ</button>
  </div>
)}
          {selectedBorrowRequest && (
  <div className="req-borrow-history-modal-overlay">
    <div className="req-borrow-history-modal">
      <FontAwesomeIcon
        icon={faTimesCircle}
        className="req-borrow-history-modal-close-icon"
        onClick={handleCloseBorrowModal}
      />
      <h3>รายละเอียดการเบิกวัสดุ</h3>
      <div className="req-borrow-history-form-grid">
        <div className="req-borrow-history-form-group">
          <label>ชื่อผู้เบิก:</label>
          <input type="text" value={selectedBorrowRequest.borrower_name} readOnly />
        </div>
        <div className="req-borrow-history-form-group">
          <label>ฝ่าย/สำนัก:</label>
          <input type="text" value={selectedBorrowRequest.department} readOnly />
        </div>
        <div className="req-borrow-history-form-group">
          <label>เบอร์โทร:</label>
          <input type="text" value={selectedBorrowRequest.phone} readOnly />
        </div>
        <div className="req-borrow-history-form-group">
          <label>Email:</label>
          <input type="text" value={selectedBorrowRequest.email} readOnly />
        </div>
        <div className="req-borrow-history-form-group">
          <label>วัสดุ:</label>
          <input type="text" value={selectedBorrowRequest.material} readOnly />
        </div>
        <div className="req-borrow-history-form-group">
          <label>ประเภท:</label>
          <input type="text" value={selectedBorrowRequest.type} readOnly />
        </div>
        <div className="req-borrow-history-form-group">
          <label>อุปกรณ์:</label>
          <input type="text" value={selectedBorrowRequest.equipment} readOnly />
        </div>
        <div className="req-borrow-history-form-group">
          <label>ยี่ห้อ:</label>
          <input type="text" value={selectedBorrowRequest.brand} readOnly />
        </div>
        <div className="req-borrow-history-form-group">
          <label>หมายเลขครุภัณฑ์:</label>
          <input type="text" value={selectedBorrowRequest.equipment_number || '-'} readOnly />
        </div>
        <div className="req-borrow-history-form-group">
          <label>Serial Number:</label>
          <input type="text" value={selectedBorrowRequest.serial_number || '-'} readOnly />
        </div>
        <div className="req-borrow-history-form-group">
          <label>จำนวน:</label>
          <input type="text" value={selectedBorrowRequest.quantity_requested || '-'} readOnly />
        </div>
        <div className="req-borrow-history-form-group">
          <label>วันที่ขอเบิก:</label>
          <input
            type="text"
            value={
              selectedBorrowRequest.date_requested
                ? new Date(selectedBorrowRequest.date_requested).toLocaleDateString('th-TH', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })
                : '-'
            }
            readOnly
          />
        </div>
        <div className="req-borrow-history-form-group">
          <label>วันที่อนุมัติ:</label>
          <input
            type="text"
            value={
              selectedBorrowRequest.date_approved
                ? new Date(selectedBorrowRequest.date_approved).toLocaleDateString('th-TH', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })
                : '-'
            }
            readOnly
          />
        </div>
        <div className="req-borrow-history-form-group">
          <label>สถานะ:</label>
          <input
            type="text"
            value={
              selectedBorrowRequest.status === 'Pending'
                ? 'รอดำเนินการ'
                : selectedBorrowRequest.status === 'Approved'
                ? 'อนุมัติ'
                : selectedBorrowRequest.status === 'Rejected'
                ? 'ไม่อนุมัติ'
                : selectedBorrowRequest.status === 'Received'
                ? 'รับของแล้ว'
                : selectedBorrowRequest.status === 'Returned'
                ? 'คืนของแล้ว'
                : selectedBorrowRequest.status
            }
            readOnly
          />
        </div>
        <div className="req-borrow-history-form-group">
          <label>วันรับของ:</label>
          <input
            type="text"
            value={
              selectedBorrowRequest.date_received
                ? new Date(selectedBorrowRequest.date_received).toLocaleDateString('th-TH', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })
                : '-'
            }
            readOnly
          />
        </div>
        <div className="req-borrow-history-form-group req-borrow-history-full-width">
          <label>หมายเหตุ:</label>
          <textarea
            value={
              selectedBorrowRequest.status === 'Rejected'
                ? selectedBorrowRequest.note_approver || '-'
                : selectedBorrowRequest.note || '-'
            }
            readOnly
          />
        </div>
      </div>
    </div>
  </div>
)}

{selectedReturnRequest && (
  <div className="req-borrow-history-modal-overlay">
    <div className="req-borrow-history-modal">
      <FontAwesomeIcon
        icon={faTimesCircle}
        className="req-borrow-history-modal-close-icon"
        onClick={handleCloseReturnModal}
      />
      <h3>รายละเอียดการยืม - คืนวัสดุ</h3>
      <div className="req-borrow-history-form-grid">
        <div className="req-borrow-history-form-group">
          <label>ชื่อผู้ยืม:</label>
          <input type="text" value={selectedReturnRequest.borrower_name} readOnly />
        </div>
        <div className="req-borrow-history-form-group">
          <label>ฝ่าย/สำนัก:</label>
          <input type="text" value={selectedReturnRequest.department} readOnly />
        </div>
        <div className="req-borrow-history-form-group">
          <label>เบอร์โทร:</label>
          <input type="text" value={selectedReturnRequest.phone} readOnly />
        </div>
        <div className="req-borrow-history-form-group">
          <label>Email:</label>
          <input type="text" value={selectedReturnRequest.email} readOnly />
        </div>
        <div className="req-borrow-history-form-group">
  <label>ประเภท:</label>
  <input type="text" value={selectedReturnRequest.type || '-'} readOnly />
</div>

        <div className="req-borrow-history-form-group">
          <label>อุปกรณ์:</label>
          <input type="text" value={selectedReturnRequest.equipment} readOnly />
        </div>
        <div className="req-borrow-history-form-group">
  <label>ยี่ห้อ:</label>
  <input type="text" value={selectedReturnRequest.brand || '-'} readOnly />
</div>
<div className="req-borrow-history-form-group">
  <label>หมายเลขครุภัณฑ์:</label>
  <input type="text" value={selectedReturnRequest.equipment_number || '-'} readOnly />
</div>
<div className="req-borrow-history-form-group">
  <label>Serial Number:</label>
  <input type="text" value={selectedReturnRequest.serial_number || '-'} readOnly />
</div>

        <div className="req-borrow-history-form-group">
          <label>จำนวน:</label>
          <input type="text" value={selectedReturnRequest.quantity_requested || '-'} readOnly />
        </div>
        <div className="req-borrow-history-form-group">
          <label>วันที่ยืม:</label>
          <input
            type="text"
            value={
              selectedReturnRequest.request_date
                ? new Date(selectedReturnRequest.request_date).toLocaleDateString('th-TH', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })
                : '-'
            }
            readOnly
          />
        </div>
        <div className="req-borrow-history-form-group">
          <label>วันที่คืน:</label>
          <input
            type="text"
            value={
              selectedReturnRequest.return_date
                ? new Date(selectedReturnRequest.return_date).toLocaleDateString('th-TH', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })
                : '-'
            }
            readOnly
          />
        </div>
        <div className="req-borrow-history-form-group">
          <label>สถานะ:</label>
          <input
            type="text"
            value={
              selectedReturnRequest.status === 'Pending'
                ? 'รอดำเนินการ'
                : selectedReturnRequest.status === 'Approved'
                ? 'อนุมัติ'
                : selectedReturnRequest.status === 'Rejected'
                ? 'ไม่อนุมัติ'
                : selectedReturnRequest.status === 'Received'
                ? 'รับของแล้ว'
                : selectedReturnRequest.status === 'Returned'
                ? 'คืนของแล้ว'
                : selectedReturnRequest.status
            }
            readOnly
          />
        </div>
        <div className="req-borrow-history-form-group req-borrow-history-full-width">
          <label>หมายเหตุ:</label>
          <textarea value={selectedReturnRequest.note || '-'} readOnly />
        </div>
        <div className="req-borrow-history-form-group req-borrow-history-full-width">
          <label>หมายเหตุสภาพอุปกรณ์ตอนคืน:</label>
          <textarea value={selectedReturnRequest.return_condition || '-'} readOnly />
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