import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Received.css";
import DashboardApprover from "./DashboardApprover.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarehouse , faTimesCircle } from "@fortawesome/free-solid-svg-icons";

function Received() {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [remark, setRemark] = useState("");
  const itemsPerPage = 15;

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
  
        const pendingRequests = enrichedRequests.filter(
          (req) => req.status === "Pending"
        );
  
        setRequests(enrichedRequests);
        setFilteredRequests(pendingRequests);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
  
    fetchRequests();
  }, []);
  
  const handleViewDetails = async (request) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/products/model/${request.material}`);
      const remainingStock = response.data.remaining;
  
      // อัปเดต selectedRequest พร้อมจำนวนคงเหลือ
      setSelectedRequest({
        ...request,
        remaining: remainingStock,
      });
    } catch (error) {
      console.error('ไม่สามารถโหลดจำนวนคงเหลือ:', error);
      setSelectedRequest({ ...request, remaining: 'ไม่ทราบ' });
    }
    setRemark('');
  };
  
  const handleCloseModal = () => {
    setSelectedRequest(null);
  };

  const handleApprove = async (status) => {
    if (status === 'Rejected' && !remark.trim()) {
      alert("กรุณาระบุเหตุผลที่ไม่อนุมัติ");
      return;
    }
  
    try {
        await axios.put(`http://localhost:5001/api/requests/${selectedRequest.id}/approve`, {
            status: status,
            approved_by: 'ผู้อนุมัติ',
            date_approved: new Date().toISOString().slice(0, 10),
            note: remark.trim() || "-",
          });
          
      alert(`ทำรายการ${status === 'Approved' ? 'อนุมัติ' : 'ไม่อนุมัติ'}สำเร็จ`);
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.id === selectedRequest.id ? { ...req, status: status } : req
        )
      );
      setFilteredRequests((prevFiltered) =>
        prevFiltered.map((req) =>
          req.id === selectedRequest.id ? { ...req, status: status } : req
        )
      );
      handleCloseModal();
    } catch (error) {
      console.error(`Error updating status to ${status}:`, error);
      alert("เกิดข้อผิดพลาดในการเปลี่ยนสถานะ");
    }
  };
  
  const handleSearchByDate = () => {
    if (!searchDate) {
      setFilteredRequests(requests.filter((req) => req.status === "Pending"));
      return;
    }
  
    const filtered = requests.filter((req) => {
      const requestDate = new Date(req.created_at).toISOString().split("T")[0];
      return requestDate === searchDate && req.status === "Pending";
    });
  
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
          ข้อมูลการเบิก
        </div>
        <div className="received-button-container">
          <button className="received-button" onClick={() => window.location.href = "/waiting-receive"}>
            รอรับของ
          </button>
          <button className="received-button" onClick={() => window.location.href = "/received-items"}>
            รับของแล้ว
          </button>
        </div>

        <div className="received-search-bar">
        <input
  type="date"
  className="received-input"
  value={searchDate}
  onChange={(e) => setSearchDate(e.target.value)}
/>
<button className="received-search-button" onClick={handleSearchByDate}>
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
                  <td>{new Date(req.created_at).toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' })}</td>
                  <td>
                        {req.status === "Pending"
                        ? "รอดำเนินการ"
                        : req.status === "Approved"
                        ? "อนุมัติ"
                        : req.status === "Rejected"
                        ? "ไม่อนุมัติ"
                        : req.status === "Received"
                        ? "รับของแล้ว"
                        : req.status}
                    </td>
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
      </div>
      {selectedRequest && (
      <div className="received-modal-overlay">
        <div className="received-modal">
          <FontAwesomeIcon
            icon={faTimesCircle}
            className="received-modal-close-icon"
            onClick={handleCloseModal}
          />
          <h3>รายละเอียดการเบิกวัสดุ</h3>
          <form className="received-modal-form">
            <div className="received-form-group">
              <label>ชื่อผู้เบิก:</label>
              <input type="text" value={selectedRequest.borrower_name} readOnly />
            </div>
            <div className="received-form-group">
              <label>ฝ่าย/สำนัก:</label>
              <input type="text" value={selectedRequest.department} readOnly />
            </div>
            <div className="received-form-group">
              <label>เบอร์โทร:</label>
              <input type="text" value={selectedRequest.phone} readOnly />
            </div>
            <div className="received-form-group">
              <label>Email:</label>
              <input type="text" value={selectedRequest.email} readOnly />
            </div>
            <div className="received-form-group">
              <label>วัสดุ:</label>
              <input type="text" value={selectedRequest.material} readOnly />
            </div>
            <div className="received-form-group">
              <label>ประเภท:</label>
              <input type="text" value={selectedRequest.type} readOnly />
            </div>
            <div className="received-form-group">
              <label>อุปกรณ์:</label>
              <input type="text" value={selectedRequest.equipment} readOnly />
            </div>
            <div className="received-form-group">
              <label>ยี่ห้อ:</label>
              <input type="text" value={selectedRequest.brand} readOnly />
            </div>
            <div className="received-form-group">
              <label>จำนวน:</label>
              <input type="text" value={selectedRequest.quantity_requested} readOnly />
            </div>
            <div className="received-form-group">
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
            <div className="received-form-group">
              <label>วันที่ขอเบิก:</label>
                <input
                  type="text"
                  value={
                    selectedRequest.created_at
                    ? new Date(selectedRequest.created_at).toLocaleDateString('th-TH', {
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit',
                    }) +
                    ' ' +
                    new Date(selectedRequest.created_at).toLocaleTimeString('th-TH', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                    : 'ไม่ระบุ'
                  }
                  readOnly
                />
              </div>
              <form className="received-note-containe">
                {/* หมายเหตุ */}
                <div className="received-note-containe">
                  <label>หมายเหตุ:</label>
                  <textarea value={selectedRequest.note || '-'} readOnly />
                </div>
                {/* หมายเหตุเพิ่มเติม */}
                <div className="received-note-containe">
                  <label>หมายเหตุเพิ่มเติม (ถ้ามี):</label>
                  <textarea
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    placeholder="ใส่หมายเหตุหากจำเป็น"
                  />
                </div>
              </form>
            </form>
          <div className="received-modal-buttons">
            <button className="received-approve-button" onClick={() => handleApprove("Approved")}>
              อนุมัติ
            </button>
            <button className="received-reject-button" onClick={() => handleApprove("Rejected")}>
              ไม่อนุมัติ
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
}

export default Received;
