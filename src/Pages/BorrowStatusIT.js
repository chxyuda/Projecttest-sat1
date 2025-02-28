import React, { useEffect, useState } from "react";
import ITDashboard from "./ITDashboard";
import "./BorrowStatusIT.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList, faSearch, faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const BorrowStatusIT = () => {
  const [borrowRequests, setBorrowRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchDate, setSearchDate] = useState("");
  const [filteredRequests, setFilteredRequests] = useState([]);

  
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://newstock.sat.or.th:5001/api/borrow-requests");
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

  const getBorrowReturnStatus = (status) => {
    switch (status) {
      case "Received":
        return "รับของแล้ว";
      case "Returned":
        return "คืนของแล้ว";
      default:
        return "";
    }
  };

  useEffect(() => {
    setFilteredRequests(
      borrowRequests.filter(
        (req) => req.status === "Received" || req.status === "Returned"
      )
    );
  }, [borrowRequests]);
  

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
  };
  
  const handleCloseDetails = () => {
    setSelectedRequest(null);
  };

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
      case 'Returned':
        return 'คืนของแล้ว';
      default:
        return 'ไม่ทราบสถานะ';
    }
  };

  const isReturnable = () => {
    if (!selectedRequest) return false;
    return selectedRequest.status === "Received";
  };
  

  const [returnNote, setReturnNote] = useState(""); // state สำหรับเก็บหมายเหตุคืนของ

  const handleReturnItem = async () => {
    if (!returnNote.trim()) {
      alert("กรุณากรอกหมายเหตุการคืนของ");
      return;
    }
  
    const isConfirmed = window.confirm("คุณแน่ใจหรือไม่ว่าต้องการคืนของ?");
    if (!isConfirmed) {
      alert("❌ ยกเลิกการคืนของ");
      return; // ออกจากฟังก์ชันหากผู้ใช้กด Cancel
    }
  
    try {
      const response = await fetch(
        `http://newstock.sat.or.th:5001/api/borrow-requests/${selectedRequest.id}/return`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            return_date: new Date().toISOString().split("T")[0],
            note: returnNote,
          }),
        }
      );
  
      if (response.ok) {
        alert("✅ อัปเดตสถานะเป็น 'คืนของแล้ว' สำเร็จ");
        setSelectedRequest(null); // ปิด modal หลังจากอัปเดตสำเร็จ
      } else {
        const errorData = await response.json();
        alert("❌ เกิดข้อผิดพลาด: " + errorData.error);
      }
    } catch (error) {
      console.error("🔥 Error updating return status:", error);
      alert("❌ เกิดข้อผิดพลาด: " + error.message);
    }
  };
  

const handleSearch = () => {
  if (!searchDate) {
    setFilteredRequests(
      borrowRequests.filter(
        (req) => req.status === "Received" || req.status === "Returned"
      )
    );
  } else {
    const filteredData = borrowRequests.filter((req) => {
      return (
        (req.status === "Received" || req.status === "Returned") &&
        new Date(req.request_date).toLocaleDateString("th-TH") === new Date(searchDate).toLocaleDateString("th-TH")
      );
    });
    setFilteredRequests(filteredData);
  }
};

  return (
    <div>
      <ITDashboard />
      <div className="borrow-statusit-container">
      <h1 className="borrow-statusit-title">
  <FontAwesomeIcon icon={faClipboardList} style={{ marginRight: "8px" }} />
  สถานะยืม-คืน
</h1>

<div className="borrw-search-container">
          <input 
            type="date" 
            value={searchDate} 
            onChange={(e) => setSearchDate(e.target.value)} 
          />
          <button onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} /> ค้นหา
          </button>
        </div>

        <div className="borrow-statusit-list">
          <table className="borrow-statusit-table">
            <thead>
              <tr>
                <th>ลำดับ</th>
                <th>ชื่อผู้ยืม</th>
                <th>ฝ่าย/สำนัก</th>
                <th>อุปกรณ์</th>
                <th>จำนวน</th>
                <th>สถานะ</th>
                <th>วันที่ยืม</th>
                <th>วันที่คืน</th>
                <th>รายละเอียด</th>
              </tr>
            </thead>
            <tbody>
  {filteredRequests.length > 0 ? (
    filteredRequests.map((req, index) => (
      <tr key={req.id}>
        <td>{index + 1}</td>
        <td>{req.borrower_name}</td>
        <td>{req.department}</td>
        <td>{req.equipment}</td>
        <td>{req.quantity_requested}</td>
        <td>{getStatusInThai(req.status)}</td>
        <td>{new Date(req.request_date).toLocaleDateString("th-TH")}</td>
        <td>{req.return_date ? new Date(req.return_date).toLocaleDateString("th-TH") : "-"}</td>
        <td>
          <button className="borrow-statusit-detail-button"
            onClick={() => handleViewDetails(req)} >
            <FontAwesomeIcon icon={faEye} /> ดูรายละเอียด
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="9">ไม่มีรายการ</td>
    </tr>
  )}
</tbody>
          </table>
        </div>
  <div className="borrow-statusit-footer">
        <button className="borrow-statusit-back-button" onClick={() => navigate(-1)}>
          ย้อนกลับ
        </button>
      </div>
</div>
{selectedRequest && (
  <div className="statusit-modal-overlay">
    <div className="statusit-modal-content">
      <div className="statusit-modal-header">
        <h2>รายละเอียดคำขอ</h2>
        <button className="statusit-modal-close-button" onClick={handleCloseDetails}>
          &times;
        </button>
      </div>

      <div className="statusit-modal-form-grid">
        <div>
          <label>ชื่อผู้ขอ:</label>
          <input type="text" value={selectedRequest.borrower_name} readOnly />
        </div>

        <div>
          <label>ฝ่าย/สำนัก:</label>
          <input type="text" value={selectedRequest.department} readOnly />
        </div>

        <div>
          <label>โทรศัพท์:</label>
          <input type="text" value={selectedRequest.phone} readOnly />
        </div>

        <div>
          <label>อีเมล:</label>
          <input type="text" value={selectedRequest.email} readOnly />
        </div>

        <div>
          <label>วัสดุ/รุ่น:</label>
          <input type="text" value={selectedRequest.material} readOnly />
        </div>

        <div>
          <label>ประเภท:</label>
          <input type="text" value={selectedRequest.type} readOnly />
        </div>

        <div>
          <label>อุปกรณ์:</label>
          <input type="text" value={selectedRequest.equipment} readOnly />
        </div>

        <div>
          <label>ยี่ห้อ:</label>
          <input type="text" value={selectedRequest.brand} readOnly />
        </div>

        <div>
          <label>จำนวน:</label>
          <input type="text" value={selectedRequest.quantity_requested} readOnly />
        </div>

        <div>
          <label>วันที่ขอ:</label>
          <input
            type="text"
            value={new Date(selectedRequest.request_date).toLocaleDateString('th-TH')}
            readOnly
          />
        </div>

        <div>
          <label>วันที่คืน:</label>
          <input
            type="text"
            value={
              selectedRequest.return_date
                ? new Date(selectedRequest.return_date).toLocaleDateString('th-TH')
                : '-'
            }
            readOnly
          />
        </div>

        <div>
          <label>สถานะ:</label>
          <input type="text" value={getStatusInThai(selectedRequest.status)} readOnly />
        </div>

        <div>
          <label>ผู้รับของ:</label>
          <input type="text" value={selectedRequest.received_by || '-'} readOnly />
        </div>

        <div>
          <label>วันที่รับของ:</label>
          <input
            type="text"
            value={
              selectedRequest.date_received
                ? new Date(selectedRequest.date_received).toLocaleDateString('th-TH')
                : '-'
            }
            readOnly
          />
        </div>

        <div className="statusit-modal-fullwidth">
          <label>หมายเหตุ:</label>
          <textarea value={selectedRequest.note || '-'} readOnly />
        </div>
      </div>
      {isReturnable() && (
  <div className="statusit-modal-return-section">
    <textarea
      placeholder="หมายเหตุการคืนของ (สภาพของ / ปัญหา ฯลฯ)"
      value={returnNote}
      onChange={(e) => setReturnNote(e.target.value)}
    />
    <button className="statusit-modal-return-button" onClick={handleReturnItem}>
      คืนของแล้ว
    </button>
  </div>
)}

    </div>
  </div>
)}
    </div>
  );
};

export default BorrowStatusIT;
