import React, { useEffect, useState } from "react";
import ITDashboard from "./ITDashboard";
import "./BorrowRejected.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const BorrowRejected = () => {
  const [borrowRequests, setBorrowRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/borrow-requests"
        );
        const data = await response.json();
        setBorrowRequests(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching borrow requests:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const rejectedRequests = borrowRequests.filter(
    (request) => request.status === "Rejected"
  );

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
  };

  const handleCloseDetails = () => {
    setSelectedRequest(null);
  };

  const getStatusInThai = (status) => {
    switch (status) {
      case 'Approved':
        return 'อนุมัติแล้ว';
      case 'Rejected':
        return 'ไม่อนุมัติ';
      case 'Pending':
        return 'รอดำเนินการ';
      default:
        return '-';
    }
  };
  

  return (
    <div>
      <ITDashboard />
      <div className="borrow-rejected-container">
        <h1 className="borrow-rejected-title">
          <FontAwesomeIcon icon={faTimesCircle} /> ไม่อนุมัติ
        </h1>

        <div className="borrow-rejected-list">
          {loading ? (
            <p>กำลังโหลดข้อมูล...</p>
          ) : rejectedRequests.length === 0 ? (
            <p>ไม่มีรายการไม่อนุมัติ</p>
          ) : (
            <table className="borrow-rejected-table">
  <thead>
    <tr>
      <th>ลำดับ</th>
      <th>ชื่อผู้ยืม</th>
      <th>ฝ่าย/สำนัก</th>
      <th>อุปกรณ์</th>
      <th>วันที่ยืม</th>
      <th>จำนวน</th>
      <th>สถานะ</th>
      <th>ดูรายละเอียด</th>
    </tr>
  </thead>
  <tbody>
    {rejectedRequests.map((req, index) => (
      <tr key={req.id}>
        <td>{index + 1}</td>
        <td>{req.borrower_name}</td>
        <td>{req.department}</td>
        <td>{req.equipment}</td>
        <td>{new Date(req.request_date).toLocaleDateString("th-TH")}</td>
        <td>{req.quantity_requested}</td>
        <td>{getStatusInThai(req.status)}</td>
        <td>
          <button
            className="borrow-rejected-detail-button"
            onClick={() => handleViewDetails(req)}
          >
            <FontAwesomeIcon icon={faEye} /> ดูรายละเอียด
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
          )}
        </div>

        {selectedRequest && (
  <div className="borrow-rejected-modal-overlay">
    <div className="borrow-rejected-modal-content">
      <button
        className="borrow-rejected-modal-close-btn"
        onClick={handleCloseDetails}
      >
        &times;
      </button>
      <h3 className="borrow-rejected-modal-title">รายละเอียดคำขอ</h3>
      <div className="borrow-rejected-form-grid">
        <div className="borrow-rejected-form-group">
          <label>ชื่อผู้ขอ:</label>
          <input type="text" value={selectedRequest.borrower_name} readOnly />
        </div>
        <div className="borrow-rejected-form-group">
          <label>ฝ่าย/สำนัก:</label>
          <input type="text" value={selectedRequest.department} readOnly />
        </div>

        <div className="borrow-rejected-form-group">
          <label>โทรศัพท์:</label>
          <input type="text" value={selectedRequest.phone} readOnly />
        </div>
        <div className="borrow-rejected-form-group">
          <label>อีเมล:</label>
          <input type="text" value={selectedRequest.email} readOnly />
        </div>

        <div className="borrow-rejected-form-group">
          <label>วัสดุ/รุ่น:</label>
          <input type="text" value={selectedRequest.material} readOnly />
        </div>
        <div className="borrow-rejected-form-group">
          <label>ประเภท:</label>
          <input type="text" value={selectedRequest.type || "-"} readOnly />
        </div>

        <div className="borrow-rejected-form-group">
          <label>อุปกรณ์:</label>
          <input type="text" value={selectedRequest.equipment} readOnly />
        </div>
        <div className="borrow-rejected-form-group">
          <label>ยี่ห้อ:</label>
          <input type="text" value={selectedRequest.brand} readOnly />
        </div>

        <div className="borrow-rejected-form-group">
          <label>จำนวน:</label>
          <input type="text" value={selectedRequest.quantity_requested} readOnly />
        </div>
        <div className="borrow-rejected-form-group">
  <label>สถานะ:</label>
  <div className="input-scrollable">
    <input
      type="text"
      value={getStatusInThai(selectedRequest.status)}
      readOnly
    />
  </div>
</div>

        <div className="borrow-rejected-form-group">
          <label>วันที่ขอ:</label>
          <input
            type="text"
            value={new Date(selectedRequest.request_date).toLocaleDateString(
              "th-TH"
            )}
            readOnly
          />
        </div>

        <div className="borrow-rejected-form-group">
          <label>วันที่คืน:</label>
          <input
            type="text"
            value={
              selectedRequest.return_date
                ? new Date(selectedRequest.return_date).toLocaleDateString(
                    "th-TH"
                  )
                : "-"
            }
            readOnly
          />
        </div>

        <div className="borrow-rejected-form-group full-width">
          <label>หมายเหตุ:</label>
          <textarea value={selectedRequest.note || "-"} readOnly />
        </div>
      </div>
    </div>
  </div>
)}

        <div className="borrow-rejected-footer">
          <button
            className="borrow-rejected-back-button"
            onClick={() => navigate(-1)}
          >
            ย้อนกลับ
          </button>
        </div>
      </div>
    </div>
  );
};

export default BorrowRejected;
