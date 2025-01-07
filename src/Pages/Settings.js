import React, { useState, useEffect } from "react";
import ITDashboard from "./ITDashboard";
import "./Settings.css";
import axios from "axios";

const Settings = () => {
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // เก็บ index ของแถวที่กำลังแก้ไข
  const [editedItem, setEditedItem] = useState({}); // เก็บข้อมูลที่กำลังแก้ไข
  const [showModal, setShowModal] = useState(false); // ควบคุมการแสดง Modal
  const [categories, setCategories] = useState([]); // เก็บข้อมูลประเภท
  const [newCategory, setNewCategory] = useState(""); // สำหรับเพิ่มประเภทใหม่

  console.log("Selected Items:", selectedItems);
  

  useEffect(() => {
    console.log("Selected Items:", selectedItems); // แสดงผล selectedItems ทุกครั้งที่มีการเปลี่ยนแปลง
  }, [selectedItems]);
  
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/products");
      setData(response.data.data || []);
      setSelectedItems([]); // รีเซ็ต selectedItems เมื่อดึงข้อมูลใหม่
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/categories");
      console.log("Categories data:", response.data);
      setCategories(response.data.data || []);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching categories:", error);
      alert("ไม่สามารถดึงข้อมูลประเภทได้");
    }
  };
  

  const handleCheckboxChange = (index) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((itemIndex) => itemIndex !== index) // ลบออกถ้าเลือกอยู่แล้ว
        : [...prevSelected, index] // เพิ่ม index เข้าไป
    );
  };
  
  const handleEditClick = (index, item) => {
    setEditingIndex(index); // ตั้ง index ของแถวที่แก้ไข
    setEditedItem(item); // คัดลอกข้อมูลในแถวนั้นมาแก้ไข
  };

  const handleInputChange = (field, value) => {
    setEditedItem((prev) => ({ ...prev, [field]: value })); // อัปเดตฟิลด์ที่แก้ไข
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5001/api/products/${editedItem.id}`, editedItem);
      setData((prevData) =>
        prevData.map((item, index) =>
          index === editingIndex ? editedItem : item
        )
      );
      setEditingIndex(null);
      setEditedItem({});
      alert("บันทึกข้อมูลสำเร็จ");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditedItem({});
  };

  const handleDeleteSelected = async () => {
    if (selectedItems.length === 0) {
      alert("กรุณาเลือกอย่างน้อยหนึ่งรายการเพื่อลบ");
      return;
    }

    if (window.confirm("คุณต้องการลบรายการที่เลือกหรือไม่?")) {
      try {
        await axios.post("http://localhost:5001/api/products/delete", {
          ids: selectedItems,
        });

        setData((prevData) =>
          prevData.filter((item) => !selectedItems.includes(item.id))
        );
        setSelectedItems([]);
        alert("ลบข้อมูลสำเร็จ");
      } catch (error) {
        console.error("Error deleting selected items:", error);
        alert("เกิดข้อผิดพลาดในการลบข้อมูล");
      }
    }
  };

  const handleShowModal = async () => {
  try {
    const response = await axios.get("http://localhost:5001/api/categories");
    console.log("Categories data:", response.data); // ตรวจสอบข้อมูล
    setCategories(response.data.data || []);
    setShowModal(true); //
    console.log("Modal state set to:", showModal);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      alert("กรุณากรอกชื่อประเภทใหม่");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5001/api/categories", {
        name: newCategory,
      });
      setCategories([...categories, { id: response.data.id, name: newCategory }]);
      setNewCategory("");
      alert("เพิ่มประเภทสำเร็จ");
    } catch (error) {
      console.error("Error adding category:", error);
      alert("เกิดข้อผิดพลาดในการเพิ่มประเภท");
    }
  };
  
  const handleEditCategory = async (id, updatedName) => {
    if (!updatedName.trim()) {
      alert("ชื่อประเภทไม่สามารถว่างได้");
      return;
    }
    try {
      await axios.put(`http://localhost:5001/api/categories/${id}`, { name: updatedName });
      setCategories((prev) =>
        prev.map((cat) => (cat.id === id ? { ...cat, name: updatedName } : cat))
      );
      alert("แก้ไขประเภทสำเร็จ");
    } catch (error) {
      console.error("Error editing category:", error);
      alert("เกิดข้อผิดพลาดในการแก้ไขประเภท");
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("คุณต้องการลบประเภทนี้หรือไม่?")) {
      try {
        await axios.delete(`http://localhost:5001/api/categories/${id}`);
        setCategories((prev) => prev.filter((cat) => cat.id !== id));
        alert("ลบประเภทสำเร็จ");
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("เกิดข้อผิดพลาดในการลบประเภท");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div>
      <ITDashboard />
      <div className="settings-container">
        <h1>การตั้งค่า</h1>
        <div className="settings-actions">
        <button className="delete-selected-btn" onClick={handleDeleteSelected}>
          ลบรายการที่เลือก
        </button>
          <button className="custom-btn" onClick={() => handleEditClick("category")}>
            <span className="custom-btn-icon">🖉</span> ประเภท
          </button>
          <button className="custom-btn" onClick={() => handleEditClick("product")}>
            <span className="custom-btn-icon">🖉</span> อุปกรณ์
          </button>
          <button className="custom-btn" onClick={() => handleEditClick("brand")}>
            <span className="custom-btn-icon">🖉</span> ยี่ห้อ
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
            <th>รายละเอียด</th> 
            <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => ( // เพิ่ม index ใน map
              <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(index)} // ใช้ index ในการเช็ค
                  onChange={() => handleCheckboxChange(index)} // ใช้ index สำหรับการเปลี่ยนสถานะ
                />
              </td>
              <td>{item.material}</td>
              <td>{item.serial_number || "-"}</td>
              <td>{item.category}</td>
              <td>{item.equipment}</td>
              <td>{item.brand}</td>
              <td>{item.quantity}</td>
              <td>--</td>
              <td>{item.details || "ไม่มีรายละเอียด"}</td> {/* เพิ่มการแสดงผล */}
              <td>
                <button className="edit-btn">แก้ไข</button> {/* ปุ่มจัดการ */}
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>รายละเอียดประเภท</h2>
            <button className="close-btn" onClick={handleCloseModal}>
              X
            </button>
            <div>
              <input
                type="text"
                value={newCategory}
                placeholder="เพิ่มประเภทใหม่"
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <button onClick={handleAddCategory}>เพิ่ม</button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ลำดับ</th>
                  <th>ชื่อประเภท</th>
                  <th>จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={category.id}>
                    <td>{index + 1}</td>
                    <td>
                      <input
                        type="text"
                        defaultValue={category.name}
                        onBlur={(e) =>
                          handleEditCategory(category.id, e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          handleEditCategory(category.id, category.name)
                        }
                      >
                        แก้ไข
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        ลบ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
