import React, { useState, useEffect } from "react";
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
                const data = [
                    {
                        id: 1,
                        name: "นายสมหมาย",
                        department: "ฝ่ายเทคโนโลยี",
                        item: "เครื่องพิมพ์",
                        date: "2024-02-13",
                    },
                ];
                setRequests(data);
                setTotalItems(data.length);
            } catch (error) {
                console.error("Error fetching requests:", error);
            }
        };

        fetchRequests();
    }, []);

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
                            <th>ฝ่ายสำนัก</th>
                            <th>ชื่อวัสดุอุปกรณ์</th>
                            <th>วันที่ขอเบิก</th>
                            <th>รายละเอียด</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.length > 0 ? (
                            requests.map((req, index) => (
                                <tr key={req.id}>
                                    <td>{index + 1}</td>
                                    <td>{req.name}</td>
                                    <td>{req.department}</td>
                                    <td>{req.item}</td>
                                    <td>{req.date}</td>
                                    <td>{req.quantity}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8">ไม่มีข้อมูล</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="received-pagination">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <button className="received-page-button" key={num} onClick={() => alert("ฟังก์ชันแบ่งหน้ายังไม่ทำงาน")}>
                            {num}
                        </button>
                    ))}
                </div>

                <a href="/approver-page" className="received-back-button">ย้อนกลับ</a>
            </div>
        </div>
    );
}

export default Received;
