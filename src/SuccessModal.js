import React from 'react';
import './SuccessModal.css';
import { useNavigate } from 'react-router-dom'; // ใช้ useNavigate สำหรับการเปลี่ยนเส้นทาง

const SuccessModal = ({ message }) => {
    const navigate = useNavigate(); // ใช้งาน useNavigate

    const handleClose = () => {
        navigate('/'); // เปลี่ยนเส้นทางไปยังหน้า Login
    };

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <button className="close-button" onClick={handleClose}>
                    ✖
                </button>
                <div className="modal-content">
                    <p>{message}</p>
                    <div className="success-icon">✔</div>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;
