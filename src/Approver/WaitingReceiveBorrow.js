import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashboardApprover from "./DashboardApprover";
import "./WaitingReceiveBorrow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarehouse, faTimesCircle, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function WaitingReceiveBorrow() {
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
      const response = await axios.get("http://localhost:5001/api/borrow-requests");
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
        (req) => req.status === "Received"
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
      <div className="received-container">
        <div className="received-title">
          <FontAwesomeIcon icon={faWarehouse} style={{ marginRight: "10px" }} />
          รอรับของ (ยืม)
        </div>

        <div className="received-search-bar">
          <input
            type="text"
            className="received-input"
            placeholder="ค้นหาชื่อผู้ยืม"
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
              <th>ชื่อผู้ยืม</th>
              <th>ฝ่าย/สำนัก</th>
              <th>อุปกรณ์</th>
              <th>วันที่ยืม</th>
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
                  <td>
                    {new Date(req.request_date).toLocaleDateString("th-TH")}
                  </td>
                  <td>รอรับของ</td>
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
          <button className="refresh-button" onClick={fetchRequests}>
            รีเฟรชข้อมูล
          </button>
        </div>

        {selectedRequest && (
  <div className="modal-overlay-borrow">
    <div className="modal-borrow">
      <FontAwesomeIcon icon={faTimesCircle} className="modal-close-icon-borrow" onClick={handleCloseModal} />
      <h3>รายละเอียดการขอยืมวัสดุ</h3>
      <form className="modal-form-borrow">
        <div className="form-group-borrow">
          <label>ชื่อผู้ยืม:</label>
          <input type="text" value={selectedRequest.borrower_name} readOnly />
        </div>
        <div className="form-group-borrow">
          <label>ฝ่าย/สำนัก:</label>
          <input type="text" value={selectedRequest.department} readOnly />
        </div>
        <div className="form-group-borrow">
          <label>เบอร์โทร:</label>
          <input type="text" value={selectedRequest.phone} readOnly />
        </div>
        <div className="form-group-borrow">
          <label>Email:</label>
          <input type="text" value={selectedRequest.email} readOnly />
        </div>
        <div className="form-group-borrow">
          <label>วัสดุ:</label>
          <input type="text" value={selectedRequest.material} readOnly />
        </div>
        <div className="form-group-borrow">
          <label>ประเภท:</label>
          <input type="text" value={selectedRequest.type} readOnly />
        </div>
        <div className="form-group-borrow">
          <label>อุปกรณ์:</label>
          <input type="text" value={selectedRequest.equipment} readOnly />
        </div>
        <div className="form-group-borrow">
          <label>ยี่ห้อ:</label>
          <input type="text" value={selectedRequest.brand} readOnly />
        </div>
        <div className="form-group-borrow">
          <label>หมายเลขครุภัณฑ์:</label>
          <input type="text" value={selectedRequest.equipment_number} readOnly />
        </div>
        <div className="form-group-borrow">
          <label>Serial Number:</label>
          <input type="text" value={selectedRequest.serial_number} readOnly />
        </div>
        <div className="form-group-borrow">
          <label>จำนวน:</label>
          <input type="text" value={selectedRequest.quantity_requested} readOnly />
        </div>
        <div className="form-group-borrow">
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
          <div className="form-group-borrow">
            <label>วันที่ขอยืม:</label>
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
        <div className="form-group-borrow">
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
        <div className="form-group-borrow">
          <label>สถานะ:</label>
          <input
            type="text"
            value={
              selectedRequest.status === "Pending"
                ? "รอดำเนินการ"
                : selectedRequest.status === "WaitingReceive"
                ? "รอรับของ"
                : selectedRequest.status === "Rejected"
                ? "ไม่อนุมัติ"
                : selectedRequest.status === "Received"
                ? "รับของแล้ว"
                : selectedRequest.status === "Returned"
                ? "คืนของแล้ว"
                : selectedRequest.status
            }
            readOnly
          />
        </div>
        <div className="form-group-borrow">
          <label>หมายเหตุ:</label>
          <textarea value={selectedRequest.note || "-"} readOnly />
        </div>
      </form>
    </div>
  </div>
)}


      </div>
    </div>
  );
}

export default WaitingReceiveBorrow;
