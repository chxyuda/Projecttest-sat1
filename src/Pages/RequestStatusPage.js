import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RequestStatusPage.css";
import ITDashboard from "./ITDashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faSearch, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const RequestStatusPage = () => {
    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [searchDate, setSearchDate] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [selectedRequest, setSelectedRequest] = useState(null);
    
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await fetch("http://newstock.sat.or.th:5001/api/requests");
                const data = await response.json();
                
                // ✅ กรองเฉพาะคำขอที่มีสถานะ "รับของแล้ว"
                const receivedRequests = data.filter(req => req.status === "Received");
                
                setRequests(receivedRequests);
                setFilteredRequests(receivedRequests);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching requests:", error);
                setLoading(false);
            }
        };
        fetchRequests();
    }, []);
    

    const handleSearch = () => {
        if (searchDate) {
            const formattedSearchDate = new Date(searchDate).toLocaleDateString("th-TH");
            const filtered = requests.filter((request) => {
                const requestDate = new Date(request.date_requested).toLocaleDateString("th-TH");
                return requestDate === formattedSearchDate;
            });
            setFilteredRequests(filtered);
        } else {
            setFilteredRequests(requests);
        }
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

    const handleViewDetails = (request) => {
        setSelectedRequest(request);
    };
    
    const handleCloseDetails = () => {
        setSelectedRequest(null);
    };

    return (
        <>
            <ITDashboard />
            <div className="request-status-container">
                <h1 className="request-status-title">
                    <FontAwesomeIcon icon={faList} /> สถานะคำขอ
                </h1>

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

                {/* ตารางแสดงสถานะคำขอ */}
                <div className="request-status-list">
                    {loading ? (
                        <p>กำลังโหลดข้อมูล...</p>
                    ) : (
                        <table className="request-status-table">
                            <thead>
                                <tr>
                                    <th>ลำดับ</th>
                                    <th>ชื่อผู้ขอ</th>
                                    <th>ฝ่าย/สำนัก</th>
                                    <th>อุปกรณ์</th>
                                    <th>วันที่ขอ</th>
                                    <th>จำนวน</th>
                                    <th>สถานะ</th>
                                    <th>รายละเอียด</th> {/* ✅ เพิ่มคอลัมน์รายละเอียด */}
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
                                            <td>{getStatusInThai(req.status)}</td>
                                            <td>
                                                <button 
                                                    className="request-status-detail-button"
                                                    onClick={() => handleViewDetails(req)} // ✅ ฟังก์ชันเปิดรายละเอียด
                                                >
                                                    ดูรายละเอียด
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: "center", fontWeight: "bold", padding: "20px", color: "#000" }}>
                                        ไม่มีข้อมูล
                                    </td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="request-status-footer">
                    <button className="request-status-back-button" onClick={() => navigate(-1)}>
                        <FontAwesomeIcon icon={faArrowLeft} /> ย้อนกลับ
                    </button>
                </div>
                {selectedRequest && (
                    <div className="request-status-modal-overlay">
                        <div className="request-status-modal-content">
                            <span className="request-status-modal-close" onClick={handleCloseDetails}>
                                &times;
                            </span>
                            <h3>รายละเอียดคำขอ</h3>
                            <div className="request-status-form">
                                <div className="request-status-form-group">
                                    <label>ชื่อผู้ขอ:</label>
                                    <input type="text" value={selectedRequest.borrower_name} readOnly />
                                </div>
                                <div className="request-status-form-group">
                                    <label>ฝ่าย/สำนัก:</label>
                                    <input type="text" value={selectedRequest.department} readOnly />
                                </div>
                                <div className="request-status-form-group">
                                    <label>โทรศัพท์:</label>
                                    <input type="text" value={selectedRequest.phone} readOnly />
                                </div>
                                <div className="request-status-form-group">
                                    <label>อีเมล:</label>
                                    <input type="text" value={selectedRequest.email} readOnly />
                                </div>
                                <div className="request-status-form-group">
                                    <label>ชื่อ:</label>
                                    <input type="text" value={selectedRequest.material} readOnly />
                                </div>
                                <div className="request-status-form-group">
                                    <label>ประเภท:</label>
                                    <input type="text" value={selectedRequest.type || "-"} readOnly />
                                </div>
                                <div className="request-status-form-group">
                                    <label>อุปกรณ์:</label>
                                    <input type="text" value={selectedRequest.equipment} readOnly />
                                </div>
                                <div className="request-status-form-group">
                                    <label>ยี่ห้อ:</label>
                                    <input type="text" value={selectedRequest.brand} readOnly />
                                </div>
                                <div className="request-status-form-group">
                                    <label>จำนวน:</label>
                                    <input type="text" value={selectedRequest.quantity_requested} readOnly />
                                </div>
                                <div className="request-status-form-group">
                                    <label>สถานะ:</label>
                                    <input type="text" value={getStatusInThai(selectedRequest.status)} readOnly />
                                </div>
                                <div className="request-status-form-group">
                                    <label>วันที่ขอ:</label>
                                    <input type="text" value={new Date(selectedRequest.date_requested).toLocaleDateString("th-TH")} readOnly />
                                </div>
                                <div className="request-status-form-group">
                                    <label>หมายเหตุ:</label>
                                    <input type="text" value={selectedRequest.note || "-"} readOnly />
                                </div>
                                <div className="request-status-form-group">
                                    <label>ชื่อผู้รับ:</label>
                                    <input type="text" value={selectedRequest.received_by || "-"} readOnly />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default RequestStatusPage;
