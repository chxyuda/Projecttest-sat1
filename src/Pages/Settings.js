import React, { useState, useEffect } from "react";
import ITDashboard from "./ITDashboard";
import "./Settings.css";
import axios from "axios";

const Settings = () => {
  const [data, setData] = useState([]);
  const [modalType, setModalType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ดึงข้อมูลสำหรับตารางหลัก
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("/api/inventory")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleEdit = (id, field, value) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSave = (id) => {
    const item = data.find((item) => item.id === id);
    axios
      .put(`/api/inventory/${id}`, item)
      .then(() => fetchData())
      .catch((error) => console.error("Error saving data:", error));
  };

  const handleDelete = (id) => {
    if (window.confirm("คุณต้องการลบข้อมูลนี้หรือไม่?")) {
      axios
        .delete(`/api/inventory/${id}`)
        .then(() => fetchData())
        .catch((error) => console.error("Error deleting data:", error));
    }
  };

  const handleAdd = () => {
    const newItem = {
      material: "",
      serialNumber: "",
      category: "",
      equipment: "",
      brand: "",
      quantity: 0,
      remaining: 0,
      status: "",
    };
    setData([newItem, ...data]);
  };

  const handleManageClick = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <div>
      <ITDashboard />
      <h1>การตั้งค่า</h1>
      <div className="settings-actions">
        <button onClick={() => handleManageClick("category")}>ประเภท</button>
        <button onClick={() => handleManageClick("equipment")}>อุปกรณ์</button>
        <button onClick={() => handleManageClick("brand")}>ยี่ห้อ</button>
      </div>
      <button className="add-btn" onClick={handleAdd}>เพิ่มข้อมูลใหม่</button>
      <table className="settings-table">
        <thead>
          <tr>
            <th>ลบ</th>
            <th>วัสดุ</th>
            <th>หมายเลขครุภัณฑ์</th>
            <th>ประเภท</th>
            <th>อุปกรณ์</th>
            <th>ยี่ห้อ</th>
            <th>จำนวน</th>
            <th>คงเหลือ</th>
            <th>สถานะ</th>
            <th>บันทึก</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>
                <button onClick={() => handleDelete(item.id)}>ลบ</button>
              </td>
              {Object.keys(item).map((key) =>
                key !== "id" ? (
                  <td key={key}>
                    <input
                      type="text"
                      value={item[key]}
                      onChange={(e) => handleEdit(item.id, key, e.target.value)}
                    />
                  </td>
                ) : null
              )}
              <td>
                <button onClick={() => handleSave(item.id)}>บันทึก</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ManageModal
        type={modalType}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

const ManageModal = ({ type, isOpen, onClose }) => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    if (isOpen) {
      axios
        .get(`/api/${type}`)
        .then((response) => setItems(response.data))
        .catch((error) => console.error("Error fetching modal data:", error));
    }
  }, [type, isOpen]);

  const handleAdd = () => {
    axios
      .post(`/api/${type}`, { name: newItem })
      .then(() => {
        setItems([...items, { id: Date.now(), name: newItem }]);
        setNewItem("");
      })
      .catch((error) => console.error("Error adding item:", error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`/api/${type}/${id}`)
      .then(() => setItems(items.filter((item) => item.id !== id)))
      .catch((error) => console.error("Error deleting item:", error));
  };

  return isOpen ? (
    <div className="modal">
      <div className="modal-content">
        <h2>จัดการ {type}</h2>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name}
              <button onClick={() => handleDelete(item.id)}>ลบ</button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder={`เพิ่ม ${type}`}
        />
        <button onClick={handleAdd}>เพิ่ม</button>
        <button onClick={onClose}>ปิด</button>
      </div>
    </div>
  ) : null;
};

export default Settings;
