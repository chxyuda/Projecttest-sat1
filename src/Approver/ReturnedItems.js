import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardApprover from "./DashboardApprover";
import "./ReturnedItems.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarehouse, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

function ReturnedItems() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    fetchReturnedRequests();
  }, []);

  const fetchReturnedRequests = async () => {
    try {
      const response = await axios.get(
        "http://newstock.sat.or.th:5001/api/borrow-requests"
      );
      const returnedItems = response.data.filter(
        (req) => req.status === "Returned"
      );
      setRequests(returnedItems);
    } catch (error) {
      console.error("Error fetching returned items:", error);
    }
  };

  const handleViewDetails = async (request) => {
    try {
      const response = await axios.get(`http://newstock.sat.or.th:5001/api/products/model/${request.material}`);
      
      const { remaining, equipment_number, serial_number } = response.data;
  
      // ✅ อัปเดต selectedRequest พร้อมจำนวนคงเหลือ และข้อมูลหมายเลขครุภัณฑ์/Serial Number
      setSelectedRequest({
        ...request,
        remaining: remaining !== undefined ? remaining : "ไม่ทราบ",
        equipment_number: equipment_number || "-",
        serial_number: serial_number || "-",
      });
    } catch (error) {
      console.error("ไม่สามารถโหลดข้อมูลอุปกรณ์:", error);
      setSelectedRequest({
        ...request,
        remaining: "ไม่ทราบ",
        equipment_number: "-",
        serial_number: "-",
      });
    }
  };
  

  const handleCloseModal = () => {
    setSelectedRequest(null);
  };

  const handleRefresh = async () => {
    setSearchName("");
    await fetchReturnedRequests();
  };

  const filteredRequests = requests.filter((req) =>
    req.borrower_name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div>
      <DashboardApprover />
      <div className="returned-container">
  <div className="returned-title">
    <FontAwesomeIcon icon={faWarehouse} style={{ marginRight: "10px" }} />
    ข้อมูลการคืนของแล้ว
  </div>

  {/* ช่องค้นหา / รีเฟรช / ย้อนกลับ */}
  <div className="returned-search-bar">
    <input
      type="text"
      placeholder="ค้นหาชื่อผู้ยืม"
      value={searchName}
      onChange={(e) => setSearchName(e.target.value)}
    />
    <button onClick={handleRefresh} className="returned-search-button">
      ค้นหา
    </button>
  </div>

  <table className="returned-table">
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
      {filteredRequests.length > 0 ? (
        filteredRequests.map((req, index) => (
          <tr key={req.id}>
            <td>{index + 1}</td>
            <td>{req.borrower_name}</td>
            <td>{req.department}</td>
            <td>{req.equipment}</td>
            <td>{new Date(req.request_date).toLocaleDateString("th-TH")}</td>
            <td>{req.quantity_requested}</td>
            <td>คืนของแล้ว</td>
            <td>
              <button
                className="returned-detail-button"
                onClick={() => handleViewDetails(req)}
              >
                ดูรายละเอียด
              </button>
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

  <div className="button-group" style={{ marginTop: "15px" }}>
    <button onClick={handleRefresh} className="returned-button">
      รีเฟรช
    </button>
    <button
      onClick={() => window.history.back()}
      className="returned-button-back"
    >
      ย้อนกลับ
    </button>
  </div>

  {selectedRequest && (
  <div className="returned-modal-overlay">
    <div className="returned-modal">
      <FontAwesomeIcon
        icon={faTimesCircle}
        className="returned-modal-close-icon"
        onClick={handleCloseModal}
      />
      <h3>รายละเอียดการขอยืมวัสดุ</h3>
      <form className="returned-modal-form">
        <div className="returned-form-group">
          <label>ชื่อผู้ยืม:</label>
          <input type="text" value={selectedRequest.borrower_name} readOnly />
        </div>
        <div className="returned-form-group">
          <label>ฝ่าย/สำนัก:</label>
          <input type="text" value={selectedRequest.department} readOnly />
        </div>
        <div className="returned-form-group">
          <label>อุปกรณ์:</label>
          <input type="text" value={selectedRequest.equipment} readOnly />
        </div>
        <div className="returned-form-group">
          <label>ยี่ห้อ:</label>
          <input type="text" value={selectedRequest.brand} readOnly />
        </div>
        <div className="returned-form-group">
          <label>หมายเลขครุภัณฑ์:</label>
          <input type="text" value={selectedRequest.equipment_number || "-"} readOnly />
        </div>
        <div className="returned-form-group">
          <label>Serial Number:</label>
          <input type="text" value={selectedRequest.serial_number || "-"} readOnly />
        </div>
        <div className="returned-form-group">
          <label>จำนวน:</label>
          <input type="text" value={selectedRequest.quantity_requested} readOnly />
        </div>
        <div className="returned-form-group">
          <label>วันที่ยืม:</label>
          <input
            type="text"
            value={
              selectedRequest.request_date
                ? new Date(selectedRequest.request_date).toLocaleDateString("th-TH", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                : "-"
            }
            readOnly
          />
        </div>
        <div className="returned-form-group">
          <label>วันที่คืน:</label>
          <input
            type="text"
            value={
              selectedRequest.return_date
                ? new Date(selectedRequest.return_date).toLocaleDateString("th-TH", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                : "-"
            }
            readOnly
          />
        </div>
        <div className="returned-form-group">
          <label>หมายเหตุ:</label>
          <textarea value={selectedRequest.note || "-"} readOnly />
        </div>
        <div className="returned-form-group">
          <label>หมายเหตุสภาพอุปกรณ์ตอนคืน:</label>
          <textarea value={selectedRequest.return_condition || "-"} readOnly />
        </div>
        <div className="returned-form-group">
          <label>สถานะ:</label>
          <input type="text" value="คืนของแล้ว" readOnly />
        </div>
      </form>
    </div>
  </div>
)}

</div>

      </div>
  );
}

export default ReturnedItems;
