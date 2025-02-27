import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ITDashboard from "./ITDashboard";
import "./RequestApproved.css";
import { jsPDF } from "jspdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye, faArrowLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
 
const RequestApproved = () => {
    const [approvedRequests, setApprovedRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [searchDate, setSearchDate] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [remainingStock, setRemainingStock] = useState("ไม่ทราบ");
    const [receiverName, setReceiverName] = useState("");
 
 
 
    useEffect(() => {
      const fetchApprovedRequests = async () => {
        try {
          const response = await fetch("http://localhost:5001/api/requests");
          const data = await response.json();
 
          // กรองเฉพาะคำขอที่ "อนุมัติแล้ว"
          const filtered = data.filter(req => req.status === "Approved");
          setApprovedRequests(filtered);
          setFilteredRequests(filtered);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching requests:", error);
          setLoading(false);
        }
      };
 
      fetchApprovedRequests();
  }, [])
 
  useEffect(() => {
    if (selectedRequest) {
      fetch(`http://localhost:5001/api/products/model/${selectedRequest.material}`)
        .then((res) => res.json())
        .then((data) => setRemainingStock(data.remaining || "ไม่ทราบ"))
        .catch((error) => {
          console.error("Error fetching remaining stock:", error);
          setRemainingStock("ไม่ทราบ");
        });
    }
  }, [selectedRequest]);
 
  const handleViewDetails = async (request) => {
    try {
      const response = await fetch(`http://localhost:5001/api/products/model/${request.material}`);
      const data = await response.json();
 
      console.log("API Response:", data); // ✅ ตรวจสอบข้อมูล API
 
      setSelectedRequest({
        ...request,
        remaining: data.remaining !== undefined && data.remaining !== null ? data.remaining : "ไม่มีข้อมูล",
      });
    } catch (error) {
      console.error("ไม่สามารถโหลดจำนวนคงเหลือ:", error);
      setSelectedRequest({ ...request, remaining: "ไม่มีข้อมูล" });
    }
  };
 
 
  const handleCloseDetails = () => {
    setSelectedRequest(null);
  };
 
  const handleSearch = () => {
    if (searchDate) {
      const formattedSearchDate = new Date(searchDate).toLocaleDateString("th-TH");
 
      const filtered = approvedRequests.filter((request) => {
        const requestDate = new Date(request.date_requested).toLocaleDateString("th-TH");
        return requestDate === formattedSearchDate;
      });
 
      setFilteredRequests(filtered);
    } else {
      setFilteredRequests(approvedRequests);
    }
  };
 
  const getStatusInThai = (status) => {
    switch (status) {
      case "Approved":
        return "อนุมัติแล้ว";
      case "Pending":
        return "รออนุมัติ";
      case "Rejected":
        return "ไม่อนุมัติ";
      case "Received":
        return "รับของแล้ว";
      default:
        return status;
    }
  };
 
  const handleApproveRequest = async (requestId) => {
    const isConfirmed = window.confirm("คุณแน่ใจหรือไม่ว่าต้องการอนุมัติคำขอนี้?");
   
    if (!isConfirmed) {
        alert("❌ ยกเลิกการอนุมัติ");
        return; // ออกจากฟังก์ชันถ้าผู้ใช้กด Cancel
    }
 
    try {
        const response = await fetch(`http://localhost:5001/api/requests/${requestId}/approve`, {
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
 
        alert("✅ คำขอสำเร็จ!");
        setApprovedRequests((prev) =>
            prev.map((req) => (req.id === requestId ? { ...req, status: "Received" } : req))
        );
    } catch (error) {
        console.error("🔥 Fetch Error:", error);
        alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    }
};
 
 
const handleReceiveItem = async (requestId) => {
  if (!receiverName.trim()) {
    alert("❌ กรุณากรอกชื่อผู้รับของ");
    return;
  }

  try {
    console.log("📤 Sending Data:", {
      received_by: receiverName,
      date_received: new Date().toISOString().split('T')[0]
    });

    const response = await fetch(`http://localhost:5001/api/requests/${requestId}/receive`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        received_by: receiverName,
        date_received: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error("🔥 API Error:", responseData);
      alert("❌ เกิดข้อผิดพลาดในการอัปเดตสถานะ: " + responseData.error);
      return;
    }

    alert("✅ อัปเดตสถานะเป็น 'รับของแล้ว' สำเร็จ");

    // ✅ อัปเดตรายการใน State ให้เปลี่ยนสถานะ
    setApprovedRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, status: "Received", received_by: receiverName } : req
      )
    );

    setFilteredRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, status: "Received", received_by: receiverName } : req
      )
    );

    setSelectedRequest((prev) => ({
      ...prev,
      status: "Received",
      received_by: receiverName,
    }));

  } catch (error) {
    console.error("🔥 Fetch Error:", error);
    alert("❌ เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
  }
};

 
  const handleGeneratePDF = (request) => {
    const doc = new jsPDF();
 
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(18);
    doc.text("ใบคำขอเบิกอุปกรณ์", 70, 20);
 
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
    addText("โทรศัพท์:", request.phone);
    addText("อีเมล:", request.email);
    addText("อุปกรณ์:", request.equipment);
    addText("ยี่ห้อ:", request.brand);
    addText("จำนวน:", request.quantity_requested);
    addText("วันที่ขอ:", new Date(request.date_requested).toLocaleDateString("th-TH"));
 
    doc.text("__________________________", 50, y + 20);
    doc.text("ลงชื่อผู้รับของ", 70, y + 30);
 
    doc.save(`คำขอเบิก_${request.borrower_name}.pdf`);
  };
 
  const handlePrint = (request) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
        <html>
        <head>
            <title>ใบคำขอเบิกอุปกรณ์</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h2 { text-align: center; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid black; padding: 10px; text-align: left; }
                .signature { margin-top: 40px; }
            </style>
        </head>
        <body>
            <h2>ใบคำขอเบิกอุปกรณ์</h2>
            <table>
                <tr><th>ชื่อผู้ขอ:</th><td>${request.borrower_name}</td></tr>
                <tr><th>ฝ่าย/สำนัก:</th><td>${request.department}</td></tr>
                <tr><th>โทรศัพท์:</th><td>${request.phone}</td></tr>
                <tr><th>อีเมล:</th><td>${request.email}</td></tr>
                <tr><th>อุปกรณ์:</th><td>${request.equipment}</td></tr>
                <tr><th>ยี่ห้อ:</th><td>${request.brand}</td></tr>
                <tr><th>จำนวน:</th><td>${request.quantity_requested}</td></tr>
                <tr><th>วันที่ขอ:</th><td>${new Date(request.date_requested).toLocaleDateString("th-TH")}</td></tr>
            </table>
            <div class="signature">
                <p>ลงชื่อผู้รับของ: ___________________________</p>
            </div>
            <script>
                window.onload = function() {
                    window.print();
                };
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
};
 
 
 
  return (
    <div>
      <ITDashboard />
      <div className="request-approved-container">
            <h1 className="request-approved-title"><FontAwesomeIcon icon={faCheck} /> คำขอเบิกที่อนุมัติแล้ว</h1>
            {/* ช่องค้นหาวันที่ */}
            <div className="search-container">
                <input
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                />
                <button onClick={handleSearch}>
                    <FontAwesomeIcon icon={faSearch} /> ค้นหา
                </button>
            </div>
            <div className="request-approved-list">
                {loading ? (
                    <p>กำลังโหลดข้อมูล...</p>
                ) : (
                <table className="request-approved-table">
                <thead>
                    <tr>
                        <th>ลำดับ</th>
                        <th>ชื่อผู้ขอ</th>
                        <th>ฝ่าย/สำนัก</th>
                        <th>อุปกรณ์</th>
                        <th>วันที่ขอ</th>
                        <th>จำนวน</th>
                        <th>ดูรายละเอียด</th>
                        <th>พิมพ์</th> {/* ✅ เพิ่มคอลัมน์ Print */}
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
                            <td>{new Date(req.date_requested).toLocaleDateString("th-TH")}</td>
                            <td>{req.quantity_requested}</td>
                            <td>
                                <button
                                    className="request-approved-detail-button"
                                    onClick={() => handleViewDetails(req)}
                                >
                                    <FontAwesomeIcon icon={faEye} /> ดูรายละเอียด
                                </button>
                            </td>
                            <td>
                                <button
                                    className="print-button"
                                    onClick={() => handlePrint(req)}
                                >
                                    🖨️ พิมพ์
                                </button>
                            </td>
                        </tr>
                        ))
                    ) : (
                    <tr>
                        <td colSpan="8" style={{ textAlign: "center", fontWeight: "bold", padding: "20px", color: "#000" }}>
                            ไม่มีข้อมูล
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
            )}
        </div>
 
        {/* Modal ดูรายละเอียด */}
        {selectedRequest && (
        <div className="request-approved-modal-overlay">
    <div className="request-approved-modal-content">
      <span className="request-approved-modal-close" onClick={handleCloseDetails}>
        &times;
      </span>
      <h3>รายละเอียดคำขอ</h3>
      <div className="request-approved-form-grid">
        <div className="request-approved-form-group">
          <label>ชื่อผู้ขอ:</label>
          <input type="text" value={selectedRequest.borrower_name} readOnly />
        </div>
        <div className="request-approved-form-group">
          <label>ฝ่าย/สำนัก:</label>
          <input type="text" value={selectedRequest.department} readOnly />
        </div>
        <div className="request-approved-form-group">
          <label>โทรศัพท์:</label>
          <input type="text" value={selectedRequest.phone} readOnly />
        </div>
        <div className="request-approved-form-group">
          <label>อีเมล:</label>
          <input type="text" value={selectedRequest.email} readOnly />
        </div>
        <div className="request-approved-form-group">
          <label>วัสดุ/รุ่น:</label>
          <input type="text" value={selectedRequest.material} readOnly />
        </div>
        <div className="request-approved-form-group">
          <label>ประเภท:</label>
          <input type="text" value={selectedRequest.type || "-"} readOnly />
        </div>
        <div className="request-approved-form-group">
          <label>อุปกรณ์:</label>
          <input type="text" value={selectedRequest.equipment} readOnly />
        </div>
        <div className="request-approved-form-group">
          <label>ยี่ห้อ:</label>
          <input type="text" value={selectedRequest.brand} readOnly />
        </div>
        <div className="request-approved-form-group">
          <label>จำนวน:</label>
          <input type="text" value={selectedRequest.quantity_requested} readOnly />
        </div>
        <div className="request-approved-form-group">
          <label>วันที่ขอ:</label>
          <input
            type="text"
            value={new Date(selectedRequest.date_requested).toLocaleDateString("th-TH")}
            readOnly
          />
        </div>
        <div className="request-approved-form-group">
          <label>จำนวนคงเหลือ:</label>
          <input type="text" value={selectedRequest.remaining || "ไม่ทราบ"} readOnly />
        </div>
        <div className="request-approved-form-group">
          <label>สถานะ:</label>
          <input type="text" value={getStatusInThai(selectedRequest.status)} readOnly />
        </div>
        <div className="request-approved-form-group">
          <label>หมายเหตุ:</label>
          <input type="text" value={selectedRequest.note || "-"} readOnly />
        </div>
      </div>
 
      {/* ✅ ส่วนรับของ */}
      {selectedRequest.status !== "Received" && (
        <div className="receive-section">
          <label>ชื่อผู้รับของ:</label>
          <input
            type="text"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
            placeholder="กรอกชื่อผู้รับของ"
          />
          <button
            className="confirm-receive-button"
            onClick={() =>handleApproveRequest(selectedRequest.id)}
            disabled={!receiverName.trim()}
          >
            ✅ ยืนยันรับของ
          </button>
        </div>
      )}
    </div>
  </div>
)}
 
 
        <div className="request-approved-footer">
          <button className="request-approved-back-button" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeft} /> ย้อนกลับ
          </button>
        </div>
      </div>
    </div>
  );
};
 
export default RequestApproved;
 