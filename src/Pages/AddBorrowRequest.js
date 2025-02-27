import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddBorrowRequest.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons"; // นำเข้า icon กากบาท

const AddBorrowRequest = ({ onClose, onSubmit }) => {
  const [newRequest, setNewRequest] = useState({
    borrower_name: "",
    department: "",
    phone: "",
    email: "",
    material: "",
    type: "",
    equipment: "",
    brand: "",
    quantity: 1,
    remaining: "-",
    equipment_number: "-",
    serial_number: "-",
    request_date: "",
    return_date: "",
    note: "",
    status: "Pending",
  });
  
  const [departments, setDepartments] = useState([]); // รายการฝ่าย/สำนัก
  const [categories, setCategories] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [brands, setBrands] = useState([]);
  const [materials, setMaterials] = useState([]); // ✅ เพิ่ม useState สำหรับเก็บวัสดุ (model)

  // ✅ ดึงรายการฝ่าย/สำนักจาก API
  useEffect(() => {
    axios.get("http://localhost:5001/api/departments")
      .then((res) => setDepartments(res.data))
      .catch((err) => console.error("Error fetching departments:", err));
  }, []);

  // ✅ ดึงข้อมูลจาก API
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const productsResponse = await axios.get("http://localhost:5001/api/products");
        const categoriesResponse = await axios.get("http://localhost:5001/api/categories");
        const brandsResponse = await axios.get("http://localhost:5001/api/brands");

        // ✅ ลบข้อมูลซ้ำออกจากอุปกรณ์
        const uniqueEquipments = Array.from(new Set(productsResponse.data.data.map(product => product.equipment)));

        setCategories(categoriesResponse.data.data);
        setEquipments(uniqueEquipments);
        setBrands(brandsResponse.data.data);
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    if (newRequest.material) {
      axios.get(`http://localhost:5001/api/products/model/${newRequest.material}`)
        .then((response) => {
          if (response.data.success) {
            setNewRequest(prevState => ({
              ...prevState,
              remaining: response.data.remaining || "-",
              equipment_number: response.data.equipment_number || "-",
              serial_number: response.data.serial_number || "-"
            }));
          }
        })
        .catch(error => console.error("Error fetching product details:", error));
    }
  }, [newRequest.material]);

  useEffect(() => {
    axios.get("http://localhost:5001/api/products") // ✅ เรียก API
      .then((response) => {
        if (response.data.success) {
          // ✅ ใช้ Set() กรองข้อมูลวัสดุไม่ให้ซ้ำ
          const uniqueMaterials = [...new Set(response.data.data.map(item => item.material))];
          setMaterials(uniqueMaterials); // ✅ กำหนดค่า materials
        }
      })
      .catch((error) => {
        console.error("Error fetching materials:", error);
      });
  }, []);
  
  useEffect(() => {
    if (newRequest.material && newRequest.type && newRequest.equipment && newRequest.brand) {
      axios.get(`http://localhost:5001/api/remaining`, {
        params: {
          model: newRequest.material,
          category: newRequest.type,
          equipment: newRequest.equipment,
          brand: newRequest.brand
        }
      })
      .then(response => {
        if (response.data.success) {
          setNewRequest(prevState => ({ ...prevState, remaining: response.data.remaining }));
        }
      })
      .catch(err => console.error("Error fetching remaining quantity:", err));
    }
  }, [newRequest.material, newRequest.type, newRequest.equipment, newRequest.brand]);

  const handleSubmit = async () => {
    if (!newRequest.borrower_name || !newRequest.material || !newRequest.equipment || !newRequest.quantity || !newRequest.request_date) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
  
    try {
      const requestData = {
        user_id: 1, // แก้เป็น user_id ที่ใช้จริง
        borrower_name: newRequest.borrower_name,
        department: newRequest.department,
        phone: newRequest.phone,
        email: newRequest.email,
        material: newRequest.material,
        category: newRequest.type, 
        equipment: newRequest.equipment,
        brand: newRequest.brand,
        quantity_requested: newRequest.quantity,
        equipment_number: newRequest.equipment_number, // ✅ เพิ่ม field หมายเลขครุภัณฑ์
        serial_number: newRequest.serial_number, // ✅ เพิ่ม field Serial Number
        note: newRequest.note,
        request_date: newRequest.request_date,
        return_date: newRequest.return_date,
      };
  
      const response = await axios.post("http://localhost:5001/borrow-requests", requestData);
  
      if (response.status === 201) {
        alert("บันทึกคำขอสำเร็จ");
        onSubmit(newRequest);
        onClose();
      } else {
        alert("เกิดข้อผิดพลาดในการบันทึกคำขอ");
      }
    } catch (error) {
      console.error("Error submitting borrow request:", error);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
    }
  };
  
  return (
    <div className="add-borrow-overlay">
      <div className="add-borrow-modal">
      
        {/* ปุ่มกากบาท ปิด Modal */}
        <button className="add-borrow-close" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h3 className="add-borrow-title">เพิ่มรายการยืม/คืน</h3>
  
        <div className="add-borrow-grid">
        <div>
            <label className="add-borrow-label">ชื่อผู้ขอ:</label>
            <input className="add-borrow-input" type="text" />
          </div>
        <div>
            <label className="add-borrow-label">ฝ่าย/สำนัก:</label>
            <select
              className="add-borrow-input"
              value={newRequest.department}
              onChange={(e) => setNewRequest({ ...newRequest, department: e.target.value })}
            >
              <option value="">-- เลือกฝ่าย/สำนัก --</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="add-borrow-label">โทรศัพท์:</label>
            <input className="add-borrow-input" type="text" />
          </div>
  
          <div>
            <label className="add-borrow-label">อีเมล:</label>
            <input className="add-borrow-input" type="email" />
          </div>
          {/* ✅ Dropdown เลือกชื่อวัสดุ */}
          <div>
            <label className="add-borrow-label">ชื่อวัสดุ:</label>
            <select
              className="add-borrow-select"
              value={newRequest.material}
              onChange={(e) => setNewRequest({ ...newRequest, material: e.target.value })}
            >
              <option value="">-- เลือกชื่อวัสดุ --</option>
              {materials.map((material, index) => (
                <option key={index} value={material}>{material}</option>
              ))}
            </select>
          </div>
          <div className="add-borrow-form">
            <div>
              <label className="add-borrow-label">ประเภท:</label>
              <select
                className="add-borrow-select"
                value={newRequest.type}
                onChange={(e) => setNewRequest({ ...newRequest, type: e.target.value })}
              >
                <option value="">เลือกประเภท</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.category_name}>{category.category_name}</option>
                ))}
              </select>
            </div>
  
            <div>
              <label className="add-borrow-label">อุปกรณ์:</label>
              <select
                className="add-borrow-select"
                value={newRequest.equipment}
                onChange={(e) => setNewRequest({ ...newRequest, equipment: e.target.value })}
              >
                <option value="">เลือกอุปกรณ์</option>
                {equipments.map((equipment, index) => (
                  <option key={index} value={equipment}>{equipment}</option>
                ))}
              </select>
            </div>
  
            <div>
              <label className="add-borrow-label">ยี่ห้อ:</label>
              <select
                className="add-borrow-select"
                value={newRequest.brand}
                onChange={(e) => setNewRequest({ ...newRequest, brand: e.target.value })}
              >
                <option value="">เลือกยี่ห้อ</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.name}>{brand.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="add-borrow-row">
  <div className="add-borrow-group">
    <label className="add-borrow-label">หมายเลขครุภัณฑ์:</label>
    <input className="add-borrow-input read-only" type="text" value={newRequest.equipment_number} readOnly />
  </div>

  <div className="add-borrow-group">
    <label className="add-borrow-label">Serial Number:</label>
    <input className="add-borrow-input read-only" type="text" value={newRequest.serial_number} readOnly />
  </div>
</div>

          <div className="add-borrow-row">
            <div className="add-borrow-group">
              <label className="add-borrow-label">จำนวนคงเหลือ:</label>
              <input className="add-borrow-input read-only" type="text" value={newRequest.remaining || "-"} readOnly />
            </div>
            <div className="add-borrow-group">
              <label className="add-borrow-label">จำนวน:</label>
                <input className="add-borrow-input" type="number" min="1" value={newRequest.quantity} 
                onChange={(e) => setNewRequest({ ...newRequest, quantity: e.target.value })} />
              </div>
            </div>
          <div>
            <label className="add-borrow-label">วันที่ขอ:</label>
            <input className="add-borrow-input" type="date" />
          </div>
  
          <div>
            <label className="add-borrow-label">วันที่คืน:</label>
            <input className="add-borrow-input" type="date" />
          </div>
  
          <div className="add-borrow-full-row">
            <label className="add-borrow-label">หมายเหตุ:</label>
            <textarea className="add-borrow-textarea"></textarea>
          </div>
        </div>
  
        <div className="add-borrow-buttons">
          <button className="add-borrow-confirm" onClick={handleSubmit}>บันทึก</button>
        </div>
      </div>
    </div>
  );
  
};

export default AddBorrowRequest;
