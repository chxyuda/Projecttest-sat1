import React, { useEffect, useState } from "react";
import ITDashboard from "./ITDashboard";
import "./BorrowReturn.css";
import AddBorrowRequest from "./AddBorrowRequest";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCheck,
  faClipboardList,
  faPlus,
  faSyncAlt,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

const BorrowReturn = () => {
  const [borrowRequests, setBorrowRequests] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  

  // สำหรับแบ่งหน้า
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();


  const fetchData = async () => {
    try {
      const response = await fetch("http://newstock.sat.or.th:5001/api/borrow-requests"); // เปลี่ยน URL ให้ตรงกับ API จริง
      const data = await response.json();
      setBorrowRequests(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching borrow requests:", error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  
  

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setCurrentPage(1); // รีเซ็ตหน้ากลับไปหน้าแรก
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
  };

  const closeDetailsModal = () => {
    setSelectedRequest(null);
  };

  const handleCloseHistory = () => {
    setSelectedRequest(null);
  };
  

  // กรองข้อมูลตามสถานะ
  const filteredRequests = borrowRequests.filter((req) => {
    switch (selectedFilter) {
      case "approved":
        return req.status === "Approved";
      case "pending":
        return req.status === "Pending";
      case "rejected":
        return req.status === "Rejected";
      case "borrow-status":
        return req.status === "Received" || req.status === "Returned";
      case "all":
        return true; // แสดงทั้งหมด
      default:
        return true;
    }
  });
  

  const getStatusInThai = (status) => {
  switch (status) {
    case "Pending":
      return "รออนุมัติ";
    case "Approved":
      return "อนุมัติแล้ว";
    case "Rejected":
      return "ไม่อนุมัติ";
    case "Received":
      return "รับของแล้ว";
    case "Returned":
      return "คืนของแล้ว";
    case "WaitingReceive":
      return "รอรับของ";
    default:
      return status;
  }
};

console.log("Filtered Data:", filteredRequests);
  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddRequest = async (newRequest) => {
    try {
      const response = await fetch("http://newstock.sat.or.th:5001/api/borrow-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          borrower_name: newRequest.borrower_name,
          department: newRequest.department,
          equipment: newRequest.equipment,
          request_date: newRequest.request_date,
          quantity_requested: newRequest.quantity,
          status: "Pending",
        }),
      });
  
      if (response.ok) {
        alert("เพิ่มรายการสำเร็จ");
        fetchData(); // ✅ โหลดข้อมูลใหม่
        setShowAddModal(false); // ✅ ปิด Modal
      } else {
        alert("เกิดข้อผิดพลาดในการเพิ่มข้อมูล");
      }
    } catch (error) {
      console.error("Error adding borrow request:", error);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    }
  };
  

  return (
    <div>
      <ITDashboard />
      <div className="borrow-return-container">
        <h1 className="borrow-return-title">
          <FontAwesomeIcon icon={faSyncAlt} /> ยืม/คืน
        </h1>

        <div className="borrow-return-buttons">
          <div className="borrow-return-buttons-container">
            <button onClick={() => navigate('/borrow-pending')}>
              <FontAwesomeIcon icon={faClock} /> รออนุมัติ
            </button>
            <button onClick={() => navigate('/borrow-approved')}>
              <FontAwesomeIcon icon={faCheck} /> อนุมัติแล้ว
            </button>
            <button
              className={selectedFilter === "rejected" ? "active" : ""}
              onClick={() => navigate("/borrow-rejected")}
            >
              <FontAwesomeIcon icon={faTimesCircle} /> ไม่อนุมัติ
            </button>
            <button
              className="borrow-return-status-button"
              onClick={() => navigate("/borrow-statusit")}
            >
              <FontAwesomeIcon icon={faClipboardList} /> สถานะยืม-คืน
            </button>
            <button className="add-btn" onClick={openAddModal}>
              <FontAwesomeIcon icon={faPlus} /> เพิ่ม
            </button>
          </div>
        </div>

        <div className="borrow-return-list">
          {loading ? (
            <p>กำลังโหลดข้อมูล...</p>
          ) : (
            <table className="borrow-return-table">
              <thead>
                <tr>
                  <th>ลำดับ</th>
                  <th>ชื่อผู้ยืม</th>
                  <th>ฝ่าย/สำนัก</th>
                  <th>อุปกรณ์</th>
                  <th>วันที่ยืม</th>
                  <th>จำนวน</th>
                  <th>สถานะ</th>
                  <th>รายละเอียด</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((req, index) => (
                    <tr key={req.id}>
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td>{req.borrower_name}</td>
                      <td>{req.department}</td>
                      <td>{req.equipment}</td>
                      <td>{new Date(req.request_date).toLocaleDateString("th-TH")}</td>
                      <td>{req.quantity_requested}</td>
                      <td>{req.status === "Pending" ? "รอดำเนินการ" : req.status === "Approved" ? "อนุมัติแล้ว" : req.status === "Rejected" ? "ไม่อนุมัติ" : req.status === "Received" ? "รับของแล้ว" : req.status === "Returned" ? "คืนของแล้ว" : req.status}</td>
                      <td>
                        <button className="detail-button" onClick={() => handleViewDetails(req)}>ดูรายละเอียด</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">ไม่มีข้อมูล</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="pagination">
  {Array.from({ length: Math.ceil(filteredRequests.length / itemsPerPage) }, (_, i) => (
    <button key={i + 1} onClick={() => paginate(i + 1)}>
      {i + 1}
    </button>
  ))}
</div>

        {selectedRequest && (
  <div className="borrow-return-modal-overlay">
    <div className="borrow-return-modal-content">
      <FontAwesomeIcon
        icon={faTimesCircle}
        className="borrow-return-modal-close-icon"
        onClick={handleCloseHistory}
      />
      <h3 className="modal-title">รายละเอียดคำขอ</h3>
      <div className="borrow-return-form-grid">
        <div className="borrow-return-form-group">
          <label>ชื่อผู้ขอ:</label>
          <span>{selectedRequest.borrower_name}</span>
        </div>
        <div className="borrow-return-form-group">
          <label>ฝ่าย/สำนัก:</label>
          <span>{selectedRequest.department}</span>
        </div>

        <div className="borrow-return-form-group">
          <label>โทรศัพท์:</label>
          <span>{selectedRequest.phone}</span>
        </div>
        <div className="borrow-return-form-group">
          <label>อีเมล:</label>
          <span>{selectedRequest.email}</span>
        </div>

        <div className="borrow-return-form-group">
          <label>วัสดุ/รุ่น:</label>
          <span>{selectedRequest.material}</span>
        </div>
        <div className="borrow-return-form-group">
          <label>ประเภท:</label>
          <span>{selectedRequest.type || "-"}</span>
        </div>

        <div className="borrow-return-form-group">
          <label>อุปกรณ์:</label>
          <span>{selectedRequest.equipment}</span>
        </div>
        <div className="borrow-return-form-group">
          <label>ยี่ห้อ:</label>
          <span>{selectedRequest.brand}</span>
        </div>

        <div className="borrow-return-form-group">
          <label>จำนวน:</label>
          <span>{selectedRequest.quantity_requested}</span>
        </div>
        <div className="borrow-return-form-group">
          <label>สถานะ:</label>
          <span>{getStatusInThai(selectedRequest.status)}</span>
        </div>

        <div className="borrow-return-form-group">
          <label>วันที่ขอ:</label>
          <span>{new Date(selectedRequest.request_date).toLocaleDateString("th-TH")}</span>
        </div>
        <div className="borrow-return-form-group">
          <label>วันที่คืน:</label>
          <span>
            {selectedRequest.return_date
              ? new Date(selectedRequest.return_date).toLocaleDateString("th-TH")
              : "-"}
          </span>
        </div>

        <div className="borrow-return-form-group">
          <label>อนุมัติโดย:</label>
          <span>{selectedRequest.approved_by || "-"}</span>
        </div>
        <div className="borrow-return-form-group">
          <label>วันที่อนุมัติ:</label>
          <span>
            {selectedRequest.date_approved
              ? new Date(selectedRequest.date_approved).toLocaleDateString("th-TH")
              : "-"}
          </span>
        </div>

        <div className="borrow-return-form-group">
          <label>รับของโดย:</label>
          <span>{selectedRequest.received_by || "-"}</span>
        </div>
        <div className="borrow-return-form-group">
          <label>วันที่รับของ:</label>
          <span>
            {selectedRequest.date_received
              ? new Date(selectedRequest.date_received).toLocaleDateString("th-TH")
              : "-"}
          </span>
        </div>

        <div className="borrow-return-form-group">
          <label>หมายเหตุ:</label>
          <span>{selectedRequest.note || "-"}</span>
        </div>
      </div>
    </div>
  </div>
)}
{showAddModal && (
  <AddBorrowRequest onClose={closeAddModal} onSubmit={handleAddRequest} />
)}

    </div>
  </div>
);
};

export default BorrowReturn;
