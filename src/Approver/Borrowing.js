import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardApprover from "./DashboardApprover";
import "./Borrowing.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarehouse, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

function Borrowing() {
    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [searchDate, setSearchDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const itemsPerPage = 15;
    const [remark, setRemark] = useState("");
    const [showRejectReason, setShowRejectReason] = useState(false);
    const [rejectReason, setRejectReason] = useState("");
    const [remainingStock, setRemainingStock] = useState("ไม่ทราบ");



    useEffect(() => {
      const fetchBorrowRequests = async () => {
        try {
          const response = await axios.get("http://localhost:5001/api/borrow-requests");
          const pendingRequests = response.data.filter((req) => req.status === "Pending");
          setRequests(pendingRequests);
          setFilteredRequests(pendingRequests);          
        } catch (error) {
          console.error("Error fetching borrow requests:", error);
        }
      };
  
      fetchBorrowRequests();
    }, []);
  
    const handleSearchByDate = () => {
      if (searchDate) {
        const filtered = requests.filter((req) => req.request_date === searchDate);
        setFilteredRequests(filtered);
      } else {
        setFilteredRequests(requests);
      }
      setCurrentPage(1);
    };
  
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
      
  
      const [isProcessing, setIsProcessing] = useState(false);

      const handleApprove = async (status) => {
        if (isProcessing) return; // ป้องกันการกดซ้ำ
        setIsProcessing(true);
    
        try {
            if (!selectedRequest || !selectedRequest.id) {
                alert("ไม่พบข้อมูลคำขอยืม กรุณาลองใหม่");
                setIsProcessing(false);
                return;
            }
    
            const newRemainingStock = selectedRequest.remaining - selectedRequest.quantity_requested;
    
            // ✅ แก้ไขเงื่อนไขใหม่
            if (status === "Approved" && newRemainingStock == 0) {
                alert(`❌ ไม่สามารถอนุมัติได้ เนื่องจากสินค้าคงเหลือไม่พอ (มี ${selectedRequest.remaining} ต้องการ ${selectedRequest.quantity_requested})`);
                setIsProcessing(false);
                return;
            }
    
            const note = status === "Rejected" ? rejectReason : remark;
            const finalStatus = status === "Approved" ? "Received" : "Rejected";
    
            console.log("🔹 กำลังอัปเดตสถานะ:", {
                id: selectedRequest.id,
                status: finalStatus,
                approved_by: "Admin", // ให้เปลี่ยนเป็นค่าจริงจาก session หรือ user login
                date_approved: new Date().toISOString().slice(0, 10),
                note,
            });
    
            // ✅ 1️⃣ อัปเดตสถานะคำขอ
            const approveResponse = await axios.put(
                `http://localhost:5001/api/borrow-requests/${selectedRequest.id}/approve`,
                {
                    status: finalStatus,
                    approved_by: "Admin",
                    date_approved: new Date().toISOString().slice(0, 10),
                    note,
                }
            );
    
            console.log("✅ อัปเดตสถานะสำเร็จ:", approveResponse.data);
    
            // ✅ 2️⃣ หากอนุมัติแล้ว อัปเดตจำนวนคงเหลือของอุปกรณ์
            if (status === "Approved") {
                const stockResponse = await axios.put(
                    `http://localhost:5001/api/products/update-stock/${selectedRequest.material}`,
                    { remaining: newRemainingStock }
                );
    
                console.log("✅ อัปเดตจำนวนคงเหลือสำเร็จ:", stockResponse.data);
            }
    
            alert(`✅ ทำการ${status === "Approved" ? "อนุมัติ" : "ไม่อนุมัติ"}สำเร็จ`);
            setSelectedRequest(null);
            setShowRejectReason(false);
            setRejectReason("");
            window.location.reload();
        } catch (error) {
            console.error("❌ Error updating status:", error);
            alert("❌ เกิดข้อผิดพลาดในการอัปเดตสถานะ: " + (error.response?.data?.message || error.message));
        } finally {
            setIsProcessing(false);
        }
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
        <div className="borrowing-container">
            <div className="borrowing-title">
                <FontAwesomeIcon icon={faWarehouse} style={{ marginRight: "10px" }} />
                ข้อมูลการยืม
            </div>
            <div className="borrowing-button-group">
                <button
                    className="borrowing-tab-button"
                    onClick={() => window.location.href = "/waiting-receive-borrow"}
                >
                    รอรับของ
                </button>
                <button
                    className="borrowing-tab-button"
                    onClick={() => window.location.href = "/returneditems"}
                >
                    คืนของแล้ว
                </button>
            </div>
        <div className="borrowing-search-bar">
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
          <button onClick={handleSearchByDate}>ค้นหา</button>
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
                  <td>{req.quantity_requested}</td>
                  <td>
                        {req.status === "Pending"
                        ? "รอดำเนินการ"
                        : req.status === "Approved"
                        ? "อนุมัติแล้ว"
                        : req.status === "Rejected"
                        ? "ไม่อนุมัติ"
                        : req.status === "Received"
                        ? "รับของแล้ว"
                        : req.status === "Returned"
                        ? "คืนของแล้ว"
                        : req.status === "WaitingReceive"
                        ? "รอรับของ"
                        : req.status}
                    </td>
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
                <td colSpan="9">ไม่มีข้อมูล</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="borrowing-pagination">
          {pageNumbers.map((number) => (
            <button key={number} onClick={() => paginate(number)}>
              {number}
            </button>
          ))}
        </div>
        {selectedRequest && (
  <div className="loan-request-modal-overlay">
    <div className="loan-request-modal">
      <FontAwesomeIcon
        icon={faTimesCircle}
        className="loan-request-modal-close-icon"
        onClick={handleCloseModal}
      />
      <h3>รายละเอียดการขอยืมวัสดุ</h3>
      <form className="loan-request-modal-form">
        <div className="loan-request-form-group">
          <label>ชื่อผู้ยืม:</label>
          <input type="text" value={selectedRequest.borrower_name} readOnly />
        </div>
        <div className="loan-request-form-group">
          <label>ฝ่าย/สำนัก:</label>
          <input type="text" value={selectedRequest.department} readOnly />
        </div>
        <div className="loan-request-form-group">
          <label>เบอร์โทร:</label>
          <input type="text" value={selectedRequest.phone} readOnly />
        </div>
        <div className="loan-request-form-group">
          <label>Email:</label>
          <input type="text" value={selectedRequest.email} readOnly />
        </div>
        <div className="loan-request-form-group">
          <label>วัสดุ:</label>
          <input type="text" value={selectedRequest.material} readOnly />
        </div>
        <div className="loan-request-form-group">
          <label>ประเภท:</label>
          <input type="text" value={selectedRequest.category} readOnly />
        </div>
        <div className="loan-request-form-group">
          <label>อุปกรณ์:</label>
          <input type="text" value={selectedRequest.equipment} readOnly />
        </div>
        <div className="loan-request-form-group">
          <label>ยี่ห้อ:</label>
          <input type="text" value={selectedRequest.brand} readOnly />
        </div>
        <div className="loan-request-form-group">
          <label>หมายเลขครุภัณฑ์:</label>
          <input type="text" value={selectedRequest.equipment_number} readOnly />
        </div>
        <div className="loan-request-form-group">
          <label>Serial Number:</label>
          <input type="text" value={selectedRequest.serial_number} readOnly />
        </div>
        <div className="loan-request-form-group">
          <label>จำนวน:</label>
          <input type="text" value={selectedRequest.quantity_requested} readOnly />
        </div>
        <div className="loan-request-form-group">
  <label>จำนวนคงเหลือ:</label>
  <input
    type="text"
    value={
      selectedRequest.remaining !== undefined
        ? selectedRequest.remaining
        : "ไม่ทราบ"
    }
    readOnly
  />
</div>
        <div className="loan-request-form-group">
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
                : "ไม่ระบุ"
            }
            readOnly
          />
        </div>
        <div className="loan-request-form-group">
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
                : "ไม่ระบุ"
            }
            readOnly
          />
        </div>
        <div className="loan-request-form-group">
          <label>หมายเหตุ:</label>
          <textarea value={selectedRequest.note || "-"} readOnly />
        </div>
      </form>

      <div className="loan-request-modal-buttons">
        <button className="loan-request-approve-button" onClick={() => handleApprove("Approved")}>
          อนุมัติ
        </button>
        <button
          className="loan-request-reject-button"
          onClick={() => setShowRejectReason(true)}
        >
          ไม่อนุมัติ
        </button>
      </div>

      {/* ส่วนแสดงช่องใส่เหตุผลการไม่อนุมัติ */}
      {showRejectReason && (
        <div className="loan-request-form-group">
          <label>เหตุผลการไม่อนุมัติ:</label>
          <textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="กรุณาระบุเหตุผลการไม่อนุมัติ"
          />
          <button
            className="loan-request-reject-button"
            onClick={() => handleApprove("Rejected")}
            disabled={!rejectReason.trim()}
          >
            ยืนยันการไม่อนุมัติ
          </button>
        </div>
      )}
    </div>
  </div>
)}

    </div>
    </div>
  );
}

export default Borrowing;