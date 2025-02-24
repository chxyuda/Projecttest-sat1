import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ITDashboard from "./ITDashboard";
import "./RequestPending.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faEye, faArrowLeft, faSearch } from "@fortawesome/free-solid-svg-icons";

const RequestPending = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchDate, setSearchDate] = useState("");
  const [filteredRequests, setFilteredRequests] = useState([]);


  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/requests");
        const data = await response.json();
  
        // กรองเฉพาะคำขอที่มีสถานะ "รออนุมัติ"
        const filtered = data.filter(req => req.status === "Pending");
        setPendingRequests(filtered);
        setFilteredRequests(filtered); // ✅ กำหนดค่าเริ่มต้นให้ filteredRequests
        setLoading(false);
      } catch (error) {
        console.error("Error fetching requests:", error);
        setLoading(false);
      }
    };
  
    fetchPendingRequests();
  }, []);
  

  const getStatusInThai = (status) => {
    switch (status) {
      case "Approved": return "อนุมัติแล้ว";
      case "Pending": return "รออนุมัติ";
      case "Rejected": return "ไม่อนุมัติ";
      case "Received": return "รับของแล้ว";
      default: return status;
    }
  };

  const handleViewDetails = async (request) => {
    try {
        const response = await fetch(`http://localhost:5001/api/products/model/${request.material}`);
        const data = await response.json();
        
        console.log("API Response:", data); // ✅ ตรวจสอบข้อมูลที่ API ส่งกลับมา

        setSelectedRequest({
            ...request,
            remaining: data.remaining !== undefined ? data.remaining : "ไม่ทราบ",
        });
    } catch (error) {
        console.error('ไม่สามารถโหลดจำนวนคงเหลือ:', error);
        setSelectedRequest({ ...request, remaining: 'ไม่ทราบ' });
    }
};

  const handleCloseDetails = () => {
    setSelectedRequest(null);
  };

  const handleSearch = () => {
    if (searchDate) {
      const formattedSearchDate = new Date(searchDate).toLocaleDateString("th-TH");
  
      const filtered = pendingRequests.filter((request) => {
        const requestDate = new Date(request.date_requested).toLocaleDateString("th-TH");
        return requestDate === formattedSearchDate;
      });
  
      setFilteredRequests(filtered);
    } else {
      setFilteredRequests(pendingRequests);
    }
  };
  
  
  return (
    <div>
      <ITDashboard />
      <div className="request-pending-container">
        <h1 className="request-pending-title">
          <FontAwesomeIcon icon={faClock} /> คำขอเบิกรออนุมัติ
        </h1>
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
        <div className="request-pending-list">
            {loading ? (
            <p>กำลังโหลดข้อมูล...</p>
          ) : pendingRequests.length === 0 ? (
            <p>ไม่มีรายการรออนุมัติ</p>
          ) : (
            <table className="request-pending-table">
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
                                    className="request-pending-detail-button"
                                    onClick={() => setSelectedRequest(req)}
                                >
                                    <FontAwesomeIcon icon={faEye} /> ดูรายละเอียด
                                </button>
                            </td>
                        </tr>
                    ))
                    ) : (
                    <tr>
                        <td colSpan="7" style={{ textAlign: "center", fontWeight: "bold", padding: "20px", color: "#000" }}>
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
          <div className="request-pending-modal-overlay">
            <div className="request-pending-modal-content">
              <span className="request-pending-modal-close" onClick={handleCloseDetails}>
                &times;
              </span>
              <h3>รายละเอียดคำขอ</h3>

              <div className="request-pending-modal-form">
                <div className="request-pending-form-group">
                  <label>ชื่อผู้ขอ:</label>
                  <input type="text" value={selectedRequest.borrower_name} readOnly />
                </div>

                <div className="request-pending-form-group">
                  <label>ฝ่าย/สำนัก:</label>
                  <input type="text" value={selectedRequest.department} readOnly />
                </div>

                <div className="request-pending-form-group">
                  <label>โทรศัพท์:</label>
                  <input type="text" value={selectedRequest.phone} readOnly />
                </div>

                <div className="request-pending-form-group">
                  <label>อีเมล:</label>
                  <input type="text" value={selectedRequest.email} readOnly />
                </div>

                <div className="request-pending-form-group">
                  <label>ชื่อ:</label>
                  <input type="text" value={selectedRequest.material} readOnly />
                </div>

                <div className="request-pending-form-group">
                  <label>ประเภท:</label>
                  <input type="text" value={selectedRequest.type || "-"} readOnly />
                </div>

                <div className="request-pending-form-group">
                  <label>อุปกรณ์:</label>
                  <input type="text" value={selectedRequest.equipment} readOnly />
                </div>

                <div className="request-pending-form-group">
                  <label>ยี่ห้อ:</label>
                  <input type="text" value={selectedRequest.brand} readOnly />
                </div>

                <div className="request-pending-form-group">
                  <label>จำนวน:</label>
                  <input type="text" value={selectedRequest.quantity_requested} readOnly />
                </div>

                <div className="request-pending-form-group">
                  <label>จำนวนคงเหลือ:</label>
                  <input 
                    type="text" 
                    value={selectedRequest.remaining !== undefined ? selectedRequest.remaining : 'ไม่ทราบ'} 
                    readOnly 
                  />
                </div>

                <div className="request-pending-form-group">
                  <label>สถานะ:</label>
                  <input type="text" value={getStatusInThai(selectedRequest.status)} readOnly />
                </div>

                <div className="request-pending-form-group">
                  <label>วันที่ขอ:</label>
                  <input
                    type="text"
                    value={new Date(selectedRequest.date_requested).toLocaleDateString("th-TH")}
                    readOnly
                  />
                </div>

                <div className="request-pending-form-group">
                  <label>หมายเหตุ:</label>
                  <textarea value={selectedRequest.note || "-"} readOnly />
                </div>
              </div>
            </div>
          </div>
        )}
        {/* ปุ่มย้อนกลับ */}
        <div className="request-pending-footer">
          <button className="request-pending-back-button" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeft} /> ย้อนกลับ
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestPending;
