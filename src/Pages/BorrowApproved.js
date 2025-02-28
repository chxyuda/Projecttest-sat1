import React, { useEffect, useState } from "react";
import ITDashboard from "./ITDashboard";
import "./BorrowApproved.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt, faPrint, faEye, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

const BorrowApproved = () => {
  const [borrowRequests, setBorrowRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [receiverName, setReceiverName] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchDate, setSearchDate] = useState("");
  const navigate = useNavigate();
  const [filteredRequests, setFilteredRequests] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);

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

  const approvedRequests = borrowRequests.filter(
    (request) => request.status === "Approved"
  );

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setReceiverName("");
  };

  const handleCloseDetails = () => {
    setSelectedRequest(null);
    setReceiverName("");
  };

  const handleReceiveConfirm = async () => {
    if (!receiverName.trim()) {
      alert("กรุณากรอกชื่อผู้รับของ");
      return;
    }
  
    try {
      const response = await fetch(
        `http://newstock.sat.or.th:5001/api/borrow-requests/${selectedRequest.id}/receive`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            received_by: receiverName,
            date_received: new Date().toISOString().split('T')[0],
          }),
        }
      );
  
      if (response.ok) {
        alert("บันทึกการรับของสำเร็จ");
        handleCloseDetails();
        fetchData(); // อัปเดตข้อมูลใหม่
      } else {
        alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      }
    } catch (error) {
      console.error("Error updating receive status:", error);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    }
  };
  
  const handleSearch = () => {
    const filteredData = borrowRequests.filter((req) => {
      return new Date(req.request_date).toLocaleDateString("th-TH") === new Date(searchDate).toLocaleDateString("th-TH");
    });
    setBorrowRequests(filteredData);
  };

  const handlePrint = (request) => {
    const doc = new jsPDF();
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(18);
    doc.text("ใบคำขอยืมอุปกรณ์", 70, 20);
    doc.setFontSize(12);
    doc.setFont("Helvetica", "normal");

    let y = 40;
    const lineHeight = 10;

    const addText = (label, value) => {
        doc.text(`${label} ${value}`, 20, y);
        y += lineHeight;
    };

    addText("ชื่อผู้ขอ:", request.borrower_name);
    addText("ฝ่าย/สำนัก:", request.department);
    addText("อุปกรณ์:", request.equipment);
    addText("วันที่ขอ:", new Date(request.request_date).toLocaleDateString("th-TH"));
    addText("จำนวน:", request.quantity_requested);

    doc.text("__________________________", 50, y + 20);
    doc.text("ลงชื่อผู้รับของ", 70, y + 30);

    doc.save(`Borrow_Request_${request.borrower_name}.pdf`);
};
const handleApproveRequest = async (requestId) => {
  const isConfirmed = window.confirm("คุณแน่ใจหรือไม่ว่าต้องการอนุมัติคำขอนี้?");
  
  if (!isConfirmed) {
      alert("❌ ยกเลิกการอนุมัติ");
      return; // ออกจากฟังก์ชันถ้าผู้ใช้กด Cancel
  }

  try {
      const response = await fetch(`http://newstock.sat.or.th:5001/api/borrow-requests/${requestId}/approve`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Approved" }),
      });

      const responseData = await response.json();

      if (!response.ok) {
          console.error("🔥 API Error:", responseData);
          alert("เกิดข้อผิดพลาดในการอนุมัติคำขอ: " + responseData.error);
          return;
      }

      alert("✅ อนุมัติคำขอสำเร็จ!");
      fetchData(); // อัปเดตข้อมูลใหม่หลังจากอนุมัติ
  } catch (error) {
      console.error("🔥 Fetch Error:", error);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
  }
};


  return (
    <div>
      <ITDashboard />
      <div className="borrow-approved-container">
  <h1 className="borrow-approved-title">
    <FontAwesomeIcon icon={faSyncAlt} /> อนุมัติแล้ว
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
        <div className="borrow-approved-list">
                    {loading ? (
                        <p>กำลังโหลดข้อมูล...</p>
                    ) : (
                        <table className="borrow-approved-table">
                            <thead>
                                <tr>
                                    <th>ลำดับ</th>
                                    <th>ชื่อผู้ยืม</th>
                                    <th>ฝ่าย/สำนัก</th>
                                    <th>อุปกรณ์</th>
                                    <th>วันที่ยืม</th>
                                    <th>จำนวน</th>
                                    <th>ดูรายละเอียด</th>
                                    <th>พิมพ์</th>
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
                                            <td>{new Date(req.request_date).toLocaleDateString("th-TH")}</td>
                                            <td>{req.quantity_requested}</td>
                                            <td><button onClick={() => handleViewDetails(req)}><FontAwesomeIcon icon={faEye} /> ดูรายละเอียด</button></td>
                                            <td><button onClick={() => handlePrint(req)}><FontAwesomeIcon icon={faPrint} /> พิมพ์</button></td>
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
        <div className="borrow-approved-footer">
          <button className="borrow-approved-back-button" onClick={() => navigate(-1)}>
            ย้อนกลับ
          </button>
        </div>
</div>
        {selectedRequest && (
  <div className="borrow-approved-modal-overlay">
    <div className="borrow-approved-modal-content">
      <span className="borrow-approved-modal-close" onClick={handleCloseDetails}>
        &times;
      </span>
      <h3>รายละเอียดคำขอ</h3>

      <div className="borrow-approved-form-grid">
        <div className="borrow-approved-form-group">
          <label>ชื่อผู้ขอ:</label>
          <input type="text" value={selectedRequest.borrower_name} readOnly />
        </div>
        <div className="borrow-approved-form-group">
          <label>ฝ่าย/สำนัก:</label>
          <input type="text" value={selectedRequest.department} readOnly />
        </div>
        <div className="borrow-approved-form-group">
          <label>โทรศัพท์:</label>
          <input type="text" value={selectedRequest.phone} readOnly />
        </div>
        <div className="borrow-approved-form-group">
          <label>อีเมล:</label>
          <input type="text" value={selectedRequest.email} readOnly />
        </div>
        <div className="borrow-approved-form-group">
          <label>วัสดุ/รุ่น:</label>
          <input type="text" value={selectedRequest.material} readOnly />
        </div>
        <div className="borrow-approved-form-group">
          <label>ประเภท:</label>
          <input type="text" value={selectedRequest.type || "-"} readOnly />
        </div>
        <div className="borrow-approved-form-group">
          <label>อุปกรณ์:</label>
          <input type="text" value={selectedRequest.equipment} readOnly />
        </div>
        <div className="borrow-approved-form-group">
          <label>ยี่ห้อ:</label>
          <input type="text" value={selectedRequest.brand} readOnly />
        </div>
        <div className="borrow-approved-form-group">
          <label>จำนวน:</label>
          <input type="text" value={selectedRequest.quantity_requested} readOnly />
        </div>
        <div className="borrow-approved-form-group">
          <label>วันที่ขอ:</label>
          <input
            type="text"
            value={new Date(selectedRequest.request_date).toLocaleDateString("th-TH")}
            readOnly
          />
        </div>
        <div className="borrow-approved-form-group">
          <label>วันที่คืน:</label>
          <input
            type="text"
            value={
              selectedRequest.return_date
                ? new Date(selectedRequest.return_date).toLocaleDateString("th-TH")
                : "-"
            }
            readOnly
          />
        </div>
        <div className="borrow-approved-form-group">
          <label>หมายเหตุ:</label>
          <input type="text" value={selectedRequest.note || "-"} readOnly />
        </div>
      </div>

      {/* ส่วนรับของ */}
      <div className="receive-section">
        <label>ชื่อผู้รับของ:</label>
        <input
          type="text"
          value={receiverName}
          onChange={(e) => setReceiverName(e.target.value)}
        />
        <button className="confirm-receive-button" onClick={handleApproveRequest}>
          ยืนยันการรับของ
        </button>
      </div>
    </div>
  </div>
)}
      </div>
  );
};

export default BorrowApproved;