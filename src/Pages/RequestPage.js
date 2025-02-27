import React, { useEffect, useState } from "react";
import axios from "axios";
import ITDashboard from "./ITDashboard";
import "./RequestPage.css";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCheck,
  faTimesCircle,
  faFileAlt,
  faClipboardList,
  faPlus,
  faClose,
  faSearch // ✅ เพิ่ม faSync แทน faSyncAlt
} from "@fortawesome/free-solid-svg-icons";

const RequestPage = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]); // ✅ แก้ไขตรงนี้
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchDate, setSearchDate] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [remark, setRemark] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15; // แสดง 15 แถวต่อหน้า
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/requests");
        const data = await response.json();
        
        console.log("📌 Data from API:", data); // ✅ ดูค่า date_requested
        
        setRequests(data);
        setFilteredRequests(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching requests:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateString) => {
  if (!dateString || dateString === "0000-00-00" || dateString === "NULL") return "-";
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("th-TH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

  // ฟังก์ชันค้นหาด้วยวันที่
  const handleSearch = () => {
    if (searchDate) {
      const formattedSearchDate = new Date(searchDate).toLocaleDateString("th-TH");
  
      const filtered = requests.filter((request) => {
        const requestDate = new Date(request.date_requested).toLocaleDateString("th-TH");
        return requestDate === formattedSearchDate;
      });
  
      setFilteredRequests(filtered);
      setCurrentPage(1); // รีเซ็ตกลับไปหน้าที่ 1
    } else {
      setFilteredRequests(requests);
    }
  };
  
  
  // คำนวณข้อมูลที่ต้องแสดงในแต่ละหน้า
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredRequests.slice(indexOfFirstRow, indexOfLastRow);;

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
        const response = await axios.get(`http://localhost:5001/api/products/model/${request.material}`);
        const remainingStock = response.data.remaining;
  
        setSelectedRequest({
            ...request,
            remaining: remainingStock,
        });
        setRemark(''); // ✅ ใช้ได้ เพราะเราสร้าง useState ไว้แล้ว
    } catch (error) {
        console.error('ไม่สามารถโหลดจำนวนคงเหลือ:', error);
        setSelectedRequest({ ...request, remaining: 'ไม่ทราบ' });
    }
};

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/requests");
      const data = await response.json();
      
      console.log("📌 Data from API:", data); // ✅ ตรวจสอบค่า date_requested
      
      setRequests(data);
      setFilteredRequests(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching requests:", error);
      setLoading(false);
    }
  };
  fetchData();
}, []);


  return (
    <div>
      <ITDashboard />
      <div className="request-page-container">
        <h1 className="request-page-title">
          <FontAwesomeIcon icon={faFileAlt} /> คำขอเบิก
        </h1>
        <div className="request-buttons-container">
          <button onClick={() => navigate("/request-pending")}>
            <FontAwesomeIcon icon={faClock} /> รออนุมัติ
          </button>
          <button onClick={() => navigate("/request-approved")}>
            <FontAwesomeIcon icon={faCheck} /> อนุมัติแล้ว
          </button>
          <button onClick={() => navigate("/request-rejected")}>
            <FontAwesomeIcon icon={faTimesCircle} /> ไม่อนุมัติ
          </button>
          <button className="status-button" onClick={() => navigate("/request-status")}>
            <FontAwesomeIcon icon={faClipboardList} /> สถานะคำขอ
          </button>
          <button className="status-button" onClick={() => navigate("/request-from")}>
            <FontAwesomeIcon icon={faClipboardList} /> เพิ่ม
          </button>
        </div>
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
        <div className="request-list">
          {loading ? (
            <p>กำลังโหลดข้อมูล...</p>
          ) : (
            <table className="request-table">
              <thead>
                <tr>
                  <th>ลำดับ</th>
                  <th>ชื่อผู้ขอ</th>
                  <th>ฝ่าย/สำนัก</th>
                  <th>อุปกรณ์</th>
                  <th>วันที่ขอ</th>
                  <th>จำนวน</th>
                  <th>สถานะ</th>
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
                      <td>{formatDate(req.date_requested)}</td>
                      <td>{req.quantity_requested}</td>
                      <td>{getStatusInThai(req.status)}</td>
                      <td>
                      <button className="detail-button" onClick={() => handleViewDetails(req)}>ดูรายละเอียด</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center", fontWeight: "bold", padding: "20px" }}>
                      ไม่มีข้อมูล
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
          <div className="pagination">
              {Array.from({ length: Math.ceil(filteredRequests.length / rowsPerPage) }, (_, index) => (
              <button 
                key={index + 1} 
                className={currentPage === index + 1 ? "active" : ""}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          {selectedRequest && (
          <div className="request-modal-overlay">
            <div className="request-modal-content">
              <div className="request-modal-header">
                <h2 className="request-modal-title">รายละเอียดคำขอ</h2>
                <FontAwesomeIcon
                  icon={faClose}
                  className="request-modal-close-icon"
                  onClick={() => setSelectedRequest(null)}
                />
              </div>
              <div className="request-modal-grid">
                <div className="request-modal-group">
                  <label>ชื่อผู้ขอ:</label> 
                  <input type="text" value={selectedRequest.borrower_name} readOnly />
                </div>
                <div className="request-modal-group">
                  <label>ฝ่าย/สำนัก:</label> 
                  <input type="text" value={selectedRequest.department} readOnly />
                </div>
                <div className="request-modal-group">
                  <label>โทรศัพท์:</label> 
                  <input type="text" value={selectedRequest.phone} readOnly />
                </div>
                <div className="request-modal-group">
                  <label>อีเมล:</label> 
                  <input type="text" value={selectedRequest.email} readOnly />
                </div>
                <div className="request-modal-group">
                  <label>ชื่อ:</label> 
                  <input type="text" value={selectedRequest.material} readOnly />
                </div>
                <div className="request-modal-group">
                  <label>ประเภท:</label> 
                  <input type="text" value={selectedRequest.type || "-"} readOnly />
                </div>
                <div className="request-modal-group">
                  <label>อุปกรณ์:</label> 
                  <input type="text" value={selectedRequest.equipment} readOnly />
                </div>
                <div className="request-modal-group">
                  <label>ยี่ห้อ:</label> 
                  <input type="text" value={selectedRequest.brand} readOnly />
                </div>
                <div className="request-modal-group">
                  <label>จำนวน:</label> 
                  <input type="text" value={selectedRequest.quantity_requested} readOnly />
                </div>
                <div className="request-modal-group">
                  <label>จำนวนคงเหลือ:</label>
                  <input
                    type="text"
                    value={selectedRequest && selectedRequest.remaining !== undefined
                    ? selectedRequest.remaining
                    : 'ไม่ทราบ'}
                    readOnly
                  />
                </div>
                <div className="request-modal-group">
                  <label>สถานะ:</label> 
                  <input type="text" value={getStatusInThai(selectedRequest.status)} readOnly />
                </div>
                <div className="request-modal-group">
                  <label>วันที่ขอ:</label> 
                  <input type="text" value={new Date(selectedRequest.date_requested).toLocaleDateString("th-TH")} readOnly />
                </div>
                <div className="request-modal-group">
                  <label>หมายเหตุ:</label> 
                  <input type="text" value={selectedRequest.note || "-"} readOnly />
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default RequestPage;
