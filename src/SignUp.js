import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import userIcon from "./assets/icon1.png";
import axios from 'axios';

const SignUp = () => {
    const [departments, setDepartments] = useState([]);
    const [sections, setSections] = useState([]);
    const [tasks, setTasks] = useState([]);
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
            axios.get(`http://localhost:5001/api/sections/${formData.department_id}`)
                .then(response => {
                    setSections(response.data);
                    console.log("✅ Sections Loaded:", response.data);
                })
                .catch(error => console.error('❌ Error loading sections:', error));
        } else {
            setSections([]);
        }
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
    

    // ✅ Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
            ...(name === "department_id" && { section_id: "", task_id: "" }),
            ...(name === "section_id" && { task_id: "" })
        }));
    
        console.log(`🔄 อัปเดตค่า ${name}:`, value); // Debug ทุกครั้งที่เปลี่ยนค่า
    };
    

    // ✅ Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("📤 Form Data ก่อนส่งไป Backend:", formData); // Debug ดูค่าทั้งหมดที่ส่งไป
        
        const selectedDepartment = departments.find(d => d.id === formData.department_id);
        const selectedSection = sections.find(s => s.id === formData.section_id);
        const selectedTask = tasks.find(t => t.id === formData.task_id);
    
        const userData = {
            username: formData.username,
            password: formData.password,
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            department_name: selectedDepartment ? selectedDepartment.name : "", // เปลี่ยน ID เป็นชื่อ
            section_name: selectedSection ? selectedSection.name : "",
            task_name: selectedTask ? selectedTask.name : ""
        };
    
        console.log("✅ ข้อมูลที่กำลังส่งไป Backend:", userData); // Debug
    
        // เช็คว่ามีข้อมูลที่เป็นค่าว่างไหม
        for (const [key, value] of Object.entries(userData)) {
            if (!value) {
                console.error(`❌ ค่าที่ขาด: ${key}`);
            }
        }
    
        if (!userData.username || !userData.password || !userData.fullName || 
            !userData.email || !userData.phone || !userData.department_name || 
            !userData.section_name || !userData.task_name) {
            alert('❌ ข้อมูลไม่ครบ: ตรวจสอบอีกครั้ง');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:5001/api/signup', userData, {
                headers: { "Content-Type": "application/json" }
            });
    
            if (response.data.success) {
                alert('✅ สมัครสมาชิกสำเร็จ! กรุณารอ IT อนุมัติบัญชีของคุณ');
                navigate('/');
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("❌ Signup Error:", error.response?.data?.message);
            alert(error.response?.data?.message || '❌ เกิดข้อผิดพลาดในการสมัครสมาชิก');
        }
    };
    
    
    return (
        <div className="signup-container">
            <div className="signup-box">
                <img src={userIcon} alt="User Icon" className="signup-icon" />
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" name="username" placeholder="กรอก Username" onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" placeholder="กรอกรหัสผ่าน" onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" name="confirmPassword" placeholder="ยืนยันรหัสผ่าน" onChange={handleInputChange} />
                        {!passwordMatch && <small style={{ color: 'red' }}>รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน</small>}
                    </div>
                    <div className="form-group">
                        <label>ชื่อ-นามสกุล</label>
                        <input type="text" name="fullName" placeholder="ชื่อ-นามสกุล" onChange={handleInputChange} />
                    </div>
                    <div className="row">
                        <div>
                            <label>E-mail</label>
                            <input type="email" name="email" placeholder="example@sat.th" onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>เบอร์โทรภายใน</label>
                            <input type="text" name="phone" placeholder="เบอร์โทร" onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            <label>ฝ่าย/สำนัก</label>
                            <select name="department_id" value={formData.department_id} onChange={handleInputChange}>
                                <option value="">เลือก</option>
                                {departments.map(dept => <option key={dept.id} value={dept.id}>{dept.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label>กอง</label>
                            <select name="section_id" value={formData.section_id} onChange={handleInputChange} disabled={!formData.department_id}>
                                <option value="">เลือก</option>
                                {sections.map(section => <option key={section.id} value={section.id}>{section.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>งาน</label>
                        <select name="task_id" value={formData.task_id} onChange={handleInputChange} disabled={!formData.section_id}>
                            <option value="">เลือก</option>
                            {tasks.map(task => <option key={task.id} value={task.id}>{task.name}</option>)}
                        </select>
                    </div>
                    <button type="submit" disabled={!passwordMatch}>Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
