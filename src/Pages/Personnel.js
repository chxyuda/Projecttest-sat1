import React, { useState, useEffect } from "react"; 
import axios from "axios";
import ITDashboard from "./ITDashboard";
import "./Personnel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faList, faPlus, faUserCircle, faUsers, faTimes } from "@fortawesome/free-solid-svg-icons";

const Personnel = () => {
  const [personnelData, setPersonnelData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedTask, setSelectedTask] = useState('');
  const [departments, setDepartments] = useState([]); // สำหรับเก็บข้อมูลฝ่าย
const [sections, setSections] = useState([]); // สำหรับเก็บข้อมูลกอง
const [tasks, setTasks] = useState([]); // สำหรับเก็บข้อมูลงาน
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    fullName: "",
    department_name: "",
    section_name: "",
    task_name: "",
    phone: "",
    email: "",
    username: "",
    password: "",
  });
  

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/users")
      .then((response) => {
        setPersonnelData(response.data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/departments")
      .then((response) => {
        console.log("Departments:", response.data); // ตรวจสอบข้อมูล Departments
        setDepartments(response.data);
      })
      .catch((error) => console.error("Error fetching departments:", error));
  }, []);
  
  

  const filteredData = personnelData.filter((user) =>
    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleDepartmentChange = (e) => {
    const departmentId = e.target.value;
    setSelectedDepartment(departmentId);
    setSelectedSection('');
    setSelectedTask('');
  
    if (departmentId) {
      axios.get(`http://localhost:5001/api/sections/${departmentId}`)
        .then(response => setSections(response.data))
        .catch(error => console.error('Error fetching sections:', error));
    } else {
      setSections([]);
      setTasks([]);
    }
  };

  const handleSectionChange = (e) => {
    const sectionId = e.target.value;
    setSelectedSection(sectionId);
    setSelectedTask('');
  
    if (sectionId) {
      axios.get(`http://localhost:5001/api/tasks/${sectionId}`)
        .then(response => setTasks(response.data))
        .catch(error => console.error('Error fetching tasks:', error));
    } else {
      setTasks([]);
    }
  };
  

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
  
    // โหลดข้อมูล Sections (กอง) ตาม Department
    if (user.department) {
      fetchSections(user.department); // เรียกฟังก์ชันโหลดกอง
    }
  
    // โหลดข้อมูล Tasks (งาน) ตาม Section
    if (user.section_name) {
      fetchTasks(user.section_name); // เรียกฟังก์ชันโหลดงาน
    }
  
    setShowEditModal(true);
  };
  

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleUpdateUser = () => {
    axios
      .put(`http://localhost:5001/api/users/${selectedUser.id}`, {
        fullName: selectedUser.fullName,
        department: selectedUser.department,
        section_name: selectedUser.section_name,
        task_name: selectedUser.task_name,
        phone: selectedUser.phone,
        email: selectedUser.email,
        username: selectedUser.username,
        password: selectedUser.password,
      })
      .then(() => {
        alert("อัปเดตข้อมูลสำเร็จ!");
        setShowEditModal(false);
        window.location.reload(); // โหลดข้อมูลใหม่หลังอัปเดต
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        alert("เกิดข้อผิดพลาดในการอัปเดตข้อมูล!");
      });
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    setSelectedUser((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "department" && { section_name: "", task_name: "" }), // รีเซ็ตกองและงาน
      ...(name === "section_name" && { task_name: "" }), // รีเซ็ตงาน
    }));
  
    // โหลดข้อมูลใหม่
    if (name === "department") {
      fetchSections(value); // โหลด Sections ใหม่
    } else if (name === "section_name") {
      fetchTasks(value); // โหลด Tasks ใหม่
    }
  };
  
  
  const fetchSections = (departmentId) => {
    if (!departmentId) return; // หากไม่มี ID ก็ไม่ต้องดึงข้อมูล
    axios
      .get(`http://localhost:5001/api/sections/${departmentId}`)
      .then((response) => {
        setSections(response.data || []); // ตั้งค่า Sections
      })
      .catch((error) => console.error("Error fetching sections:", error));
  };
  
  const fetchTasks = (sectionId) => {
    if (!sectionId) return; // หากไม่มี ID ก็ไม่ต้องดึงข้อมูล
    axios
      .get(`http://localhost:5001/api/tasks/${sectionId}`)
      .then((response) => {
        setTasks(response.data || []); // ตั้งค่า Tasks
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  };
  
  
  useEffect(() => {
    if (selectedUser?.department) {
      fetchSections(selectedUser.department); // โหลด Sections
    }
    if (selectedUser?.section_name) {
      fetchTasks(selectedUser.section_name); // โหลด Tasks
    }
  }, [selectedUser]);
  

  useEffect(() => {
    console.log("Selected User:", selectedUser);
    console.log("Sections:", sections);
    console.log("Tasks:", tasks);
  }, [selectedUser, sections, tasks]);
  
  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
  
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "department_name" && { section_name: "", task_name: "" }),
      ...(name === "section_name" && { task_name: "" }),
    }));
  
    if (name === "department_name") {
      fetchSections(value); // โหลด Sections ใหม่
    } else if (name === "section_name") {
      fetchTasks(value); // โหลด Tasks ใหม่
    }
  };

  const handleAddUser = () => {
    axios
      .post("http://localhost:5001/api/users", newUser)
      .then(() => {
        alert("เพิ่มข้อมูลสำเร็จ!");
        setShowAddModal(false);
        window.location.reload(); // โหลดข้อมูลใหม่หลังเพิ่ม
      })
      .catch((error) => {
        console.error("Error adding user:", error);
        alert("เกิดข้อผิดพลาดในการเพิ่มข้อมูล!");
      });
  };
  useEffect(() => {
    if (newUser.department) {
      fetchSections(newUser.department); // โหลด Sections เมื่อเลือกฝ่าย/สำนัก
    } else {
      setSections([]); // รีเซ็ตเมื่อไม่มีการเลือก
    }
  }, [newUser.department]);
  
  useEffect(() => {
    if (newUser.section_name) {
      fetchTasks(newUser.section_name); // โหลด Tasks เมื่อเลือกกอง
    } else {
      setTasks([]); // รีเซ็ตเมื่อไม่มีการเลือก
    }
  }, [newUser.section_name]);

  useEffect(() => {
    console.log("New User Data:", newUser);
  }, [newUser]);  
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
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
  <FontAwesomeIcon icon={faPlus} style={{ marginRight: "5px" }} />
  เพิ่ม
</button>

        </div>
        <p className="summary">
          ทั้งหมด {filteredData.length} รายการ แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, filteredData.length)} หน้า {currentPage} จากทั้งหมด {Math.ceil(filteredData.length / itemsPerPage)} หน้า
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
                    <button className="btn btn-view" onClick={() => handleViewDetails(user)}>
                      <FontAwesomeIcon icon={faEye} /> ดู
                    </button>
                    <button className="btn btn-edit" onClick={() => handleEditUser(user)}>
                      <FontAwesomeIcon icon={faEdit} /> แก้ไข
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <footer className="pagination">
          {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, index) => (
            <button
              key={index}
              className={`pagination-btn ${currentPage === index + 1 ? "active" : ""}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </footer>
        {showModal && selectedUser && (
  <div className="modal-overlay1">
    <div className="modal-content1">
      <button className="close-btn enhanced-close-btn" onClick={handleCloseModal}>
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
        e.target.onerror = null; // ป้องกันการวนลูป error
        e.target.src = "https://via.placeholder.com/120";
      }}
    />
  ) : (
    <div className="icon-placeholder">
      <FontAwesomeIcon icon={faUserCircle} className="profile-icon" />
    </div>
  )}
</div>

        <div className="details-container">
          <div className="details-column">
            <p>
              <strong>ชื่อ - นามสกุล:</strong> {selectedUser.fullName}
            </p>
            <p>
              <strong>ชื่อฝ่าย/สำนัก:</strong> {selectedUser.department}
            </p>
            <p>
            <strong>กอง:</strong> {selectedUser.section_name}
            </p>
            <p>
              <strong>งาน:</strong> {selectedUser.task_name}
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
                    name="fullName"
                    value={selectedUser.fullName || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
  <label>ฝ่าย/สำนัก</label>
  <select
  name="department"
  value={selectedUser?.department || ""}
  onChange={handleInputChange}
>
  <option value="">เลือก</option>
  {departments.map((dept) => (
    <option key={dept.name} value={dept.name}>
      {dept.name}
    </option>
  ))}
</select>
</div>
<div className="form-group">
  <label>กอง</label>
  <select
    name="section_name"
    value={selectedUser?.section_name || ""}
    onChange={handleInputChange}
  >
    <option value="">เลือก</option>
    {sections.map((section) => (
      <option key={section.name} value={section.name}>
        {section.name}
      </option>
    ))}
  </select>
</div>

<div className="form-group">
  <label>งาน</label>
  <select
    name="task_name"
    value={selectedUser?.task_name || ""}
    onChange={handleInputChange}
  >
    <option value="">เลือก</option>
    {tasks.map((task) => (
      <option key={task.name} value={task.name}>
        {task.name}
      </option>
    ))}
  </select>
</div>
                <div className="form-group">
                  <label>เบอร์ภายใน</label>
                  <input
                    type="text"
                    name="phone"
                    value={selectedUser.phone || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={selectedUser.email || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={selectedUser.username || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={selectedUser.password || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-save">
                    บันทึก
                  </button>
                  <button type="button" className="btn-cancel" onClick={handleCloseEditModal}>
                    ยกเลิก
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {showAddModal && (
  <div className="modal-overlay1">
    <div className="modal-content1">
      <button className="close-btn" onClick={() => setShowAddModal(false)}>
        &times;
      </button>
      <h2>เพิ่มข้อมูลบุคลากร</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddUser();
        }}
      >
        <div className="form-group">
          <label>ชื่อ - นามสกุล</label>
          <input
            type="text"
            name="fullName"
            value={newUser.fullName || ""}
            onChange={(e) => handleAddInputChange(e)}
          />
        </div>
        <form>
  <div>
    <label>ฝ่าย</label>
    <select value={selectedDepartment} onChange={handleDepartmentChange}>
      <option value="">เลือกฝ่าย</option>
      {departments.map(dept => (
        <option key={dept.id} value={dept.id}>{dept.name}</option>
      ))}
    </select>
  </div>

  <div>
    <label>กอง</label>
    <select value={selectedSection} onChange={handleSectionChange} disabled={!selectedDepartment}>
      <option value="">เลือกกอง</option>
      {sections.map(section => (
        <option key={section.id} value={section.id}>{section.name}</option>
      ))}
    </select>
  </div>

  <div>
    <label>งาน</label>
    <select value={selectedTask} onChange={(e) => setSelectedTask(e.target.value)} disabled={!selectedSection}>
      <option value="">เลือกงาน</option>
      {tasks.map(task => (
        <option key={task.id} value={task.id}>{task.name}</option>
      ))}
    </select>
  </div>
</form>
        <div className="form-group">
          <label>เบอร์ภายใน</label>
          <input
            type="text"
            name="phone"
            value={newUser.phone || ""}
            onChange={(e) => handleAddInputChange(e)}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={newUser.email || ""}
            onChange={(e) => handleAddInputChange(e)}
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={newUser.username || ""}
            onChange={(e) => handleAddInputChange(e)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={newUser.password || ""}
            onChange={(e) => handleAddInputChange(e)}
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-save">
            บันทึก
          </button>
          <button
            type="button"
            className="btn-cancel"
            onClick={() => setShowAddModal(false)}
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
