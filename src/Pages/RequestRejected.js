import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ITDashboard from "./ITDashboard";
import "./RequestRejected.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faEye, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const RequestRejected = () => {
    const [rejectedRequests, setRejectedRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [searchDate, setSearchDate] = useState("");
    const [selectedRequest, setSelectedRequest] = useState(null); // ✅ เก็บข้อมูลที่เลือก
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRejectedRequests = async () => {
            try {
                const response = await fetch("http://localhost:5001/api/requests");
                const data = await response.json();

                // กรองเฉพาะคำขอที่ "ไม่อนุมัติ"
                const filtered = data.filter(req => req.status === "Rejected");
                setRejectedRequests(filtered);
                setFilteredRequests(filtered);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching requests:", error);
                setLoading(false);
            }
        };

        fetchRejectedRequests();
    }, []);

    // ฟังก์ชันค้นหาตามวันที่
    const handleSearch = () => {
        if (searchDate) {
            const formattedSearchDate = new Date(searchDate).toLocaleDateString("th-TH");
            const filtered = rejectedRequests.filter((request) => {
                const requestDate = new Date(request.date_requested).toLocaleDateString("th-TH");
                return requestDate === formattedSearchDate;
            });
            setFilteredRequests(filtered);
        } else {
            setFilteredRequests(rejectedRequests);
        }
    };

    // ฟังก์ชันแสดงรายละเอียด
    const handleViewDetails = async (request) => {
        try {
            const response = await fetch(`http://localhost:5001/api/products/model/${request.material}`);
            const data = await response.json();
    
            console.log("API Response:", data); // ✅ ตรวจสอบข้อมูล API ที่ส่งกลับมาใน Console
    
            setSelectedRequest({
                ...request,
                remaining: data.remaining !== undefined ? data.remaining : "ไม่ทราบ",
            });
        } catch (error) {
            console.error('ไม่สามารถโหลดจำนวนคงเหลือ:', error);
            setSelectedRequest({ ...request, remaining: 'ไม่ทราบ' });
        }
    };
    

    // ปิด Modal
    const handleCloseDetails = () => {
        setSelectedRequest(null);
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
      
    return (
        <div>
            <ITDashboard />
            <div className="request-rejected-container">
                <h1 className="request-rejected-title">
                    <FontAwesomeIcon icon={faTimesCircle} /> คำขอเบิกที่ไม่อนุมัติ
                </h1>

                {/* ช่องค้นหาวันที่ */}
                <div className="search-container">
                    <input type="date" value={searchDate} onChange={(e) => setSearchDate(e.target.value)} />
                    <button onClick={handleSearch}>ค้นหา</button>
                </div>

                <div className="request-rejected-list">
                    {loading ? (
                        <p>กำลังโหลดข้อมูล...</p>
                    ) : filteredRequests.length > 0 ? (
                        <table className="request-rejected-table">
                            <thead>
                                <tr>
                                    <th>ลำดับ</th>
                                    <th>ชื่อผู้ขอ</th>
                                    <th>ฝ่าย/สำนัก</th>
                                    <th>อุปกรณ์</th>
                                    <th>วันที่ขอ</th>
                                    <th>จำนวน</th>
                                    <th>ดูรายละเอียด</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRequests.map((req, index) => (
                                    <tr key={req.id}>
                                        <td>{index + 1}</td>
                                        <td>{req.borrower_name}</td>
                                        <td>{req.department}</td>
                                        <td>{req.equipment}</td>
                                        <td>{new Date(req.date_requested).toLocaleDateString("th-TH")}</td>
                                        <td>{req.quantity_requested}</td>
                                        <td>
                                            <button className="request-rejected-detail-button" onClick={() => handleViewDetails(req)}>
                                                <FontAwesomeIcon icon={faEye} /> ดูรายละเอียด
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p style={{ textAlign: "center", fontWeight: "bold", padding: "20px", color: "#000" }}>ไม่มีข้อมูล</p>
                    )}
                </div>

                {/* Modal ดูรายละเอียด */}
                {selectedRequest && (
                <div className="request-rejected-modal-overlay">
    <div className="request-rejected-modal-content">
      <span className="request-rejected-modal-close" onClick={handleCloseDetails}>
        &times;
      </span>
      <h3>รายละเอียดคำขอ</h3>

      <div className="request-rejected-modal-form">
        <div className="request-rejected-form-group">
          <label>ชื่อผู้ขอ:</label>
          <input type="text" value={selectedRequest.borrower_name} readOnly />
        </div>

        <div className="request-rejected-form-group">
          <label>ฝ่าย/สำนัก:</label>
          <input type="text" value={selectedRequest.department} readOnly />
        </div>

        <div className="request-rejected-form-group">
          <label>โทรศัพท์:</label>
          <input type="text" value={selectedRequest.phone} readOnly />
        </div>

        <div className="request-rejected-form-group">
          <label>อีเมล:</label>
          <input type="text" value={selectedRequest.email} readOnly />
        </div>

        <div className="request-rejected-form-group">
          <label>ชื่อ:</label>
          <input type="text" value={selectedRequest.material} readOnly />
        </div>

        <div className="request-rejected-form-group">
          <label>ประเภท:</label>
          <input type="text" value={selectedRequest.type || "-"} readOnly />
        </div>

        <div className="request-rejected-form-group">
          <label>อุปกรณ์:</label>
          <input type="text" value={selectedRequest.equipment} readOnly />
        </div>

        <div className="request-rejected-form-group">
          <label>ยี่ห้อ:</label>
          <input type="text" value={selectedRequest.brand} readOnly />
        </div>

        <div className="request-rejected-form-group">
          <label>จำนวน:</label>
          <input type="text" value={selectedRequest.quantity_requested} readOnly />
        </div>

        <div className="request-rejected-form-group">
            <label>จำนวนคงเหลือ:</label>
            <input 
                type="text" 
                value={
                    selectedRequest.remaining !== undefined && selectedRequest.remaining !== null
                    ? selectedRequest.remaining
                    : "ไม่มีข้อมูล"
                } 
                readOnly 
            />
        </div>
        <div className="request-rejected-form-group">
          <label>สถานะ:</label>
          <input type="text" value={getStatusInThai(selectedRequest.status)} readOnly />
        </div>

        <div className="request-rejected-form-group">
          <label>วันที่ขอ:</label>
          <input
            type="text"
            value={new Date(selectedRequest.date_requested).toLocaleDateString("th-TH")}
            readOnly
          />
        </div>

        <div className="request-rejected-form-group">
          <label>หมายเหตุ:</label>
          <textarea value={selectedRequest.note_approver || "-"} readOnly />
        </div>
      </div>
    </div>
  </div>
)}
                {/* ปุ่มย้อนกลับ */}
                <div className="request-rejected-footer">
                    <button className="request-rejected-back-button" onClick={() => navigate(-1)}>
                        <FontAwesomeIcon icon={faArrowLeft} /> ย้อนกลับ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RequestRejected;
