import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Received.css";
import DashboardApprover from "./DashboardApprover.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarehouse } from "@fortawesome/free-solid-svg-icons";

function Received() {
    const [totalItems, setTotalItems] = useState(0);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get("http://localhost:5001/api/requests");
                const approvedRequests = response.data.filter(req => req.status === 'Approved');
                setRequests(approvedRequests);
                setTotalItems(approvedRequests.length);
            } catch (error) {
                console.error("Error fetching requests:", error);
            }
        };

        fetchRequests();
    }, []);

    const handleReceiveItem = async (id) => {
        const confirmed = window.confirm("ยืนยันการรับของแล้ว?");
        if (!confirmed) return;

        try {
            await axios.put(`http://localhost:5001/api/requests/${id}/receive`, {
                received_by: 'IT Staff', // ควรดึงจากผู้ใช้งานปัจจุบัน
                date_received: new Date().toISOString().slice(0, 19).replace('T', ' '),
            });

            alert("อัปเดตสถานะรับของแล้วสำเร็จ");

            setRequests(requests.filter(req => req.id !== id));
            setTotalItems(totalItems - 1);
        } catch (error) {
            console.error("Error updating status:", error);
            alert("เกิดข้อผิดพลาดในการอัปเดตสถานะ");
        }
    };

    const handleViewDetails = (id) => {
        window.location.href = `/request-details/${id}`;
    };

    return (
        <div>
            <DashboardApprover />

            <div className="received-container">
                <div className="received-title">
                    <FontAwesomeIcon icon={faWarehouse} style={{ marginRight: "10px" }} />
                    ข้อมูลการเบิก
                </div>
                <div className="received-count">
                    จำนวนการรับของ: {totalItems} รายการ
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
                    <input type="date" className="received-input" placeholder="ค้นหาด้วยวันที่" />
                    <button className="received-search-button" onClick={() => alert("ฟังก์ชันค้นหายังไม่ทำงาน")}>ค้นหา</button>
                </div>

                <table className="received-table">
                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>ชื่อผู้เบิก</th>
                            <th>ฝ่าย/สำนัก</th>
                            <th>อุปกรณ์</th>
                            <th>วันที่ขอเบิก</th>
                            <th>รายละเอียด</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.length > 0 ? (
                            requests.map((req, index) => (
                                <tr key={req.id}>
                                    <td>{index + 1}</td>
                                    <td>{req.user_id}</td>
                                    <td>{req.department}</td>
                                    <td>{req.type}</td>
                                    <td>{req.date_requested}</td>
                                    <td>
                                        <button onClick={() => handleViewDetails(req.id)}>
                                            ดู
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">ไม่มีข้อมูล</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="received-pagination">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <button className="received-page-button" key={num} onClick={() => alert("ฟังก์ชันแบ่งหน้ายังไม่ทำงาน")}>{num}</button>
                    ))}
                </div>

                <a href="/approver-page" className="received-back-button">ย้อนกลับ</a>
            </div>
        </div>
    );
}

export default Received;
