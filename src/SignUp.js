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
        fullName: '',
        email: '',
        phone: '',
        departmentId: '',
        sectionId: '',
        taskId: '',
    });
    const navigate = useNavigate();

    // Fetch departments
    useEffect(() => {
        axios.get('http://localhost:5001/api/departments')
            .then(response => {
                console.log(response.data);
                setDepartments(response.data);
            })
            .catch(error => console.error('Error fetching departments:', error));
    }, []);
    
    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle department change
    const handleDepartmentChange = (e) => {
        const departmentId = e.target.value;
        setFormData({ ...formData, departmentId, sectionId: '', taskId: '' });
        setSections([]);
        setTasks([]);
        axios.get(`http://localhost:5001/api/sections/${departmentId}`)
            .then(response => {
                console.log('Sections fetched:', response.data); // ตรวจสอบข้อมูลกอง
                setSections(response.data);
            })
            .catch(error => console.error('Error fetching sections:', error));
    };
    
    const handleSectionChange = (e) => {
        const sectionId = e.target.value;
        setFormData({ ...formData, sectionId, taskId: '' });
        setTasks([]);
        axios.get(`http://localhost:5001/api/tasks/${sectionId}`)
            .then(response => {
                console.log('Tasks fetched:', response.data); // ตรวจสอบข้อมูลงาน
                setTasks(response.data);
            })
            .catch(error => console.error('Error fetching tasks:', error));
    };
    
    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // ตรวจสอบว่าข้อมูลทุกช่องกรอกครบ
        const { username, password, fullName, email, phone, departmentId, sectionId, taskId } = formData;
        if (!username || !password || !fullName || !email || !phone || !departmentId || !sectionId || !taskId) {
            alert('กรุณากรอกข้อมูลให้ครบถ้วนทุกช่อง');
            return;
        }

        // ส่งข้อมูลไปยังเซิร์ฟเวอร์หากข้อมูลครบถ้วน
        axios.post('http://localhost:5001/api/signup', formData)
            .then(() => {
                alert('สมัครสมาชิกสำเร็จ');
                navigate('/');
            })
            .catch((error) => {
                console.error('Error during signup:', error);
                alert('เกิดข้อผิดพลาดในการสมัครสมาชิก');
            });
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
                            <input type="text" name="username" placeholder="Enter Username" onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" placeholder="Enter Password" onChange={handleInputChange} />
                        </div>
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
                            <select name="departmentId" onChange={handleDepartmentChange}>
                                <option value="">เลือก</option>
                                {departments.map(dept => (
                                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>กอง</label>
                            <select name="sectionId" onChange={handleSectionChange}>
                                <option value="">เลือก</option>
                                {sections.map(section => (
                                    <option key={section.id} value={section.id}>{section.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>งาน</label>
                        <select name="taskId" onChange={handleInputChange}>
                            <option value="">เลือก</option>
                            {tasks.map(task => (
                                <option key={task.id} value={task.id}>{task.name}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
