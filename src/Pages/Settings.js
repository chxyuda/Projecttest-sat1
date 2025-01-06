import React, { useState, useEffect } from "react";
import ITDashboard from "./ITDashboard";
import "./Settings.css";
import axios from "axios";

const Settings = () => {
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  // Fetch data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/products");
      setData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id) // Uncheck
        : [...prevSelected, id] // Check
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedItems.length === 0) {
      alert("กรุณาเลือกอย่างน้อยหนึ่งรายการเพื่อลบ");
      return;
    }

    if (window.confirm("คุณต้องการลบข้อมูลที่เลือกไว้หรือไม่?")) {
      try {
        await Promise.all(
          selectedItems.map((id) =>
            axios.delete(`http://localhost:5001/api/products/${id}`)
          )
        );
        setData(data.filter((item) => !selectedItems.includes(item.id)));
        setSelectedItems([]);
        alert("ลบข้อมูลสำเร็จ");
      } catch (error) {
        console.error("Error deleting selected items:", error);
        alert("เกิดข้อผิดพลาดในการลบข้อมูล");
      }
    }
  };

  return (
    <div>
      <ITDashboard />
      <div className="settings-container">
        <h1>การตั้งค่า</h1>
        <div className="actions">
          <button
            onClick={handleDeleteSelected}
            className="delete-selected-btn"
          >
            ลบรายการที่เลือก
          </button>
        </div>
        <table className="settings-table">
          <thead>
            <tr>
              <th>เลือก</th>
              <th>วัสดุ</th>
              <th>หมายเลขครุภัณฑ์</th>
              <th>ประเภท</th>
              <th>อุปกรณ์</th>
              <th>ยี่ห้อ</th>
              <th>จำนวน</th>
              <th>คงเหลือ</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                </td>
                <td>{item.material}</td>
                <td>{item.serial_number || "-"}</td>
                <td>{item.category}</td>
                <td>{item.equipment}</td>
                <td>{item.brand}</td>
                <td>{item.quantity}</td>
                <td>{item.remaining}</td>
                <td>
                  <button className="edit-btn">แก้ไข</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Settings;
