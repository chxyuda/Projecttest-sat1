import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Inventory.css";
import ITDashboard from "./ITDashboard"; // นำเข้า ITDashboard

const Inventory = () => {
  const [data, setData] = useState([]); // เก็บข้อมูลสินค้าจากฐานข้อมูล
  const [filteredData, setFilteredData] = useState([]); // ข้อมูลหลังการกรอง
  const [category, setCategory] = useState("all");
  const [device, setDevice] = useState("all");
  const [brand, setBrand] = useState("all");

  // ดึงข้อมูลสินค้าจากฐานข้อมูลเมื่อโหลดหน้าเว็บ
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/products");
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // ฟังก์ชันกรองข้อมูล
  const handleFilter = () => {
    let filtered = data;

    if (category !== "all") {
      filtered = filtered.filter((item) => item.category === category);
    }
    if (device !== "all") {
      filtered = filtered.filter((item) => item.device === device);
    }
    if (brand !== "all") {
      filtered = filtered.filter((item) => item.brand === brand);
    }

    setFilteredData(filtered);
  };

  return (
    <div>
      {/* เรียกใช้ ITDashboard */}
      <ITDashboard />

      {/* เนื้อหาของหน้าคลังวัสดุ */}
      <div className="inventory-container">
        <h2 style={{ marginBottom: "20px" }}>คลังวัสดุ/ รายการ</h2>

        {/* ส่วนกรองข้อมูล */}
        <div className="filter-section">
          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="all">ประเภททั้งหมด</option>
            <option value="หมึก">หมึก</option>
            <option value="อุปกรณ์">อุปกรณ์</option>
          </select>
          <select onChange={(e) => setDevice(e.target.value)}>
            <option value="all">อุปกรณ์ทั้งหมด</option>
            <option value="คอมพิวเตอร์">คอมพิวเตอร์</option>
            <option value="ปริ้นเตอร์">ปริ้นเตอร์</option>
          </select>
          <select onChange={(e) => setBrand(e.target.value)}>
            <option value="all">ยี่ห้อทั้งหมด</option>
            <option value="HP">HP</option>
            <option value="Canon">Canon</option>
          </select>
          <button onClick={handleFilter}>ค้นหา</button>
        </div>

        {/* ตารางแสดงข้อมูล */}
        <table className="inventory-table">
          <thead>
            <tr>
              <th>ชื่อสินค้า</th>
              <th>หมายเลขครุภัณฑ์</th>
              <th>ประเภท</th>
              <th>อุปกรณ์</th>
              <th>ยี่ห้อ</th>
              <th>จำนวน</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.asset_number}</td>
                <td>{item.category}</td>
                <td>{item.device}</td>
                <td>{item.brand}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
