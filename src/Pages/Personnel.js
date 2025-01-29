import React, { useState, useEffect } from "react"; 
import axios from "axios";
import ITDashboard from "./ITDashboard";
import "./Personnel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faList, faPlus, faUserCircle, faUsers, faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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
const [selectedUsers, setSelectedUsers] = useState([]);  // ✅ เก็บ ID ที่เลือก
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPending, setShowPending] = useState(false); //
  const [showPendingUsers, setShowPendingUsers] = useState(false);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [approvedUsers, setApprovedUsers] = useState([]); // ✅ ประกาศ State
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    fullName: '',
    department_id: '',
    section_id: '',
    task_id: '',
    phone: '',
    email: '',
    username: '',
    password: '',
});
  

useEffect(() => {
  axios.get('http://localhost:5001/api/users')
      .then(response => setPersonnelData(response.data))
      .catch(error => console.error('Error fetching users:', error));

  axios.get('http://localhost:5001/api/departments')
      .then(response => setDepartments(response.data))
      .catch(error => console.error('Error fetching departments:', error));

      axios.get("http://localhost:5001/api/pending-users")
      .then(response => {
        console.log("✅ Pending Users from API:", response.data); // Debug
        setPendingUsers(response.data);
      })
      .catch(error => console.error("❌ Error fetching pending users:", error));
}, []);

// โหลด Sections เมื่อเลือก Department
useEffect(() => {
  if (newUser.department_id) {
      axios.get(`http://localhost:5001/api/sections/${newUser.department_id}`)
          .then(response => setSections(response.data))
          .catch(error => console.error('Error fetching sections:', error));
  } else {
      setSections([]);
      setTasks([]);
  }
}, [newUser.department_id]);

// โหลด Tasks เมื่อเลือก Section
useEffect(() => {
  if (newUser.section_id) {
      axios.get(`http://localhost:5001/api/tasks/${newUser.section_id}`)
          .then(response => setTasks(response.data))
          .catch(error => console.error('Error fetching tasks:', error));
  } else {
      setTasks([]);
  }
}, [newUser.section_id]);

// ดึงข้อมูลบุคลากรที่ยังไม่อนุมัติ
useEffect(() => {
  axios.get("http://localhost:5001/api/users/pending")
    .then(response => setUsers(response.data))
    .catch(error => console.error("Error fetching pending users:", error));
}, []);

  // โหลดข้อมูลกองตามฝ่าย
  const fetchSections = (departmentId) => {
    if (!departmentId) return;
    axios.get(`http://localhost:5001/api/sections/${departmentId}`)
      .then((response) => setSections(response.data || []))
      .catch((error) => console.error("Error fetching sections:", error));
  };

  // โหลดข้อมูลงานตามกอง
  const fetchTasks = (sectionId) => {
    if (!sectionId) return;
    axios.get(`http://localhost:5001/api/tasks/${sectionId}`)
      .then((response) => setTasks(response.data || []))
      .catch((error) => console.error("Error fetching tasks:", error));
  };

  
  const filteredData = personnelData.filter(user =>
    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
    ? pendingUsers.filter(user => user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()))
    : personnelData.filter(user => user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()))
);



const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
const navigate = useNavigate();  // ใช้ navigate เพื่อนำทางไปหน้าเดิม

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

  const handleCheckboxChange = (userId) => {
    setSelectedUsers(prevSelected =>
        prevSelected.includes(userId) 
        ? prevSelected.filter(id => id !== userId)  // ถ้าคลิกซ้ำให้ลบออก
        : [...prevSelected, userId]  // เพิ่ม ID ที่เลือก
    );
};

  const handleEditUser = (user) => {
    setSelectedUser(user);
    if (user.department_id) fetchSections(user.department_id);
    if (user.section_id) fetchTasks(user.section_id);
    setShowEditModal(true);
  };


  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleUpdateUser = () => {
    axios.put(`http://localhost:5001/api/users/${selectedUser.id}`, selectedUser)
      .then(() => {
        alert("อัปเดตข้อมูลสำเร็จ!");
        setShowEditModal(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        alert("เกิดข้อผิดพลาดในการอัปเดตข้อมูล!");
      });
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
        ...prev,
        [name]: value,
        ...(name === 'department_id' && { section_id: '', task_id: '' }),
        ...(name === 'section_id' && { task_id: '' })
    }));
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
        ...(name === "department_id" && { section_id: "", task_id: "" }), // รีเซ็ตกองและงานเมื่อเปลี่ยนฝ่าย
        ...(name === "section_id" && { task_id: "" }), // รีเซ็ตงานเมื่อเปลี่ยนกอง
    }));

    if (name === "department_id") {
        fetchSections(value); // โหลด Sections ใหม่
    } else if (name === "section_id") {
        fetchTasks(value); // โหลด Tasks ใหม่
    }
};


  // จัดการการเพิ่มข้อมูลใหม่
  const handleAddUser = () => {
    if (!newUser.department_id || !newUser.section_id || !newUser.task_id) {
      alert("กรุณาเลือกฝ่าย กอง และ งาน ให้ครบถ้วน");
      return;
    }
  
    const department = departments.find(d => d.id.toString() === newUser.department_id);
    const section = sections.find(s => s.id.toString() === newUser.section_id);
    const task = tasks.find(t => t.id.toString() === newUser.task_id);
  
    if (!department || !section || !task) {
      alert("ฝ่าย กอง หรือ งานที่เลือกไม่ถูกต้อง");
      return;
    }
  
    axios.post('http://localhost:5001/api/users', {
      fullName: newUser.fullName,
      department_id: department.id,
      department: department.name,
      section_id: section.id,
      section_name: section.name,
      task_id: task.id,
      task_name: task.name,
      phone: newUser.phone,
      email: newUser.email,
      username: newUser.username,
      password: newUser.password,
    })
    .then(response => {
      console.log("✅ เพิ่มข้อมูลสำเร็จ!", response.data);
      alert('เพิ่มข้อมูลสำเร็จ!');
      
      setShowAddModal(false); // ปิด Modal
      navigate('/personnel'); // กลับไปยังหน้าเดิม
      
      // โหลดข้อมูลใหม่
      axios.get('http://localhost:5001/api/users')
        .then(response => setPersonnelData(response.data))
        .catch(error => console.error('❌ โหลดข้อมูลใหม่ล้มเหลว:', error));
    })
    .catch(error => {
      console.error('❌ เกิดข้อผิดพลาดในการเพิ่มข้อมูล:', error.response?.data || error);
      alert('เกิดข้อผิดพลาดในการเพิ่มข้อมูล!');
    });
  };

  // ✅ ฟังก์ชันเพิ่ม/ลบผู้ใช้จากรายการที่เลือก
const toggleUserSelection = (userId) => {
  setSelectedUsers(prevSelected =>
      prevSelected.includes(userId)
          ? prevSelected.filter(id => id !== userId) // ถ้าเลือกไว้แล้ว ให้เอาออก
          : [...prevSelected, userId] // ถ้ายังไม่ได้เลือก ให้เพิ่มเข้าไป
  );
};

// ✅ ฟังก์ชันลบข้อมูลที่ถูกเลือก
const handleDeleteSelected = async () => {
  if (selectedUsers.length === 0) {
      alert("กรุณาเลือกผู้ใช้ที่ต้องการลบ");
      return;
  }

  if (!window.confirm(`คุณต้องการลบ ${selectedUsers.length} รายการหรือไม่?`)) return;

  try {
      const response = await axios.delete("http://localhost:5001/api/users", {
          data: { ids: selectedUsers }, // ✅ ส่งค่าเป็น JSON
          headers: { "Content-Type": "application/json" },
      });

      alert(response.data.message);
      setSelectedUsers([]); // ✅ ล้างค่าที่เลือก
      axios.get("http://localhost:5001/api/users") // โหลดข้อมูลใหม่
          .then((response) => setPersonnelData(response.data))
          .catch((error) => console.error("Error fetching updated users:", error));
  } catch (error) {
      console.error("Error deleting users:", error);
      alert("เกิดข้อผิดพลาดในการลบข้อมูล!");
  }
};
const fetchApprovedUsers = async () => {
  try {
    const response = await axios.get("http://localhost:5001/api/users");
    setApprovedUsers(response.data);
  } catch (error) {
    console.error("Error fetching approved users:", error);
  }
};
const handleApprove = async (id) => {
  if (!window.confirm("คุณต้องการอนุมัติบุคลากรนี้ใช่หรือไม่?")) return;

  try {
    const response = await axios.put(`http://localhost:5001/api/users/approve/${id}`);
    alert(response.data.message);
    fetchApprovedUsers(); // ✅ โหลดข้อมูลใหม่หลังอนุมัติ
  } catch (error) {
    console.error("❌ Error approving user:", error);
    alert("เกิดข้อผิดพลาดในการอนุมัติ!");
  }
};

const handleReject = async (id) => {
  if (!window.confirm("คุณต้องการไม่อนุมัติบุคลากรนี้ใช่หรือไม่?")) return;

  try {
    const response = await axios.put(`http://localhost:5001/api/users/reject/${id}`);
    alert(response.data.message);
    fetchApprovedUsers(); // ✅ โหลดข้อมูลใหม่หลังไม่อนุมัติ
  } catch (error) {
    console.error("❌ Error rejecting user:", error);
    alert("เกิดข้อผิดพลาดในการไม่อนุมัติ!");
  }
};

useEffect(() => {
  const fetchApprovedUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/users"); // ✅ ใช้ API ที่ถูกต้อง
      console.log("✅ Approved Users (Frontend):", response.data); // ✅ Debug
      setUsers(response.data); // ✅ ตั้งค่า users ใหม่
    } catch (error) {
      console.error("❌ Error fetching approved users:", error);
    }
  };

  fetchApprovedUsers();
}, []);


return (
  <div>
      <ITDashboard />
          <div className="personnel-container">
            <h1 className="title1">
              <FontAwesomeIcon icon={faUsers} style={{ marginRight: "10px" }} />
              {showPendingUsers ? "รายการสมัครของบุคลากร" : "บุคลากร"}
            </h1>
            
            <div className="actions-container">
              <input
                type="text"
                placeholder="ค้นหา"
                className="search-box"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-secondary" onClick={() => setShowPendingModal(true)}>
    <FontAwesomeIcon icon={faList} style={{ marginRight: "5px" }} />
    รายการสมัครของบุคลากร
</button>
              <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
        <FontAwesomeIcon icon={faPlus} style={{ marginRight: "5px" }} />
        เพิ่ม
    </button>
    
    {/* ✅ ปุ่มลบ (แสดงจำนวนที่เลือก) */}
    <button 
        className="btn btn-danger" 
        onClick={handleDeleteSelected}
        disabled={selectedUsers.length === 0} // ปิดปุ่มหากไม่มีรายการที่ถูกเลือก
    >
        <FontAwesomeIcon icon={faTrash} style={{ marginRight: "5px" }} />
        ลบที่เลือก ({selectedUsers.length})
    </button>
            </div>
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
  {users.length > 0 ? (
    users.map((user, index) => (
      <tr key={user.id}>
        <td>
          <input
            type="checkbox"
            checked={selectedUsers.includes(user.id)}
            onChange={() => toggleUserSelection(user.id)}
          />
        </td>
        <td>{index + 1}</td>
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
    ))
  ) : (
    <tr>
      <td colSpan="5" style={{ textAlign: "center" }}>ไม่มีบุคลากรที่อนุมัติแล้ว</td>
    </tr>
  )}
</tbody>

              </table>
          </div>
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
        <div className="form-group">
    <label>ฝ่าย/สำนัก</label>
    <select name="department_id" value={newUser.department_id} onChange={handleAddInputChange}>
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
    <select name="section_id" value={newUser.section_id} onChange={handleAddInputChange} disabled={!newUser.department_id}>
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
    <select name="task_id" value={newUser.task_id} onChange={handleAddInputChange} disabled={!newUser.section_id}>
        <option value="">เลือก</option>
        {tasks.map((task) => (
            <option key={task.id} value={task.id}>
                {task.name}
            </option>
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
{showPendingModal && (
  <div className="modal-overlay1">
    <div className="modal-content1">
      <button className="close-btn" onClick={() => setShowPendingModal(false)}>
        &times;
      </button>
      <h2 className="modal-title1">รายการสมัครของบุคลากร</h2>
      <table className="personnel-table">
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>รูป</th>
            <th>ชื่อฝ่าย/สำนัก</th>
            <th>ดูข้อมูล</th>
          </tr>
        </thead>
        <tbody>
  {pendingUsers.map((user, index) => (
    <tr key={user.id}>
      <td>{index + 1}</td>
      <td>
        <FontAwesomeIcon icon={faUserCircle} className="icon-profile" />
      </td>
      <td>
        {console.log("Department Name:", user.department_name)} {/* Debug */}
        {user.department_name ? user.department_name : "ไม่ระบุ"}
      </td>
      <td>
        <button className="btn btn-view" onClick={() => handleViewDetails(user)}>
          <FontAwesomeIcon icon={faEye} /> ดู
        </button>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  </div>
)}
{showPendingModal && selectedUser && (
  <div className="modal-overlay">
    <div className="modal-content">
      <button className="close-btn" onClick={handleCloseModal}>&times;</button>
      <h2>ข้อมูลบุคลากร</h2>
      <p><strong>ชื่อ:</strong> {selectedUser.fullName}</p>
      <p><strong>Email:</strong> {selectedUser.email}</p>
      <p><strong>เบอร์:</strong> {selectedUser.phone}</p>
      <p><strong>ฝ่าย:</strong> {selectedUser.department_name}</p>
      <p><strong>กอง:</strong> {selectedUser.section_name}</p>
      <p><strong>งาน:</strong> {selectedUser.task_name}</p>

      <div className="action-buttons">
        <button className="btn btn-success" onClick={() => handleApprove(selectedUser.id)}>
          ✅ อนุมัติ
        </button>
        <button className="btn btn-danger" onClick={() => handleReject(selectedUser.id)}>
          ❌ ไม่อนุมัติ
        </button>
      </div>
    </div>
  </div>
)}

      </div>
      );
    };

export default Personnel;
