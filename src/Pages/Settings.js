import React, { useState, useEffect } from "react";
import ITDashboard from "./ITDashboard";
import "./Settings.css";
import axios from "axios";

const Settings = () => {
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [newCategoryType, setNewCategoryType] = useState(""); // สำหรับชนิดประเภท
  const [editingIndex, setEditingIndex] = useState(null); // เก็บ index ของแถวที่กำลังแก้ไข
  const [editedItem, setEditedItem] = useState({}); // เก็บข้อมูลที่กำลังแก้ไข
  const [showModal, setShowModal] = useState(false); // ควบคุมการแสดง Modal
  const [categories, setCategories] = useState([]); // เก็บข้อมูลประเภท
  const [newCategory, setNewCategory] = useState(""); // สำหรับเพิ่มประเภทใหม่
  const [editingRow, setEditingRow] = useState(null); // เก็บ id ของแถวที่กำลังแก้ไข
  const [equipments, setEquipments] = useState([]); // จัดเก็บข้อมูลอุปกรณ์
  const [newEquipment, setNewEquipment] = useState(""); // สำหรับเพิ่มอุปกรณ์ใหม่
  const [editingEquipmentRow, setEditingEquipmentRow] = useState(null); // เก็บ index ของแถวที่กำลังแก้ไข
  const [showEquipmentsModal, setShowEquipmentsModal] = useState(false); // สำหรับเปิด/ปิด Modal
  const [editingBrandName, setEditingBrandName] = useState(""); // สำหรับชื่อยี่ห้อ
  const [editingBrandIndex, setEditingBrandIndex] = useState(null); // สำหรับ index ที่กำลังแก้ไข
  const [newBrand, setNewBrand] = useState(""); // State สำหรับจัดเก็บค่าชื่อยี่ห้อใหม่
  const [brands, setBrands] = useState([]); // State สำหรับจัดเก็บรายชื่อยี่ห้อทั้งหมด  
  const [showBrandModal, setShowBrandModal] = useState(false); // ควบคุมการแสดงผล Modal
  const [selectedCategory, setSelectedCategory] = useState(""); // State สำหรับเก็บประเภทที่เลือก
  




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
      alert("กรุณากรอกชื่อประเภท");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/categories", {
        name: newCategory,
      });
      if (response.data.success) {
        setCategories([...categories, { id: response.data.id, name: newCategory }]);
        setNewCategory("");
        alert("เพิ่มประเภทสำเร็จ");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      alert("เกิดข้อผิดพลาดในการเพิ่มประเภท");
    }
  };

  const handleDeleteCategory = (index) => {
    if (window.confirm("คุณต้องการลบประเภทนี้หรือไม่?")) {
      const updatedCategories = categories.filter((_, i) => i !== index);
      setCategories(updatedCategories);
      alert("ลบประเภทสำเร็จ");
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
  
  
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/categories");
      console.log("Categories data from API:", response.data);
      if (response.data && response.data.data) {
        setCategories(response.data.data);
        setShowModal(true);
      } else {
        alert("ไม่พบข้อมูลประเภท");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      alert("ไม่สามารถดึงข้อมูลประเภทได้ กรุณาตรวจสอบ API หรือเซิร์ฟเวอร์");
    }
  };

  const fetchEquipments = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/products");
      if (response.data.success) {
        console.log("Raw Data from API:", response.data.data); // ตรวจสอบข้อมูล
        setEquipments(response.data.data); // ตั้งค่าข้อมูลที่ได้รับจาก API
      } else {
        alert("ไม่สามารถดึงข้อมูลอุปกรณ์ได้");
      }
    } catch (error) {
      console.error("Error fetching equipments:", error);
      alert("เกิดข้อผิดพลาดในการดึงข้อมูลอุปกรณ์");
    }
  };
  
  
  // เรียกใช้ fetchEquipments เมื่อ Component ถูกสร้าง
  useEffect(() => {
    fetchEquipments();
  }, []);

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
      alert("กรุณากรอกชื่ออุปกรณ์ใหม่");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5001/api/products", {
        name: newEquipment, // ใช้ "name" ตามฟิลด์ใน Backend API
      });
  
      console.log("Response from Server:", response.data); // Debug Response
      if (response.data.success) {
        setEquipments([
          ...equipments,
          { id: response.data.id, equipment: newEquipment },
        ]);
        setNewEquipment("");
        alert("เพิ่มอุปกรณ์สำเร็จ");
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
        setBrands(response.data.data || []);
    } catch (error) {
        console.error("Error fetching brands:", error);
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
    console.log("New Brand:", newBrand);
    console.log("Selected Category:", selectedCategory);
  
    if (!newBrand.trim() || !selectedCategory) {
      alert("กรุณากรอกชื่อยี่ห้อและเลือกประเภท");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5001/api/brands", {
        name: newBrand,
        category: selectedCategory,
      });
  
      if (response.data.success) {
        setBrands((prevBrands) => [...prevBrands, { id: response.data.id, name: newBrand, category: selectedCategory }]);
        setNewBrand("");
        setSelectedCategory("");
        alert("เพิ่มยี่ห้อสำเร็จ");
      } else {
        alert(response.data.message || "เกิดข้อผิดพลาดในการเพิ่มยี่ห้อ");
      }
    } catch (error) {
      console.error("Error adding brand:", error);
      alert("เกิดข้อผิดพลาดในการเพิ่มยี่ห้อ");
    }
  };
  
  const handleDeleteBrand = async (id) => {
    if (window.confirm("คุณต้องการลบยี่ห้อนี้หรือไม่?")) {
      try {
        const response = await axios.delete(`http://localhost:5001/api/brands/${id}`);
        if (response.data.success) {
          setBrands(brands.filter((brand) => brand.id !== id)); // อัปเดต state
          alert("ลบยี่ห้อสำเร็จ");
        }
      } catch (error) {
        console.error("Error deleting brand:", error);
        alert("เกิดข้อผิดพลาดในการลบยี่ห้อ");
      }
    }
  };

  const handleEditBrand = async (id, updatedName, updatedCategory) => {
    if (!updatedName.trim() || !updatedCategory) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    try {
      const response = await axios.put(`http://localhost:5001/api/brands/${id}`, {
        name: updatedName,
        category: updatedCategory,
      });
      if (response.data.success) {
        const updatedBrands = brands.map((brand) =>
          brand.id === id ? { ...brand, name: updatedName, category: updatedCategory } : brand
        );
        setBrands(updatedBrands);
        alert("แก้ไขยี่ห้อสำเร็จ");
      }
    } catch (error) {
      console.error("Error updating brand:", error);
      alert("เกิดข้อผิดพลาดในการแก้ไขยี่ห้อ");
    }
  };
  
  const handleSaveBrand = async (index) => {
    const brandId = brands[index].id;
    if (!editingBrandName.trim()) {
      alert("ชื่อยี่ห้อไม่สามารถเว้นว่างได้");
      return;
    }
  
    try {
      await axios.put(`http://localhost:5001/api/brands/${brandId}`, {
        name: editingBrandName,
      });
      const updatedBrands = [...brands];
      updatedBrands[index].name = editingBrandName;
      setBrands(updatedBrands);
      setEditingBrandIndex(null);
      alert("แก้ไขยี่ห้อสำเร็จ");
    } catch (error) {
      console.error("Error saving brand:", error);
      alert("เกิดข้อผิดพลาดในการแก้ไขยี่ห้อ");
    }
  };
  const handleShowBrandModal = (index) => {
    setShowBrandModal(true); // เปิด Modal
};

const handleCloseBrandModal = () => {
    setShowBrandModal(false); // ปิด Modal
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
        <button className="custom-btn" onClick={fetchCategories}>
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
            <h2 className="modal-title">รายละเอียดประเภท</h2>
            <button className="close-btn" onClick={handleCloseModal}>X</button>
            <div className="modal-input-group">
              <input
                type="text"
                className="modal-input"
                value={newCategory}
                placeholder="เพิ่มประเภทใหม่"
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <button className="modal-add-btn" onClick={handleAddCategory}>เพิ่ม</button>
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
                        value={category.category_name}
                          onChange={(e) => {
                            const updatedCategories = [...categories];
                            updatedCategories[index].category_name = e.target.value;
                            setCategories(updatedCategories);
                          }}
                      />
                    ) : (
                    <span>{category.category_name}</span> // แสดงเป็นข้อความเมื่อไม่ได้อยู่ในโหมดแก้ไข
                    )}
                  </td>
                  <td>
                    {editingRow === index ? (
                      <>
                          <button
                            className="save-btn"
                            onClick={() => {
                                handleSaveCategory(index, category.category_name);
                                setEditingRow(null);
                              }}
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
                        onClick={() => setEditingRow(index)}
                      >
                      แก้ไข
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteCategory(index)}
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
  <select
    className="modal-select"
    value={selectedCategory || ""}
    onChange={(e) => setSelectedCategory(e.target.value)}
  >
    <option value="">เลือกประเภท</option>
    {categories.map((category) => (
      <option key={category.id} value={category.name}>
        {category.name}
      </option>
    ))}
  </select>
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
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {editingBrandIndex === index ? (
                  <input
                    type="text"
                    value={editingBrandName}
                    onChange={(e) => setEditingBrandName(e.target.value)}
                  />
                ) : (
                  <span>{brand.name}</span>
                )}
              </td>
              <td>
                {editingBrandIndex === index ? (
                  <>
                    <button
                      className="save-btn"
                      onClick={() => handleSaveBrand(index)}
                    >
                      บันทึก
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => setEditingBrandIndex(null)}
                    >
                      ยกเลิก
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditingBrandIndex(index);
                        setEditingBrandName(brand.name);
                      }}
                    >
                      แก้ไข
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteBrand(index)}
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
