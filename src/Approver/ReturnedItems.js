import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardApprover from "./DashboardApprover";
import "./Borrowing.css";
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
        "http://localhost:5001/api/borrow-requests"
      );
      const returnedItems = response.data.filter(
        (req) => req.status === "Returned"
      );
      setRequests(returnedItems);
    } catch (error) {
      console.error("Error fetching returned items:", error);
    }
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
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
      <div className="borrowing-container">
        <div className="borrowing-title">
          <FontAwesomeIcon
            icon={faWarehouse}
            style={{ marginRight: "10px" }}
          />
          ข้อมูลการคืนของแล้ว
        </div>

        {/* ช่องค้นหา / รีเฟรช / ย้อนกลับ */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="ค้นหาชื่อผู้ยืม"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <button onClick={handleRefresh}>ค้นหา</button>
        </div>
        <table className="borrowing-table">
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
                      className="detail-button"
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
        <div className="button-container" style={{ marginTop: "15px" }}>
          <button onClick={handleRefresh}>รีเฟรช</button>
          <button onClick={() => window.history.back()}>ย้อนกลับ</button>
        </div>
        {selectedRequest && (
          <div className="modal-overlay">
            <div className="modal">
              <FontAwesomeIcon
                icon={faTimesCircle}
                className="modal-close-icon"
                onClick={handleCloseModal}
              />
              <h3>รายละเอียดการขอยืมวัสดุ</h3>
              <p>ชื่อผู้ยืม: {selectedRequest.borrower_name}</p>
              <p>ฝ่าย/สำนัก: {selectedRequest.department}</p>
              <p>อุปกรณ์: {selectedRequest.equipment}</p>
              <p>จำนวน: {selectedRequest.quantity_requested}</p>
              <p>วันที่ยืม: {new Date(selectedRequest.request_date).toLocaleDateString("th-TH")}</p>
              <p>วันที่คืน: {new Date(selectedRequest.return_date).toLocaleDateString("th-TH")}</p>
              <p>หมายเหตุ: {selectedRequest.note || "-"}</p>
              <p>หมายเหตุสภาพอุปกรณ์ตอนคืน: {selectedRequest.return_condition || "-"}</p>
              <p>สถานะ: คืนของแล้ว</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReturnedItems;
