import React, { useState, useEffect } from "react";
import ITDashboard from "./ITDashboard";
import "./Settings.css";
import axios from "axios";

const Settings = () => {
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [newCategoryType, setNewCategoryType] = useState("3"); // สำหรับชนิดประเภท
  const [editingIndex, setEditingIndex] = useState(null); // เก็บ index ของแถวที่กำลังแก้ไข
  const [editedItem, setEditedItem] = useState({}); // เก็บข้อมูลที่กำลังแก้ไข
  const [showModal, setShowModal] = useState(false); // ควบคุมการแสดง Modal
  const [categories, setCategories] = useState([]); // เก็บข้อมูลประเภท
  const [newCategory, setNewCategory] = useState(""); // สำหรับเพิ่มประเภทใหม่
  const [editingRow, setEditingRow] = useState(null); // เก็บ id ของแถวที่กำลังแก้ไข
  const [equipments, setEquipments] = useState([]); // จัดเก็บข้อมูลอุปกรณ์
  const [newEquipment, setNewEquipment] = useState(" "); // สำหรับเพิ่มอุปกรณ์ใหม่
  const [editingEquipmentRow, setEditingEquipmentRow] = useState(null); // เก็บ index ของแถวที่กำลังแก้ไข
  const [showEquipmentsModal, setShowEquipmentsModal] = useState(false); // สำหรับเปิด/ปิด Modal
  const [editingBrandName, setEditingBrandName] = useState("37"); // สำหรับชื่อยี่ห้อ
  const [editingBrandIndex, setEditingBrandIndex] = useState(null); // สำหรับ index ที่กำลังแก้ไข
  const [newBrand, setNewBrand] = useState(""); // State สำหรับจัดเก็บค่าชื่อยี่ห้อใหม่
  const [brands, setBrands] = useState([]); // State สำหรับจัดเก็บรายชื่อยี่ห้อทั้งหมด  
  const [showBrandModal, setShowBrandModal] = useState(false); // ควบคุมการแสดงผล Modal
  const [selectedCategory, setSelectedCategory] = useState(""); // State สำหรับเก็บประเภทที่เลือก
  const [newCategoryName, setNewCategoryName] = useState(""); // สำหรับเก็บชื่อประเภทใหม่
  const [newModel, setNewModel] = useState(""); // เพิ่มตัวแปร state
  const [editingBrandId, setEditingBrandId] = useState(null);



  console.log("Selected Items:", selectedItems);
  console.log({ newModel, newEquipment });
  console.log("Name being sent:", newBrand);
  console.log("Editing Brand Name:", editingBrandName);
  console.log("Brand Name Being Sent:", editingBrandName);


  

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
    if (!newCategoryName.trim()) { // ตรวจสอบว่ามีการกรอกชื่อหรือไม่
      alert("กรุณากรอกชื่อประเภท");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5001/api/categories", {
        name: newCategoryName, // ส่งชื่อประเภทไปยัง API
        type: newCategoryType || "ประเภททั่วไป", // หากไม่มีชนิด ให้ตั้งค่าเริ่มต้น
      });
      if (response.data.success) {
        alert("เพิ่มประเภทใหม่เรียบร้อย");
        fetchCategories(); // เรียกข้อมูลใหม่หลังเพิ่ม
        setNewCategoryName(""); // ล้างค่าชื่อประเภทหลังจากเพิ่มสำเร็จ
      } else {
        alert(response.data.message || "เกิดข้อผิดพลาดในการเพิ่มประเภท");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      alert("เกิดข้อผิดพลาดในการเพิ่มประเภท");
    }
  };
  
  const handleDeleteCategory = async (id) => {
    if (window.confirm("คุณต้องการลบประเภทนี้หรือไม่?")) {
      try {
        const response = await axios.delete(`http://localhost:5001/api/categories/${id}`);
        if (response.data.success) {
          alert("ลบประเภทเรียบร้อย");
          fetchCategories(); // อัปเดตข้อมูลใหม่
        }
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("เกิดข้อผิดพลาดในการลบประเภท");
      }
    }
  };
  
  const handleSaveCategory = (index, updatedName) => {
    if (!updatedName.trim()) {
      alert("ชื่อประเภทไม่สามารถว่างได้");
      return;
    }
    const updatedCategories = [...categories];
    updatedCategories[index].category_name = updatedName; // อัปเดต category_name ของ index ที่ระบุ
    setCategories(updatedCategories); // อัปเดต state
    setEditingRow(null); // ออกจากโหมดแก้ไข
    alert("แก้ไขประเภทสำเร็จ");
  };
  
  const handleEditCategory = async (id, updatedName, updatedType) => {
    if (!updatedName) {
      alert("กรุณากรอกชื่อประเภท");
      return;
    }
  
    try {
      const response = await axios.put(`http://localhost:5001/api/categories/${id}`, {
        name: updatedName,
        type: updatedType || "ประเภททั่วไป",
      });
      if (response.data.success) {
        alert("แก้ไขประเภทเรียบร้อย");
        fetchCategories(); // อัปเดตข้อมูลใหม่
      }
    } catch (error) {
      console.error("Error updating category:", error);
      alert("เกิดข้อผิดพลาดในการแก้ไขประเภท");
    }
  };
  
  
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/categories");
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/products");
        setEquipments(response.data.data || []);
      } catch (error) {
        console.error("Error fetching equipments:", error);
      }
    };
    fetchEquipments();
  }, []);
  
  useEffect(() => {
    fetchEquipments(); // ดึงข้อมูลอุปกรณ์เมื่อเริ่มต้น
  }, []);

  
  const fetchEquipments = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/products");
      if (response.data.success) {
        // ใช้ Set เพื่อลดข้อมูลซ้ำตามชื่ออุปกรณ์
        const uniqueEquipments = response.data.data.filter(
          (item, index, self) =>
            index ===
            self.findIndex((t) => t.equipment === item.equipment)
        );
        setEquipments(uniqueEquipments);
      }
    } catch (error) {
      console.error("Error fetching equipment data:", error);
    }
  };
  
  // เรียกใช้ fetchEquipments เมื่อ Component ถูกสร้าง


  // ฟังก์ชันเปิด Modal
  const handleShowEquipmentsModal = () => {
    setShowEquipmentsModal(true);
  };

  // ฟังก์ชันปิด Modal
  const closeEquipmentsModal = () => {
    setShowEquipmentsModal(false);
  };

  const handleEditEquipment = (index) => {
    setEditingEquipmentRow(index); // ตั้งค่า row ที่กำลังแก้ไข
    setNewEquipment(equipments[index]?.equipment || ""); // ตั้งค่าชื่ออุปกรณ์ที่จะแก้ไข
  };
  

  // ฟังก์ชันเพิ่มอุปกรณ์ใหม่
  const handleAddEquipment = async () => {
    if (!newEquipment.trim()) {
      alert("กรุณากรอกชื่ออุปกรณ์");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5001/api/products", {
        name: newEquipment,
        model: newModel || "รุ่นทั่วไป", // ใช้ newModel ถ้ามี หรือค่าดีฟอลต์
      });
  
      if (response.data.success) {
        alert("เพิ่มอุปกรณ์สำเร็จ");
        fetchEquipments(); // โหลดข้อมูลใหม่
        setNewEquipment(""); // รีเซ็ตค่า
        setNewModel(""); // รีเซ็ตค่า
      } else {
        alert(response.data.message || "เกิดข้อผิดพลาดในการเพิ่มอุปกรณ์");
      }
    } catch (error) {
      console.error("Error adding equipment:", error);
      alert("เกิดข้อผิดพลาดในการเพิ่มอุปกรณ์");
    }
  };
   
  // ฟังก์ชันแก้ไขข้อมูลอุปกรณ์
  const handleCancelEditEquipment = () => {
    setEditingEquipmentRow(null); // ออกจากโหมดแก้ไข
    setNewEquipment(""); // รีเซ็ตค่าที่แก้ไข
  };
  
  
  // ฟังก์ชันบันทึกการแก้ไข
  const handleSaveEquipment = async (index) => {
    if (!newEquipment.trim()) {
      alert("ชื่ออุปกรณ์ไม่สามารถเว้นว่างได้");
      return;
    }
  
    const updatedEquipments = [...equipments];
    updatedEquipments[index].equipment = newEquipment;
  
    try {
      const response = await axios.put(
        `http://localhost:5001/api/products/${updatedEquipments[index].id}`,
        { name: newEquipment }
      );
  
      if (response.data.success) {
        setEquipments(updatedEquipments); // อัปเดตข้อมูลใหม่ใน state
        setEditingEquipmentRow(null); // ออกจากโหมดแก้ไข
        setNewEquipment(""); // รีเซ็ตค่า
        alert("แก้ไขข้อมูลอุปกรณ์สำเร็จ");
      }
    } catch (error) {
      console.error("Error saving equipment:", error);
      alert("เกิดข้อผิดพลาดในการแก้ไขข้อมูลอุปกรณ์");
    }
  };
  
  // ฟังก์ชันลบอุปกรณ์
  const handleDeleteEquipment = async (index) => {
    if (window.confirm("คุณต้องการลบอุปกรณ์นี้หรือไม่?")) {
      const equipmentId = equipments[index]?.id;
  
      try {
        const response = await axios.post("http://localhost:5001/api/products/delete", {
          ids: [equipmentId], // ส่ง id ที่ต้องการลบ
        });
  
        if (response.data.success) {
          const updatedEquipments = equipments.filter((_, i) => i !== index);
          setEquipments(updatedEquipments);
          alert("ลบข้อมูลอุปกรณ์สำเร็จ");
        }
      } catch (error) {
        console.error("Error deleting equipment:", error);
        alert("เกิดข้อผิดพลาดในการลบข้อมูลอุปกรณ์");
      }
    }
  };

  const getUniqueEquipments = (data) => {
    const uniqueEquipments = [];
    const seen = new Set();
    data.forEach((item) => {
      if (!seen.has(item.equipment)) {
        seen.add(item.equipment);
        uniqueEquipments.push(item);
      }
    });
    return uniqueEquipments;
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    console.log("Categories state:", categories);
  }, [categories]);
  

  useEffect(() => {
    handleFetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/brands");
      if (response.data.success) {
        setBrands(response.data.data || []);
      } else {
        alert("ไม่พบข้อมูลยี่ห้อ");
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
      alert("เกิดข้อผิดพลาดในการดึงข้อมูลยี่ห้อ");
    }
  };

useEffect(() => {
    fetchBrands();
}, []);

  
  const handleFetchBrands = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/brands"); // ดึงข้อมูลจาก API ยี่ห้อ
      if (response.data.success) {
        setBrands(response.data.data || []); // อัปเดตข้อมูล state ของยี่ห้อ
      } else {
        alert("ไม่พบข้อมูลยี่ห้อ");
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
      alert("ไม่สามารถดึงข้อมูลยี่ห้อได้ กรุณาตรวจสอบ API หรือเซิร์ฟเวอร์");
    }
  };

  const handleAddBrand = async () => {
    if (!newBrand.trim()) {
      alert("กรุณากรอกชื่อยี่ห้อ");
      return;
    }

    const category = "ทั่วไป"; // กำหนด category เป็นค่าเริ่มต้น
    try {
      const response = await axios.post("http://localhost:5001/api/brands", {
        name: newBrand,
        category,
      });
      if (response.data.success) {
        alert("เพิ่มยี่ห้อสำเร็จ");
        setBrands([...brands, { id: response.data.id, name: newBrand }]); // เพิ่มข้อมูลใหม่ใน state
        setNewBrand(""); // ล้างค่า input
      } else {
        alert(response.data.message || "เกิดข้อผิดพลาด");
      }
    } catch (error) {
      console.error("Error adding brand:", error.response?.data);
      alert(error.response?.data?.message || "เกิดข้อผิดพลาด");
    }
  };
  
  const handleDeleteBrand = async (id) => {
    if (!window.confirm("คุณต้องการลบยี่ห้อนี้หรือไม่?")) return;

    try {
      const response = await axios.delete(`http://localhost:5001/api/brands/${id}`);
      if (response.data.success) {
        alert("ลบยี่ห้อสำเร็จ");
        fetchBrands();
      }
    } catch (error) {
      console.error("Error deleting brand:", error);
      alert("เกิดข้อผิดพลาดในการลบยี่ห้อ");
    }
  };

  const handleEditBrand = async (id, name) => {
    if (!name.trim()) {
      alert("กรุณากรอกชื่อยี่ห้อ");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5001/api/brands/:id`, { name });
      if (response.data.success) {
        alert("แก้ไขยี่ห้อสำเร็จ");
        fetchBrands();
        setEditingBrandId(null);
        setEditingBrandName("");
      }
    } catch (error) {
      console.error("Error editing brand:", error);
      alert("เกิดข้อผิดพลาดในการแก้ไขยี่ห้อ");
    }
  };

  const handleSaveBrand = async (index) => {
    const brandId = brands[index]?.id;
    const updatedName = editingBrandName.trim();
  
    if (!updatedName) {
      alert("กรุณากรอกชื่อยี่ห้อ");
      return;
    }
  
    try {
      const response = await axios.put(`http://localhost:5001/api/brands/${brandId}`, {
        name: updatedName,
      });
  
      if (response.data.success) {
        fetchBrands(); // ดึงข้อมูลใหม่
        setEditingBrandIndex(null);
        setEditingBrandName("");
        alert("แก้ไขยี่ห้อสำเร็จ");
      } else {
        alert(response.data.message || "เกิดข้อผิดพลาด");
      }
    } catch (error) {
      console.error("Error updating brand:", error.response?.data || error.message);
      alert(error.response?.data?.message || "เกิดข้อผิดพลาดในการแก้ไข");
    }
  };
  
  
  const handleShowBrandModal = (index) => {
    setShowBrandModal(true); // เปิด Modal
};

const handleCloseBrandModal = () => {
    setShowBrandModal(false);
    setEditingBrandIndex(null);
    setEditingBrandName("");
  };

  return (
    <div>
      <ITDashboard />
      <div className="settings-container">
        <h1>การตั้งค่า</h1>
        <div className="settings-actions">
        <button className="delete-selected-btn" onClick={handleDeleteSelected}>
          ลบรายการที่เลือก
        </button>
        <button className="custom-btn" onClick={handleShowModal}>
          <span className="custom-btn-icon">🖉</span> ประเภท
        </button>
        <button className="custom-btn" onClick={handleShowEquipmentsModal}>
          <span className="custom-btn-icon">🖉</span> อุปกรณ์
        </button>
          <button className="custom-btn" onClick={() =>  handleShowBrandModal("brand")}>
            <span className="custom-btn-icon">🖉</span> ยี่ห้อ
          </button>
        </div>
        <table className="settings-table">
          <thead>
            <tr>
            <th>เลือก</th>
            <th>ชื่อ</th>
            <th>ประเภท</th>
            <th>อุปกรณ์</th>
            <th>ยี่ห้อ</th>
            <th>หมายเลขครุภัณฑ์</th>
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
              <td>{item.category || "-"}</td>
              <td>{item.equipment}</td>
              <td>{item.brand}</td>
              <td>{item.equipment_number}</td>
              <td>{item.inventory_number}</td>
              <td>{item.remaining}</td> {/* จำนวน */}
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
    <div className="modal-content modal-wide">
      <h2 className="modal-title">รายละเอียดประเภท</h2>
      <button className="close-btn" onClick={handleCloseModal}>
        X
      </button>
      <div className="modal-input-group">
      <input
        type="text"
        placeholder="ชื่อประเภทใหม่"
        value={newCategoryName} // เชื่อมค่า state
        onChange={(e) => setNewCategoryName(e.target.value)} // อัปเดต state เมื่อพิมพ์
      />

        <button className="modal-add-btn" onClick={handleAddCategory}>
          เพิ่ม
        </button>
      </div>
      <table className="modal-table">
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>ชื่อประเภท</th>
            <th>จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {editingRow === index ? (
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                ) : (
                  category.category_name
                )}
              </td>
              <td>
                {editingRow === index ? (
                  <>
                    <button
                      className="save-btn"
                      onClick={() => handleSaveCategory(index, newCategory)}
                    >
                      บันทึก
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => setEditingRow(null)}
                    >
                      ยกเลิก
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditingRow(index);
                        setNewCategory(category.category_name);
                      }}
                    >
                      แก้ไข
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      ลบ
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}
  {showEquipmentsModal && (
          <div className="modal">
            <div className="modal-content modal-wide">
              <h2 className="modal-title">รายละเอียดอุปกรณ์</h2>
              <button className="close-btn" onClick={closeEquipmentsModal}>
                X
              </button>
              <div className="modal-input-group">
                <input
                  type="text"
                  className="modal-input"
                  value={newEquipment}
                  placeholder="เพิ่มอุปกรณ์ใหม่"
                  onChange={(e) => setNewEquipment(e.target.value)}
                />
                <button className="modal-add-btn" onClick={handleAddEquipment}>
                  เพิ่ม
                </button>
              </div>
              <table className="modal-table">
                <thead>
                  <tr>
                    <th>ลำดับ</th>
                    <th>ชื่ออุปกรณ์</th>
                    <th>จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {equipments.map((equipment, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {editingEquipmentRow === index ? (
                          <input
                            type="text"
                            value={newEquipment} // ใช้สถานะ newEquipment
                            onChange={(e) => setNewEquipment(e.target.value)} // อัปเดตสถานะเมื่อพิมพ์
                          />
                        ) : (
                          equipment.equipment // แสดงค่าปัจจุบันเมื่อไม่อยู่ในโหมดแก้ไข
                        )}
                      </td>
                      <td>
                        {editingEquipmentRow === index ? (
                          <>
                            <button
                              className="save-btn"
                              onClick={() => handleSaveEquipment(index)}
                            >
                              บันทึก
                            </button>
                            <button
                              className="cancel-btn"
                              onClick={() => setEditingEquipmentRow(null)}
                            >
                              ยกเลิก
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="edit-btn"
                              onClick={() => handleEditEquipment(index)}
                            >
                              แก้ไข
                            </button>
                            <button
                              className="delete-btn"
                              onClick={() => handleDeleteEquipment(index)}
                            >
                              ลบ
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* Modal สำหรับจัดการยี่ห้อ */}
        {showBrandModal && (
          <div className="modal">
            <div className="modal-content">
              <h2 className="modal-title">รายละเอียดยี่ห้อ</h2>
              <button className="close-btn" onClick={handleCloseBrandModal}>
                X
              </button>
              <div className="modal-input-group">
                <input
                  type="text"
                  className="modal-input"
                  value={newBrand}
                  placeholder="เพิ่มยี่ห้อใหม่"
                  onChange={(e) => setNewBrand(e.target.value)}
                />
                <button className="modal-add-btn" onClick={handleAddBrand}>
                  เพิ่ม
                </button>
              </div>
              <table className="modal-table">
                <thead>
                  <tr>
                    <th>ลำดับ</th>
                    <th>ชื่อยี่ห้อ</th>
                    <th>จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {brands.map((brand, index) => (
                  <tr key={brand.id}>
                  <td>{index + 1}</td>
                  <td>
                    {editingBrandIndex === index ? (
                      <input
                        type="text"
                        value={editingBrandName}
                        onChange={(e) => setEditingBrandName(e.target.value)}
                      />
                      ) : (
                      brand.name
                    )}
                  </td>
                  <td>
                    {editingBrandIndex === index ? (
                      <>
                        <button onClick={() => handleSaveBrand(index)}>
                          บันทึก
                        </button>
                        <button onClick={() => setEditingBrandIndex(null)}>ยกเลิก</button>
                      </>
                    ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditingBrandIndex(index);
                          setEditingBrandName(brand.name);
                        }}
                      >
                        แก้ไข
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteBrand(brand.id)}
                      >
                        ลบ
                      </button>
                    </>
                  )}
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
