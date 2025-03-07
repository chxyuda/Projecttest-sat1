import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashboardApprover from "./DashboardApprover";
import "./WaitingReceive.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarehouse, faTimesCircle, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function WaitingReceive() {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [remainingStock, setRemainingStock] = useState("ไม่ทราบ");
  const [remark, setRemark] = useState('');



  const navigate = useNavigate();

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

      const approvedRequests = enrichedRequests.filter(
        (req) => req.status === "Approved"
      );

      setRequests(approvedRequests);
      setFilteredRequests(approvedRequests);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();

    const interval = setInterval(fetchRequests, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleViewDetails = async (request) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/products/model/${request.material}`);
      
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
    setRemark('');
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
      <div className="waiting-receive-container">
        <div className="waiting-receive-title">
          <FontAwesomeIcon icon={faWarehouse} style={{ marginRight: "10px" }} />
          รอรับของ
        </div>

        <div className="waiting-search-bar">
          <input
            type="text"
            className="waiting-input"
            placeholder="ค้นหาชื่อผู้เบิก"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <button className="waiting-search-button" onClick={handleSearchByName}>
            ค้นหา
          </button>
        </div>
        <table className="waiting-receive-table">
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
                  <td>รอรับของ</td>
                  <td>
                    <button className="waiting-receive-detail-button" onClick={() => handleViewDetails(req)}>
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

        <div className="waiting-receive-pagination">
          {pageNumbers.map((number) => (
            <button key={number} className="waiting-receive-page-button" onClick={() => paginate(number)}>
              {number}
            </button>
          ))}
        </div>
        <div className="waiting-receive-button-group">
  <button className="waiting-receive-back-button" onClick={() => navigate(-1)}>
    <FontAwesomeIcon icon={faArrowLeft} /> ย้อนกลับ
  </button>
  <button className="waiting-receive-refresh-button" onClick={fetchRequests}>
    รีเฟรชข้อมูล
  </button>
</div>                                                                                                                         {selectedRequest && ( 
          <div className="waiting-receive-modal-overlay">
            <div className="waiting-receive-modal">
              <FontAwesomeIcon icon={faTimesCircle} className="waiting-receive-modal-close-icon" onClick={handleCloseModal} />
              <h3>รายละเอียดการเบิกวัสดุ</h3>
              <form className="waiting-receive-modal-form">
                <div className="waiting-receive-form-group">
                  <label>ชื่อผู้เบิก:</label>
                  <input type="text" value={selectedRequest.borrower_name} readOnly />
                </div>
                <div className="waiting-receive-form-group">
                  <label>ฝ่าย/สำนัก:</label>
                  <input type="text" value={selectedRequest.department} readOnly />
                </div>
                <div className="waiting-receive-form-group">
                  <label>เบอร์โทร:</label>
                  <input type="text" value={selectedRequest.phone} readOnly />
                </div>
                <div className="waiting-receive-form-group">
                  <label>Email:</label>
                  <input type="text" value={selectedRequest.email} readOnly />
                </div>
                <div className="waiting-receive-form-group">
                  <label>วัสดุ:</label>
                  <input type="text" value={selectedRequest.material} readOnly />
                </div>
                <div className="waiting-receive-form-group">
                  <label>ประเภท:</label>
                  <input type="text" value={selectedRequest.type} readOnly />
                </div>
                <div className="waiting-receive-form-group">
                  <label>อุปกรณ์:</label>
                  <input type="text" value={selectedRequest.equipment} readOnly />
                </div>
                <div className="waiting-receive-form-group">
                  <label>ยี่ห้อ:</label>
                  <input type="text" value={selectedRequest.brand} readOnly />
                </div>
                <div className="waiting-receive-form-group">
                  <label>หมายเลขครุภัณฑ์:</label>
                  <input type="text" value={selectedRequest.equipment_number} readOnly />
                </div>
                <div className="waiting-receive-form-group">
                  <label>Serial Number:</label>
                  <input type="text" value={selectedRequest.serial_number} readOnly />
                </div>    
                <div className="waiting-receive-form-group">
                  <label>จำนวน:</label>
                  <input type="text" value={selectedRequest.quantity_requested} readOnly />
                </div>
                <div className="waiting-receive-form-group">
                <label>จำนวนคงเหลือ:</label>
  <input
    type="text"
    value={
      selectedRequest && selectedRequest.remaining !== undefined
        ? selectedRequest.remaining
        : 'ไม่ทราบ'
    }
    readOnly
  />
</div>

                <div className="waiting-receive-form-group">
                  <label>หมายเหตุ:</label>
                  <textarea value={selectedRequest.note || "-"} readOnly />
                </div>
                <div className="waiting-receive-form-group">
                    <label>วันที่ขอเบิก:</label>
                    <input
                        type="text"
                        value={
                            selectedRequest.created_at
                            ? new Date(selectedRequest.created_at).toLocaleDateString("th-TH", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "2-digit",
                            }) +
                                " " +
                                new Date(selectedRequest.created_at).toLocaleTimeString("th-TH", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })
                                : "ไม่ระบุ"
                        }
                            readOnly
                     />
                </div>
        <div className="waiting-receive-form-group">
          <label>สถานะ:</label>
          <input type="text" value="รอรับของ" readOnly />
        </div>
      </form>
    </div>
  </div>
)}

      </div>
    </div>
  );
}

export default WaitingReceive;
