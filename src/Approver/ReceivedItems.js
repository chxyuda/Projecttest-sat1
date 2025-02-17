import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashboardApprover from "./DashboardApprover";
import "./Received.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarehouse, faTimesCircle, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function ReceivedItems() {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/requests");
        const userResponses = await Promise.all(
          response.data.map((req) =>
            axios.get(`http://localhost:5001/api/users/${req.user_id}`)
          )
        );
        const enrichedRequests = response.data.map((req, index) => ({
          ...req,
          borrower_name: userResponses[index].data.fullName,
        }));

        // ดึงเฉพาะสถานะ Received
        const receivedRequests = enrichedRequests.filter(
          (req) => req.status === "Received"
        );

        setRequests(receivedRequests);
        setFilteredRequests(receivedRequests);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
    const interval = setInterval(fetchRequests, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
  };

  const handleSearchByName = () => {
    const filtered = requests.filter((req) =>
      req.borrower_name.includes(searchName)
    );
    setFilteredRequests(filtered);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(filteredRequests.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <DashboardApprover />
      <div className="received-container">
        <div className="received-title">
          <FontAwesomeIcon icon={faWarehouse} style={{ marginRight: "10px" }} />
          รับของแล้ว
        </div>

        <div className="received-search-bar">
          <input
            type="text"
            className="received-input"
            placeholder="ค้นหาชื่อผู้เบิก"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <button className="received-search-button" onClick={handleSearchByName}>
            ค้นหา
          </button>
        </div>

        <table className="received-table">
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th>ชื่อผู้เบิก</th>
              <th>ฝ่าย/สำนัก</th>
              <th>อุปกรณ์</th>
              <th>วันที่ขอเบิก</th>
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
                  <td>{req.type}</td>
                  <td>
                    {new Date(req.created_at).toLocaleString("th-TH", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </td>
                  <td>รับของแล้ว</td>
                  <td>
                    <button className="detail-button" onClick={() => handleViewDetails(req)}>
                      ดูรายละเอียด
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">ไม่มีข้อมูล</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="received-pagination">
          {pageNumbers.map((number) => (
            <button key={number} className="received-page-button" onClick={() => paginate(number)}>
              {number}
            </button>
          ))}
        </div>

        <div className="button-group">
          <button className="back-button" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeft} /> ย้อนกลับ
          </button>
          <button className="refresh-button" onClick={() => window.location.reload()}>
            รีเฟรชข้อมูล
          </button>
        </div>

        {selectedRequest && (
          <div className="modal-overlay">
            <div className="modal">
              <FontAwesomeIcon
                icon={faTimesCircle}
                className="modal-close-icon"
                onClick={handleCloseModal}
              />
              <h3>รายละเอียดการเบิกวัสดุ</h3>
              <p>ชื่อผู้เบิก: {selectedRequest.borrower_name}</p>
              <p>ฝ่าย/สำนัก: {selectedRequest.department}</p>
              <p>วัสดุ: {selectedRequest.material}</p>
              <p>อุปกรณ์: {selectedRequest.equipment}</p>
              <p>ยี่ห้อ: {selectedRequest.brand}</p>
              <p>จำนวน: {selectedRequest.quantity_requested}</p>
              <p>สถานะ: รับของแล้ว</p>
              <button onClick={handleCloseModal}>ปิด</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReceivedItems;
