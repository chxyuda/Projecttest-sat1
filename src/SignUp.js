import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import userIcon from "./assets/icon1.png";
import axios from 'axios';

const SignUp = () => {
    const [departments, setDepartments] = useState([]);
    const [sections, setSections] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [image, setImage] = useState(null); // ✅ เพิ่ม state ที่ขาดหายไป
    const [previewImage, setPreviewImage] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [isSecretary, setIsSecretary] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        email: '',
        phone: '',
        department_id: '',
        section_id: '',
        task_id: '',
    });


    const [passwordMatch, setPasswordMatch] = useState(true);
    const navigate = useNavigate();


    // ✅ Fetch departments
    useEffect(() => {
        axios.get('http://localhost:5001/api/departments')
            .then(response => {
                setDepartments(response.data);
                console.log("✅ Departments Loaded:", response.data);
            })
            .catch(error => console.error('❌ Error fetching departments:', error));
    }, []);
    
    useEffect(() => {
        if (formData.department_id) {
            const selectedDepartment = departments.find(d => d.id == formData.department_id);
            if (selectedDepartment && selectedDepartment.type === "เลขา") {
                setIsSecretary(true);
                setFormData(prevState => ({
                    ...prevState,
                    section_id: "",
                    task_id: ""
                }));
                setSections([]);
                setTasks([]);
            } else {
                setIsSecretary(false);
                axios.get(`http://localhost:5001/api/sections/${formData.department_id}`)
                    .then(response => {
                        setSections(response.data);
                        console.log("✅ Sections Loaded:", response.data);
                    })
                    .catch(error => console.error('❌ Error loading sections:', error));
            }
        } else {
            setSections([]);
            setTasks([]);
        }
        console.log("🔥 isSecretary:", isSecretary);
    }, [formData.department_id]);
    
    
    useEffect(() => {
        if (formData.section_id) {
            axios.get(`http://localhost:5001/api/tasks/${formData.section_id}`)
                .then(response => {
                    setTasks(response.data);
                    console.log("✅ Tasks Loaded:", response.data);
                })
                .catch(error => console.error('❌ Error loading tasks:', error));
        } else {
            setTasks([]);
        }
    }, [formData.section_id]);

    useEffect(() => {
        setPasswordMatch(formData.password === formData.confirmPassword);
    }, [formData.password, formData.confirmPassword]);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
            ...(name === "department_id" && !isSecretary && { section_id: "", task_id: "" }),
            ...(name === "section_id" && { task_id: "" })
        }));

        if (name === "confirmPassword") {
            setPasswordMatch(value === formData.password);
        }
    };

    // ✅ อัปโหลดไฟล์รูปภาพ
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        const reader = new FileReader();
        reader.readAsDataURL(file);
    
        reader.onloadend = () => {
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
    
                const MAX_WIDTH = 800; // กำหนดขนาดกว้างสุดของภาพ
                const scaleSize = MAX_WIDTH / img.width;
                canvas.width = MAX_WIDTH;
                canvas.height = img.height * scaleSize;
    
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
                canvas.toBlob((blob) => {
                    const compressedFile = new File([blob], file.name, {
                        type: "image/jpeg",
                        lastModified: Date.now(),
                    });
    
                    setPreviewImage(URL.createObjectURL(blob)); // แสดง preview
                    setImage(compressedFile); // อัปเดต state ของรูปภาพ
                }, "image/jpeg", 0.7);  // ลดคุณภาพรูปเหลือ 70%
            };
        };
    };
    
    const validateForm = () => {
        if (!formData.username || !formData.password || !formData.confirmPassword || 
            !formData.fullName || !formData.email || !formData.phone || !formData.department_id) {
            alert("❌ กรุณากรอกข้อมูลให้ครบทุกช่อง!");
            return false;
        }
        if (!passwordMatch) {
            alert("❌ รหัสผ่านไม่ตรงกัน!");
            return false;
        }
        // ✅ ถ้าเป็นเลขา ให้ตั้งค่า section_id และ task_id เป็น "-"
        if (isSecretary) {
            formData.section_id = "-";
            formData.task_id = "-";
        } else if (!formData.section_id || !formData.task_id) {
            alert("❌ กรุณากรอกข้อมูลให้ครบทุกช่อง!");
            return false;
        }
        return true;
    };
    
    
    
    // ✅ Handle form submit
     // ✅ ส่งข้อมูลไป Backend
     const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateForm()) {
            return;
        }
    
        // ✅ Debug ข้อมูลก่อนส่งไป API
        console.log("🚀 Data before submitting:", formData);
    
        try {
            const response = await axios.post('http://localhost:5001/api/signup', formData);
            if (response.data.success) {
                alert('✅ สมัครสมาชิกสำเร็จ!');
                navigate('/');
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("❌ Signup Error:", error.response?.data?.message);
            alert(error.response?.data?.message || '❌ เกิดข้อผิดพลาด');
        }
    };
    
    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
    
        if (file) {
            setImage(file); // ✅ บันทึกไฟล์
            setFormData(prev => ({ ...prev, image: file })); // ✅ อัปเดต `formData`
    
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    

    return (
        <div className="signup-container">
            <div className="signup-box">
                <img src={userIcon} alt="User Icon" className="signup-icon" />
                <h1>Sign Up</h1>
                <div 
    className={`image-upload-container ${dragging ? "dragging" : ""}`} 
    onDragOver={handleDragOver}
    onDragLeave={handleDragLeave}
    onDrop={handleDrop}
>
    <input type="file" accept="image/*" onChange={handleImageChange} hidden id="fileUpload" />
    <label htmlFor="fileUpload" className="image-upload-box">
        {previewImage ? (
            <img src={previewImage} alt="Profile Preview" className="image-preview" />
        ) : (
            <div className="upload-placeholder">
                <FontAwesomeIcon icon={faCamera} className="camera-icon" />
            </div>
        )}
    </label>
</div>

<form onSubmit={handleSubmit}>
  <div className="signup-row">
    <div className="signup-form-group">
      <label>Username</label>
      <input type="text" name="username" placeholder="กรอก Username" onChange={handleInputChange} />
    </div>
    <div className="signup-form-group">
      <label>Password</label>
      <input type="password" name="password" placeholder="กรอกรหัสผ่าน" onChange={handleInputChange} />
    </div>
  </div>
  <div className="signup-form-group">
    <label>Confirm Password</label>
    <input type="password" name="confirmPassword" placeholder="ยืนยันรหัสผ่าน" onChange={handleInputChange} />
    {!passwordMatch && <small style={{ color: 'red' }}>รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน</small>}
  </div>
  <div className="signup-form-group">
    <label>ชื่อ-นามสกุล</label>
    <input type="text" name="fullName" placeholder="ชื่อ-นามสกุล" onChange={handleInputChange} />
  </div>
  <div className="signup-row">
    <div className="signup-form-group">
      <label>E-mail</label>
      <input type="email" name="email" placeholder="example@sat.th" onChange={handleInputChange} />
    </div>
    <div className="signup-form-group">
      <label>เบอร์โทรภายใน</label>
      <input type="text" name="phone" placeholder="เบอร์โทร" onChange={handleInputChange} />
    </div>
  </div>
  <div className="signup-row">
    <div className="signup-form-group">
      <label>ฝ่าย/สำนัก</label>
      <select name="department_id" value={formData.department_id} onChange={handleInputChange}>
        <option value="">เลือก</option>
        {departments.map(dept => <option key={dept.id} value={dept.id}>{dept.name}</option>)}
      </select>
    </div>
    <div className="signup-form-group">
      <label>กอง</label>
      <select name="section_id" value={formData.section_id} onChange={handleInputChange} disabled={!formData.department_id}>
        <option value="">เลือก</option>
        {sections.map(section => <option key={section.id} value={section.id}>{section.name}</option>)}
      </select>
    </div>
  </div>
  <div className="signup-form-group">
    <label>งาน</label>
    <select name="task_id" value={formData.task_id} onChange={handleInputChange} disabled={!formData.section_id}>
      <option value="">เลือก</option>
      {tasks.map(task => <option key={task.id} value={task.id}>{task.name}</option>)}
    </select>
  </div>
  <div className="button-container">
    <button type="button" className="back-button" onClick={() => navigate('/')}>
      <FontAwesomeIcon icon={faArrowLeft} /> กลับ
    </button>
    <button type="submit" className="signup-button" disabled={!passwordMatch}>Sign Up</button>
  </div>
</form>

            </div>
        </div>
    );
    };

export default SignUp;