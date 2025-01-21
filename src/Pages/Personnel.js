import React, { useState, useEffect } from "react";
import axios from "axios";
import ITDashboard from "./ITDashboard";
import "./Personnel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faList, faPlus, faUserCircle, faUsers } from "@fortawesome/free-solid-svg-icons";

const Personnel = () => {
  const [personnelData, setPersonnelData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // เก็บข้อความค้นหา
  const itemsPerPage = 10;

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/users")
      .then((response) => {
        setPersonnelData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const filteredData = personnelData.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <ITDashboard />
      <div className="personnel-container">
      <h1 className="title1">
            <FontAwesomeIcon icon={faUsers} style={{ marginRight: "10px" }} />
            บุคลากร
          </h1>
        <div className="actions-container">
          <input
            type="text"
            placeholder="ค้นหา"
            className="search-box"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-secondary">
            <FontAwesomeIcon icon={faList} style={{ marginRight: "5px" }} />
            รายการสมัครของบุคลากร
          </button>
          <button className="btn btn-primary">
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: "5px" }} />
            เพิ่ม
          </button>
        </div>
        <p className="summary">
          ทั้งหมด {filteredData.length} รายการ แสดง {indexOfFirstItem + 1} ถึง{" "}
          {Math.min(indexOfLastItem, filteredData.length)} หน้า {currentPage} จากทั้งหมด{" "}
          {Math.ceil(filteredData.length / itemsPerPage)} หน้า
        </p>
        <table className="personnel-table">
          <thead>
            <tr>
              <th>ลบ</th>
              <th>ลำดับ</th>
              <th>รูป</th>
              <th>ชื่อฝ่าย/สำนัก</th>
              <th>ดูข้อมูลบุคลากร</th>
            </tr>
          </thead>
          <tbody>
  {currentItems.map((user, index) => (
    <tr key={user.id}>
      <td>
        <input type="checkbox" />
      </td>
      <td>{indexOfFirstItem + index + 1}</td>
      <td>
        <FontAwesomeIcon 
          icon={faUserCircle} 
          className="icon-profile" 
          onClick={() => handleImageClick(user.image || "https://via.placeholder.com/50")} 
        />
      </td>
      <td>{user.department || "ไม่ระบุ"}</td>
      <td>
        <div className="action-buttons">
          <button className="btn btn-view">
            <FontAwesomeIcon icon={faEye} />
            ดู
          </button>
          <button className="btn btn-edit">
            <FontAwesomeIcon icon={faEdit} />
            แก้ไข
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>
        </table>
        <footer className="pagination">
          {Array.from(
            { length: Math.ceil(filteredData.length / itemsPerPage) },
            (_, index) => (
              <button
                key={index}
                className={`pagination-btn ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            )
          )}
        </footer>

        {selectedImage && (
          <div className="image-modal" onClick={handleCloseImage}>
            <div className="image-container">
              <img src={selectedImage} alt="บุคลากร" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Personnel;
