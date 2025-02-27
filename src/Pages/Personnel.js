import React, { useState, useEffect } from "react"; 
import axios from "axios";
import ITDashboard from "./ITDashboard";
import "./Personnel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faList, faPlus, faUserCircle, faUsers, faCamera, faCheck } from "@fortawesome/free-solid-svg-icons";
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
  const [rejectedUsers, setRejectedUsers] = useState([]);
  const [showRejectedModal, setShowRejectedModal] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
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

const [formData, setFormData] = useState({
  fullName: "",
  department_id: "",
  section_id: "",
  task_id: "",
  phone: "",
  email: "",
  username: "",
  password: "",
});

useEffect(() => {
  axios.get('http://localhost:5001/api/users')
    .then(response => {
      console.log("✅ Pending Users (Before Filter):", response.data);  // ตรวจสอบค่าที่ได้
      console.log("✅ Personnel Data (API Response):", response.data);
      setPersonnelData(response.data);
    })
    .catch(error => console.error('❌ Error fetching users:', error));

  axios.get('http://localhost:5001/api/departments')
      .then(response => setDepartments(response.data))
      .catch(error => console.error('Error fetching departments:', error));

      axios.get("http://localhost:5001/api/pending-users")
      .then(response => {
         console.log("✅ Pending Users from API:", response.data);
         setPendingUsers(Array.isArray(response.data) ? response.data : []);  // ป้องกัน null
      })
      .catch(error => console.error("❌ Error fetching pending users:", error));
}, []);

useEffect(() => {
  axios.get("http://localhost:5001/api/users")
      .then(response => {
          console.log("✅ Approved Users:", response.data);
          setApprovedUsers(response.data.filter(user => user.status === "Approved"));
      })
      .catch(error => console.error("❌ Error fetching approved users:", error));
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
  axios.get('http://localhost:5001/api/pending-users')
      .then(response => {
          console.log("✅ ข้อมูลที่โหลดจาก API:", response.data.users);  // ✅ Debug ดูข้อมูล
          setPendingUsers(response.data.users);
      })
      .catch(error => console.error("❌ Error loading pending users:", error));
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
const filteredPendingUsers = Array.isArray(pendingUsers) 
  ? pendingUsers.filter(user => user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()))
  : [];

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

  const handleViewDetails = async (user) => {
    try {
        const response = await axios.get(`http://localhost:5001/api/users/${user.id}`);
        console.log("✅ User Details from API:", response.data);  // ตรวจสอบว่ามีค่า image หรือไม่
        setSelectedUser(response.data);
        setShowModal(true);
    } catch (error) {
        console.error("❌ Error fetching user details:", error);
        alert("❌ ไม่สามารถดึงข้อมูลผู้ใช้ได้");
    }
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

const handleEditUser = async (user) => {
  try {
    const response = await axios.get(`http://localhost:5001/api/users/${user.id}`);
    setSelectedUser(response.data);
    setFormData({
      ...response.data,
      department_id: departments.find(d => d.name === response.data.department_name)?.id || "",
      section_id: sections.find(s => s.name === response.data.section_name)?.id || "",
      task_id: tasks.find(t => t.name === response.data.task_name)?.id || "",
    });
    setShowEditModal(true);
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
};



const handleSaveEdit = async () => {
  console.log("📌 ข้อมูลที่กำลังอัปเดต:", formData);

  if (!formData.fullName || !formData.department_id || !formData.section_id || !formData.task_id) {
      alert("❌ กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
  }

  try {
      let imageUrl = formData.image; // ใช้รูปเดิมหากไม่มีการอัปโหลดใหม่

      if (selectedFile) {
          const formDataImg = new FormData();
          formDataImg.append("image", selectedFile);

          const uploadResponse = await axios.post("http://localhost:5001/api/upload-profile", formDataImg, {
              headers: { "Content-Type": "multipart/form-data" },
          });

          imageUrl = uploadResponse.data.imageUrl;
      }

      const response = await axios.put(`http://localhost:5001/api/users/${selectedUser.id}`, {
          fullName: formData.fullName,
          department_name: departments.find(d => d.id.toString() === formData.department_id)?.name || formData.department_id,
          section_name: sections.find(s => s.id.toString() === formData.section_id)?.name || formData.section_id,
          task_name: tasks.find(t => t.id.toString() === formData.task_id)?.name || formData.task_id,
          phone: formData.phone,
          email: formData.email,
          username: formData.username,
          password: formData.password ? formData.password : undefined, // ไม่เปลี่ยนรหัสผ่านถ้าปล่อยว่าง
          image: imageUrl,
      });

      if (response.data.success) {
          alert("✅ บันทึกข้อมูลสำเร็จ!");
          setShowEditModal(false);
          fetchPersonnelData(); // โหลดข้อมูลใหม่
      } else {
          alert("❌ บันทึกไม่สำเร็จ: " + response.data.message);
      }
  } catch (error) {
      console.error("❌ Error updating user:", error.response?.data || error);
      alert("❌ อัปเดตไม่สำเร็จ");
  }
};


const handleInputChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
    ...(name === "department_id" ? { section_id: "", task_id: "" } : {}),
    ...(name === "section_id" ? { task_id: "" } : {}),
  }));

  if (name === "department_id") fetchSections(value);
  if (name === "section_id") fetchTasks(value);
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
        fetchSections(value);
    } else if (name === "section_id") {
        fetchTasks(value);
    }
};



const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value,
  }));
};
  // จัดการการเพิ่มข้อมูลใหม่
  const handleAddUser = () => {
    if (!newUser.fullName || !newUser.department_id || !newUser.section_id || !newUser.task_id ||
        !newUser.phone || !newUser.email || !newUser.username || !newUser.password) {
        alert("❌ กรุณากรอกข้อมูลให้ครบทุกช่อง");
        return;
    }

    // หา department, section, task จาก ID ที่ถูกเลือก
    const department = departments.find(d => d.id.toString() === newUser.department_id);
    const section = sections.find(s => s.id.toString() === newUser.section_id);
    const task = tasks.find(t => t.id.toString() === newUser.task_id);

    if (!department || !section || !task) {
        alert("❌ กรุณาเลือกฝ่าย กอง และ งาน ให้ถูกต้อง");
        return;
    }

    console.log("📌 ส่งข้อมูลไป API:", {
        fullName: newUser.fullName,
        department_name: department.name,
        section_name: section.name,
        task_name: task.name,
        phone: newUser.phone,
        email: newUser.email,
        username: newUser.username,
        password: newUser.password,
    });

    axios.post("http://localhost:5001/api/users", {
        fullName: newUser.fullName,
        department_name: department.name,  // ✅ ส่งเป็นชื่อฝ่ายแทน ID
        section_name: section.name,
        task_name: task.name,
        phone: newUser.phone,
        email: newUser.email,
        username: newUser.username,
        password: newUser.password,
    })
    .then(response => {
        console.log("✅ เพิ่มข้อมูลสำเร็จ!", response.data);
        alert("✅ เพิ่มข้อมูลสำเร็จ!");
        setShowAddModal(false);
        fetchPersonnelData(); // โหลดข้อมูลใหม่
    })
    .catch(error => {
        console.error("❌ Error:", error.response?.data || error);
        alert("❌ เกิดข้อผิดพลาดในการเพิ่มข้อมูล!");
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
    for (const userId of selectedUsers) {
      const response = await axios.delete(`http://localhost:5001/api/users/${userId}`);

      if (response.status === 200) {
        console.log(`✅ ลบผู้ใช้ ID: ${userId} สำเร็จ`);
      } else {
        console.log(`❌ ลบผู้ใช้ ID: ${userId} ไม่สำเร็จ`, response.data);
      }
    }

    alert("✅ ลบข้อมูลสำเร็จ!");
    setSelectedUsers([]);
    await fetchPersonnelData();
  } catch (error) {
    console.error("❌ Error deleting users:", error);
    alert("❌ ไม่สามารถเชื่อมต่อ API ได้ กรุณาตรวจสอบเซิร์ฟเวอร์");
  }
};


const fetchPersonnelData = async () => {
  try {
    const response = await axios.get("http://localhost:5001/api/users");
    console.log("✅ โหลดข้อมูลใหม่:", response.data);
    setPersonnelData(response.data); // ✅ อัปเดต State
    setUsers(response.data); // ✅ อัปเดต users ด้วย
  } catch (error) {
    console.error("❌ Error fetching personnel data:", error);
  }
};


useEffect(() => {
  if (!showEditModal) {
    fetchPersonnelData(); // ✅ โหลดข้อมูลใหม่เมื่อ Modal ปิด
  }
}, [showEditModal]);


// ✅ ฟังก์ชันโหลดข้อมูลใหม่
const fetchPendingUsers = async () => {
  try {
    const response = await axios.get("http://localhost:5001/api/pending-users"); // ✅ ใช้ API ที่ถูกต้อง
    console.log("✅ Pending Users (Frontend):", response.data.users); // ✅ Debug ข้อมูล
    setPendingUsers(response.data.users);  // ✅ อัปเดต State
  } catch (error) {
    console.error("❌ Error fetching pending users:", error);
  }
};

// ✅ โหลด "รายการสมัครของบุคลากร" ตอนเปิดหน้าเว็บ
useEffect(() => {
  fetchPendingUsers();
}, []);


const fetchApprovedUsers = async () => {
  try {
    const response = await axios.get("http://localhost:5001/api/users");
    const approvedUsers = response.data.filter(user => user.status === "Approved"); // ✅ กรองเฉพาะที่อนุมัติแล้ว
    console.log("✅ Approved Users:", approvedUsers);
    setApprovedUsers(approvedUsers);
  } catch (error) {
    console.error("❌ Error fetching approved users:", error);
  }
};

// ✅ โหลด "ผู้ใช้ที่อนุมัติแล้ว" ตอนเปิดหน้าเว็บ
useEffect(() => {
  fetchApprovedUsers();
}, []);


useEffect(() => {
  const fetchApprovedUsers = async () => {
     try {
        const response = await axios.get("http://localhost:5001/api/users");
        console.log("✅ Approved Users (Frontend):", response.data);
        setUsers(Array.isArray(response.data) ? response.data : []); // ป้องกัน null
     } catch (error) {
        console.error("❌ Error fetching approved users:", error);
     }
  };

  fetchApprovedUsers();
}, []);


const handleApprove = async (userId) => {
  try {
      console.log("📌 Sending Approve Request for User ID:", userId);

      const response = await fetch(`http://localhost:5001/api/approve-user/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
      });

      console.log("📌 Approve API Response:", response);
      const textResponse = await response.text();
      console.log("📌 Raw Response:", textResponse);

      let data;
      try {
          data = JSON.parse(textResponse);
      } catch (jsonError) {
          console.error("❌ JSON Parse Error:", jsonError);
          alert("❌ เซิร์ฟเวอร์ส่งข้อมูลผิดรูปแบบ");
          return;
      }

      console.log("✅ Approve Response JSON:", data);

      if (data.success) {
          alert("✅ อนุมัติผู้ใช้สำเร็จ!");
          setShowModal(false);  // ปิด Modal ปัจจุบัน
          
          setTimeout(() => {
              setShowPendingModal(true); // เปิด Modal รายการสมัครหลังจากอนุมัติ
              fetchPendingUsers(); // โหลดข้อมูลใหม่
          }, 500);
      } else {
          alert(`❌ ${data.message}`);
      }
  } catch (error) {
      console.error("❌ Error approving user:", error);
      alert("❌ เกิดข้อผิดพลาดในการอนุมัติ");
  }
};

const handleReject = async (userId) => {
  console.log("📌 Rejecting User ID:", userId);

  if (!userId) {
    alert("❌ ไม่พบ ID ของผู้ใช้ที่ต้องการไม่อนุมัติ");
    return;
  }

  try {
    const response = await fetch(`http://localhost:5001/api/reject-user/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });

    const textResponse = await response.text();
    console.log("📌 Raw Reject Response:", textResponse);

    let data;
    try {
      data = JSON.parse(textResponse);
    } catch (jsonError) {
      console.error("❌ JSON Parse Error:", jsonError);
      alert("❌ เซิร์ฟเวอร์ส่งข้อมูลผิดรูปแบบ");
      return;
    }

    console.log("✅ Reject Response JSON:", data);

    if (data.success) {
      alert("✅ ไม่อนุมัติผู้ใช้สำเร็จ!");
      setShowModal(false); // ปิด Modal ปัจจุบัน

      setTimeout(() => {
          setShowPendingModal(true); // เปิด Modal รายการสมัครหลังจากไม่อนุมัติ
          fetchPendingUsers(); // โหลดข้อมูลใหม่
      }, 500);
      
    } else {
      alert(`❌ ${data.message}`);
    }
  } catch (error) {
    console.error("❌ Error rejecting user:", error);
    alert("❌ เกิดข้อผิดพลาดในการไม่อนุมัติผู้ใช้");
  }
};

useEffect(() => {
  axios.get("http://localhost:5001/api/users")
    .then(response => {
      console.log("✅ Users Data (Before Filter):", response.data);
      const approvedUsers = response.data.filter(user => user.status.toLowerCase() === "approved"); // ✅ กรองเฉพาะ Approved
      console.log("✅ Approved Users:", approvedUsers);
      setPersonnelData(approvedUsers); // ✅ อัปเดตเฉพาะที่อนุมัติแล้ว
    })
    .catch(error => console.error("❌ Error fetching approved users:", error));
}, []);


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

useEffect(() => {
  const fetchPendingCount = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/users/pending/count");
      const data = await response.json();
      setPendingCount(data.count);
    } catch (error) {
      console.error("❌ Error fetching pending count:", error);
    }
  };

  fetchPendingCount();

  // ตั้งค่าให้ดึงข้อมูลใหม่ทุก 10 วินาที (อัปเดตแบบเรียลไทม์)
  const interval = setInterval(fetchPendingCount, 10000);
  
  return () => clearInterval(interval); // ล้าง interval เมื่อ Component ถูก unmount
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
              <button className="btn btn-secondary relative px-4 py-2" 
                onClick={() => setShowPendingModal(true)}>
                <FontAwesomeIcon icon={faList} style={{ marginRight: "5px" }} />
                รายการสมัครของบุคลากร ({pendingCount})
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
        <td>{user.department_name || "ไม่ระบุ"}</td>
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
        e.target.onerror = null; // ป้องกัน error วนลูป
        e.target.src = "https://via.placeholder.com/120";
      }}
    />
  ) : (
    <div className="icon-placeholder">
      <FontAwesomeIcon icon={faCamera} className="profile-icon" />
      <p>ไม่มีรูปภาพ</p>
    </div>
  )}
</div>


        <div className="details-container">
          <div className="details-column">
            <p>
              <strong>ชื่อ - นามสกุล:</strong> {selectedUser.fullName}
            </p>
            <p>
              <strong>ชื่อฝ่าย/สำนัก:</strong> {selectedUser.department_name}
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
            <p>Password: {selectedUser.password}</p>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

{showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowEditModal(false)}>&times;</button>
            <h2>แก้ไขข้อมูลบุคลากร</h2>
            <label>ชื่อ - นามสกุล</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
            <label>ฝ่าย/สำนัก</label>
              <select name="department_id" value={formData.department_id} onChange={handleInputChange}>
                <option value="">เลือก</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
              <label>กอง</label>
              <select name="section_id" value={formData.section_id} onChange={handleInputChange} disabled={!formData.department_id}>
                <option value="">เลือก</option>
                {sections.map(section => (
                  <option key={section.id} value={section.id}>
                    {section.name}
                  </option>
                ))}
              </select>
              <label>งาน</label>
              <select name="task_id" value={formData.task_id} onChange={handleInputChange} disabled={!formData.section_id}>
                <option value="">เลือก</option>
                {tasks.map(task => (
                  <option key={task.id} value={task.id}>
                    {task.name}
                  </option>
                ))}
              </select>
            <label>เบอร์ภายใน</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} />

            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />

            <label>Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} />

            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />

            <div className="button-container">
              <button className="save-button" onClick={handleSaveEdit}>บันทึก</button>
              <button className="cancel-button" onClick={() => setShowEditModal(false)}>ยกเลิก</button>
            </div>
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
            {dept.name} {/* ✅ แสดงชื่อ แต่ส่ง ID */}
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
            {section.name} {/* ✅ แสดงชื่อ แต่ส่ง ID */}
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
            {task.name} {/* ✅ แสดงชื่อ แต่ส่ง ID */}
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
            <button className="close-btn" onClick={() => setShowPendingModal(false)}>&times;</button>
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
                {pendingUsers.length > 0 ? (
                  pendingUsers.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td><FontAwesomeIcon icon={faUserCircle} className="icon-profile" /></td>
                      <td>{user.department_name ? user.department_name : "ไม่ระบุ"}</td>
                      <td>
                        <button className="btn btn-view" onClick={() => handleViewDetails(user)}>
                          <FontAwesomeIcon icon={faEye} /> ดู
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">❌ ไม่มีรายการสมัคร</td>
                  </tr>
                )}
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

     {/* ✅ เช็คว่ามีรูปหรือไม่ */}
     <div className="profile-container">
       {selectedUser.image ? (
         <img
           src={selectedUser.image}
           alt="Profile"
           className="profile-image"
           onError={(e) => {
             e.target.onerror = null;
             e.target.src = "/assets/no-image.png"; // ✅ ใช้รูป default ถ้ารูปมีปัญหา
           }}
         />
       ) : (
         <div className="icon-placeholder">
           <FontAwesomeIcon icon={faUserCircle} className="profile-icon" />
           <p>ไม่มีรูปภาพ</p>
         </div>
       )}
     </div>

     <p><strong>ชื่อ:</strong> {selectedUser.fullName}</p>
     <p><strong>Email:</strong> {selectedUser.email}</p>
     <p><strong>เบอร์:</strong> {selectedUser.phone}</p>
     <p><strong>ฝ่าย:</strong> {selectedUser.department_name ? selectedUser.department_name : "ไม่ระบุ"}</p>
     <p><strong>กอง:</strong> {selectedUser.section_name ? selectedUser.section_name : "ไม่ระบุ"}</p>
     <p><strong>งาน:</strong> {selectedUser.task_name ? selectedUser.task_name : "ไม่ระบุ"}</p>

     <div className="action-buttons">
       <button className="btn btn-success" onClick={() => handleApprove(selectedUser.id)}>✅ อนุมัติ</button>
       <button className="btn btn-danger" onClick={() => handleReject(selectedUser.id)}>❌ ไม่อนุมัติ</button>
     </div>
   </div>
 </div>
)}


      </div>
      );
    };

export default Personnel;
