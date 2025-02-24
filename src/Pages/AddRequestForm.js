import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./AddRequestForm.css"; // ✅ เปลี่ยนชื่อไฟล์ CSS ให้ตรงกับคลาสใหม่

const AddRequestForm = ({ onSubmit }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        borrower_name: "",
        department: "",
        phone: "",
        email: "",
        material: "",
        category: "",
        equipment: "",
        brand: "",
        quantity_requested: 1,
        note: "",
        date_requested: new Date().toISOString().split("T")[0],
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleCancel = () => {
        navigate("/request"); // ✅ กลับไปหน้าคำขอเบิก
    };

    return (
        <div className="form-overlay"> {/* ✅ เปลี่ยนชื่อคลาส */}
            <div className="form-container"> {/* ✅ เปลี่ยนชื่อคลาส */}
                <h2 className="form-title">เพิ่มคำขอใหม่</h2> {/* ✅ เปลี่ยนชื่อคลาส */}
                <form onSubmit={handleSubmit}>
                    <div className="form-grid"> {/* ✅ เปลี่ยนชื่อคลาส */}
                        <div className="input-group"> 
                            <label>ชื่อผู้ขอ:</label>
                            <input type="text" name="borrower_name" value={formData.borrower_name} onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>ฝ่าย/สำนัก:</label>
                            <input type="text" name="department" value={formData.department} onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>โทรศัพท์:</label>
                            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>อีเมล:</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>ชื่อ:</label>
                            <input type="text" name="material" value={formData.material} onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>ประเภท:</label>
                            <input type="text" name="category" value={formData.category} onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>อุปกรณ์:</label>
                            <input type="text" name="equipment" value={formData.equipment} onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>ยี่ห้อ:</label>
                            <input type="text" name="brand" value={formData.brand} onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>จำนวน:</label>
                            <input type="number" name="quantity_requested" value={formData.quantity_requested} onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>หมายเหตุ:</label>
                            <textarea name="note" value={formData.note} onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label>วันที่ขอ:</label>
                            <input type="date" name="date_requested" value={formData.date_requested} onChange={handleChange} required />
                        </div>
                    </div>

                    {/* ✅ ปุ่มบันทึกและยกเลิก */}
                    <div className="form-buttons">
                        <button type="submit" className="form-submit">บันทึก</button>
                        <button type="button" className="form-cancel" onClick={handleCancel}>ยกเลิก</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddRequestForm;
