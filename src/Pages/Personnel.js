import React, { useState, useEffect } from "react";
import axios from "axios";
import ITDashboard from "./ITDashboard";
import "./Personnel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faList,
  faPlus,
  faUserCircle,
  faUsers,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const Personnel = () => {
  const [personnelData, setPersonnelData] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [sections, setSections] = useState([6]);
  const [tasks, setTasks] = useState([]);
  const [allSections, setAllSections] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);


  useEffect(() => {
    axios
      .get("http://localhost:5001/api/users")
      .then((response) => {
        setPersonnelData(response.data);
        console.log("Fetched Users:", response.data); // ตรวจสอบข้อมูล
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);
  

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/departments")
      .then((response) => {
        setDepartments(response.data);
        console.log("Departments fetched:", response.data);
      })
      .catch((error) => console.error("Error fetching departments:", error));
  
    axios
      .get("http://localhost:5001/api/sections")
      .then((response) => {
        setAllSections(response.data);
        console.log("Sections fetched:", response.data);
      })
      .catch((error) => console.error("Error fetching sections:", error));
  
    axios
      .get("http://localhost:5001/api/tasks")
      .then((response) => {
        setAllTasks(response.data);
        console.log("Tasks fetched:", response.data);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);
  
  
  const filteredData = personnelData.filter(
    (user) =>
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      departments.find((d) => d.id === user.department_name)?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
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

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    console.log("Selected User:", user); // ตรวจสอบค่า
    setShowModal(true);
};

  

  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  const getDepartmentName = (id) => {
    return departments.find((dept) => String(dept.id) === String(id))?.name || "ไม่ระบุ";
  };
  
  const getSectionName = (id) => {
    return allSections.find((sec) => String(sec.id) === String(id))?.name || "ไม่ระบุ";
  };
  
  const getTaskName = (id) => {
    return allTasks.find((task) => String(task.id) === String(id))?.name || "ไม่ระบุ";
  };
  
  useEffect(() => {
    console.log("Selected User:", selectedUser);
    console.log("Departments:", departments);
    console.log("Sections:", sections);
    console.log("Tasks:", tasks);
  }, [selectedUser, departments, sections, tasks]);
  
  
  
  const handleEditUser = (user) => {
    setSelectedUser(user);
  
    // โหลด sections และ tasks ที่สัมพันธ์กับข้อมูลปัจจุบัน
    if (user.department_name) {
      fetchSections(user.department_name);
    }
  
    if (user.section_name) {
      fetchTasks(user.section_name);
    }
  
    setShowEditModal(true); // เปิดฟอร์มแก้ไข
  };
  

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleUpdateUser = () => {
    axios
      .put(`http://localhost:5001/api/users/${selectedUser.id}`, selectedUser)
      .then((response) => {
        alert("บันทึกข้อมูลสำเร็จ!");
        setShowEditModal(false);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล!");
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    setSelectedUser((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "department_name" && { section_name: "", task_name: "" }), // รีเซ็ตกองและงาน
      ...(name === "section_name" && { task_name: "" }), // รีเซ็ตงาน
    }));
  
    // เรียก API โหลดข้อมูลถัดไป
    if (name === "department_name") {
      fetchSections(value);
    } else if (name === "section_name") {
      fetchTasks(value);
    }
  };
  

  const fetchSections = (departmentId) => {
    axios
      .get(`http://localhost:5001/api/sections/${departmentId}`)
      .then((response) => setSections(response.data))
      .catch((error) => console.error("Error fetching sections:", error));
  };
  
  const fetchTasks = (sectionId) => {
    axios
      .get(`http://localhost:5001/api/tasks/${sectionId}`)
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  };
  useEffect(() => {
    console.log("Selected User:", selectedUser);
  }, [selectedUser]);
  

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
          ทั้งหมด {filteredData.length} รายการ แสดง {indexOfFirstItem + 1} ถึง {" "}
          {Math.min(indexOfLastItem, filteredData.length)} หน้า {currentPage} จากทั้งหมด {" "}
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
                    onClick={() =>
                      handleImageClick(user.image || "https://via.placeholder.com/50")
                    }
                  />
                </td>
                <td>{user.department || "ไม่ระบุ"}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn btn-view"
                      onClick={() => handleViewDetails(user)}
                    >
                      <FontAwesomeIcon icon={faEye} />
                      ดู
                    </button>
                    <button
                      className="btn btn-edit"
                      onClick={() => handleEditUser(user)}
                    >
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

{showModal && selectedUser && (
  <div className="modal-overlay1">
    <div className="modal-content1">
      <button
        className="close-btn enhanced-close-btn"
        onClick={handleCloseModal}
      >
        &times;
      </button>
      <h2 className="modal-title1">ข้อมูลบุคลากร</h2>
      <div className="modal-details1">
        <div className="profile-container">
          {selectedUser.image ? (
            <img
              src={selectedUser.image}
              alt="Profile"
              className="profile-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/120";
              }}
            />
          ) : (
            <div className="icon-placeholder">
              <FontAwesomeIcon
                icon={faUserCircle}
                className="profile-icon"
              />
            </div>
          )}
        </div>
        <div className="details-container">
          <div className="details-column">
            <p>
              <strong>ชื่อ - นามสกุล:</strong> {selectedUser.fullName}
            </p>
            <p>
  <strong>ชื่อฝ่าย/สำนัก:</strong>{" "}
  {departments.find((dept) => String(dept.id) === String(selectedUser.department_name))?.name || "ไม่ระบุ"}
</p>
<p>
  <strong>กอง:</strong>{" "}
  {sections.find((section) => String(section.id) === String(selectedUser.section_name))?.name || "ไม่ระบุ"}
</p>
<p>
  <strong>งาน:</strong>{" "}
  {tasks.find((task) => String(task.id) === String(selectedUser.task_name))?.name || "ไม่ระบุ"}
</p>

            <p>
              <strong>เบอร์ภายใน:</strong> {selectedUser.phone}
            </p>
          </div>
          <div className="details-column">
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Username:</strong> {selectedUser.username}
            </p>
            <p>
              <strong>Password:</strong> {selectedUser.password}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

        {showEditModal && selectedUser && (
          <div className="modal-overlay1">
            <div className="modal-content1">
              <button className="close-btn" onClick={handleCloseEditModal}>
                &times;
              </button>
              <h2>แก้ไขข้อมูลบุคลากร</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateUser(selectedUser);
                }}
              >
                <div className="form-group">
                  <label>ชื่อ - นามสกุล</label>
                  <input
                    type="text"
                    value={selectedUser.fullName}
                    onChange={(e) =>
                      setSelectedUser((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-group">
  <label>ฝ่าย/สำนัก</label>
  <select
  name="department_name"
  value={selectedUser.department_name || ""}
  onChange={handleInputChange}
>
  <option value="">เลือก</option>
  {departments.map((dept) => (
    <option key={dept.id} value={dept.id}>
      {dept.name}
    </option>
  ))}
</select>

</div>

<div className="form-group">
  <label>กอง</label>
  <select
  name="section_name"
  value={selectedUser.section_name || ""}
  onChange={(e) => {
    handleInputChange(e);
    fetchTasks(e.target.value); // โหลดงานเมื่อเลือกกอง
  }}
>
  <option value="">เลือก</option>
  {sections.map((section) => (
    <option key={section.id} value={section.id}>
      {section.name}
    </option>
  ))}
</select>
</div>

<div className="form-group">
  <label>งาน</label>
  <select
  name="task_name"
  value={selectedUser.task_name || ""}
  onChange={handleInputChange}
>
  <option value="">เลือก</option>
  {tasks.map((task) => (
    <option key={task.id} value={task.id}>
      {task.name}
    </option>
  ))}
</select>
</div>
                <div className="form-group">
                  <label>เบอร์ภายใน</label>
                  <input
                    type="text"
                    value={selectedUser.phone}
                    onChange={(e) =>
                      setSelectedUser((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={selectedUser.email}
                    onChange={(e) =>
                      setSelectedUser((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    value={selectedUser.username}
                    onChange={(e) =>
                      setSelectedUser((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={selectedUser.password}
                    onChange={(e) =>
                      setSelectedUser((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-save"
                    onClick={handleUpdateUser}
                  >
                    บันทึก
                  </button>
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={handleCloseEditModal}
                  >
                    ยกเลิก
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        </div>
      </div>
  );
};

export default Personnel;
