import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Received.css";
import DashboardApprover from "./DashboardApprover.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarehouse } from "@fortawesome/free-solid-svg-icons";

function Received() {
    const [totalItems, setTotalItems] = useState(0);
    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [searchDate, setSearchDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get("http://localhost:5001/api/requests");
                const approvedRequests = response.data.filter(req => req.status === 'Approved');

                const userResponses = await Promise.all(
                    approvedRequests.map(req => axios.get(`http://localhost:5001/api/users/${req.user_id}`))
                );

                const enrichedRequests = approvedRequests.map((req, index) => ({
                    ...req,
                    borrower_name: userResponses[index].data.fullName
                }));

                setRequests(enrichedRequests);
                setFilteredRequests(enrichedRequests);
                setTotalItems(enrichedRequests.length);
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
                received_by: 'IT Staff',
                date_received: new Date().toISOString().slice(0, 19).replace('T', ' '),
            });

            alert("อัปเดตสถานะรับของแล้วสำเร็จ");

            const updatedRequests = requests.filter(req => req.id !== id);
            setRequests(updatedRequests);
            setFilteredRequests(updatedRequests);
            setTotalItems(updatedRequests.length);
        } catch (error) {
            console.error("Error updating status:", error);
            alert("เกิดข้อผิดพลาดในการอัปเดตสถานะ");
        }
    };

    const handleViewDetails = (id) => {
        window.location.href = `/request-details/${id}`;
    };

    const handleSearchByDate = () => {
        if (!searchDate) {
            setFilteredRequests(requests);
            return;
        }

        const filtered = requests.filter(req => req.date_requested.startsWith(searchDate));
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
                    <input
                        type="date"
                        className="received-input"
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                    />
                    <button className="received-search-button" onClick={handleSearchByDate}>ค้นหา</button>
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
                                    <td>{req.date_requested}</td>
                                    <td>
                                        <button onClick={() => handleReceiveItem(req.id)}>รับของแล้ว</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleViewDetails(req.id)}>ดู</button>
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
                    {pageNumbers.map(number => (
                        <button key={number} className="received-page-button" onClick={() => paginate(number)}>
                            {number}
                        </button>
                    ))}
                </div>

                <a href="/approver-page" className="received-back-button">ย้อนกลับ</a>
            </div>
        </div>
    );
}

export default Received;
