import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Reqfrom.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ReqFrom = ({ onClose, onSubmit }) => {
  const [newRequest, setNewRequest] = useState({
    borrower_name: "",
    department: "",
    phone: "",
    email: "",
    material: "",
    category: "",
    equipment: "",
    brand: "",
    quantity_requested: 1,
    equipment_number: "-",
    serial_number: "-",
    request_date: "",
    return_date: "",
    note: "",
    status: "Pending",
  });

  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [brands, setBrands] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    axios.get("http://newstock.sat.or.th:5001/api/users")
      .then((res) => {
         console.log("📌 Users Data from API:", res.data); // ✅ Debug
         const approvedUsers = res.data.filter(user => user.status === "Approved");
  
         if (!approvedUsers || approvedUsers.length === 0) {
             console.warn("⚠️ ไม่มีผู้ใช้ที่ได้รับการอนุมัติ!");
         }
  
         setUsers(approvedUsers);
      })
      .catch((err) => console.error("❌ Error fetching users:", err));
  }, []);
  
  // ✅ ดึงรายการฝ่าย/สำนักจาก API
  useEffect(() => {
    axios.get("http://newstock.sat.or.th:5001/api/departments")
      .then((res) => setDepartments(res.data))
      .catch((err) => console.error("Error fetching departments:", err));
  }, []);

  // ✅ ดึงข้อมูลจาก API
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const productsResponse = await axios.get("http://newstock.sat.or.th:5001/api/products");
        const categoriesResponse = await axios.get("http://newstock.sat.or.th:5001/api/categories");
        const brandsResponse = await axios.get("http://newstock.sat.or.th:5001/api/brands");

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
    if (newRequest.material && newRequest.type && newRequest.equipment && newRequest.brand) {
       console.log("📌 Fetching product details:", newRequest);
       axios.get(`http://newstock.sat.or.th:5001/api/products/details`, {
          params: {
             material: newRequest.material,
             type: newRequest.type,
             equipment: newRequest.equipment,
             brand: newRequest.brand,
          }
       })
       .then(response => {
          console.log("📢 API Response:", response.data);
          if (response.data.success) {
             setNewRequest(prevState => ({
                ...prevState,
                remaining: response.data.remaining || "-",
                equipment_number: response.data.equipment_number || "-",
                serial_number: response.data.serial_number || "-",
             }));
          } else {
             console.error("❌ Error fetching product details:", response);
          }
       })
       .catch(error => console.error("❌ API Error:", error));
    }
 }, [newRequest.material, newRequest.type, newRequest.equipment, newRequest.brand]);
 
 
  useEffect(() => {
    axios.get("http://newstock.sat.or.th:5001/api/products") // ✅ เรียก API
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
      axios.get(`http://newstock.sat.or.th:5001/api/remaining`, {
        params: {
          model: newRequest.material,
          category: newRequest.type,
          equipment: newRequest.equipment,
          brand: newRequest.brand
        }
      })
      .then(response => {
        if (response.data.success) {
          setNewRequest(prevState => ({ ...prevState, remaining: response.data.remaining || "-" }));
        }
      })
      .catch(err => console.error("Error fetching remaining quantity:", err));
    }
  }, [newRequest.material, newRequest.type, newRequest.equipment, newRequest.brand]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSaving) return; // ป้องกันการกดซ้ำ
    setIsSaving(true);

    const userData = JSON.parse(localStorage.getItem("user"));

    const requestData = {
      user_id: userData?.id || 1,
      borrower_name: newRequest.borrower_name || "",
      department: newRequest.department || "",
      phone: newRequest.phone || "",
      email: newRequest.email || "",
      material: newRequest.material || "",
      category: newRequest.category || "",
      equipment: newRequest.equipment || "",
      brand: newRequest.brand || "",
      quantity_requested: parseInt(newRequest.quantity_requested, 10) || 1,
      equipment_number: newRequest.equipment_number || "-",
      serial_number: newRequest.serial_number || "-",
      status: "Pending",
      note: newRequest.note || "-",
      request_date: newRequest.request_date || new Date().toISOString().split("T")[0],
    };

    console.log("📌 Data to send:", requestData);

    try {
      const response = await axios.post("http://newstock.sat.or.th:5001/api/requests", requestData);

      if (response.status === 201) {
        alert("✅ บันทึกคำขอสำเร็จ");
        onSubmit(newRequest);
        onClose();
      } else {
        alert("❌ เกิดข้อผิดพลาดในการบันทึกคำขอ");
      }
    } catch (error) {
      console.error("❌ API Error:", error);
      alert("❌ ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์");
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <div className="add-borrow-overlay">
      <div className="add-borrow-modal">
        {/* ปุ่มปิด Modal */}
        <button className="add-borrow-close" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h3 className="add-borrow-title">เพิ่มรายการเบิก</h3>
  
        <div className="add-borrow-grid">
          <div>
            <label className="add-borrow-label">เลือกผู้ใช้:</label>
            <select
              className="add-borrow-select"
              value={newRequest.user_id || ""}
              onChange={(e) => {
                console.log("📌 Selected User ID:", e.target.value);
                const selectedUser = users.find(user => user.id === parseInt(e.target.value, 10));
  
                if (selectedUser) {
                  setNewRequest(prevState => ({
                    ...prevState,
                    user_id: selectedUser.id,
                    borrower_name: selectedUser.fullName,
                    department: selectedUser.department_name || "-",
                    phone: selectedUser.phone || "-",
                    email: selectedUser.email || "-",
                  }));
                }
              }}
            >
              <option value="">-- เลือกผู้ใช้ --</option>
              {users.length > 0 ? (
                users.map((user) => (
                  <option key={user.id} value={user.id}>{user.fullName}</option>
                ))
              ) : (
                <option disabled>❌ ไม่มีผู้ใช้ที่อนุมัติ</option>
              )}
            </select>
          </div>
  
          <div>
            <label className="add-borrow-label">ฝ่าย/สำนัก:</label>
            <input className="add-borrow-input" type="text" value={newRequest.department || "-"} readOnly />
          </div>
  
          <div>
            <label className="add-borrow-label">โทรศัพท์:</label>
            <input className="add-borrow-input" type="text" value={newRequest.phone || "-"} readOnly />
          </div>
  
          <div>
            <label className="add-borrow-label">อีเมล:</label>
            <input className="add-borrow-input" type="email" value={newRequest.email || "-"} readOnly />
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
              <input
                className="add-borrow-input"
                type="text"
                value={newRequest.equipment_number || ""}
                onChange={(e) => setNewRequest({ ...newRequest, equipment_number: e.target.value })}
              />
            </div>
  
            <div className="add-borrow-group">
              <label className="add-borrow-label">Serial Number:</label>
              <input
                className="add-borrow-input"
                type="text"
                value={newRequest.serial_number || ""}
                onChange={(e) => setNewRequest({ ...newRequest, serial_number: e.target.value })}
              />
            </div>
          </div>
  
          <div className="add-borrow-group">
            <label className="add-borrow-label">จำนวน:</label>
            <input
              className="add-borrow-input"
              type="number"
              min="1"
              value={newRequest.quantity_requested || 1}
              onChange={(e) => setNewRequest({ ...newRequest, quantity_requested: parseInt(e.target.value, 10) || 1 })}
            />
          </div>
  
          <div>
            <label className="add-borrow-label">วันที่ขอ:</label>
            <input
              className="add-borrow-input"
              type="date"
              value={newRequest.request_date || ""}
              onChange={(e) => setNewRequest({ ...newRequest, request_date: e.target.value })}
            />
          </div>
          <div className="add-borrow-full-row">
            <label className="add-borrow-label">หมายเหตุ:</label>
            <textarea
              className="add-borrow-textarea"
              value={newRequest.note || ""}
              onChange={(e) => setNewRequest({ ...newRequest, note: e.target.value })}
            ></textarea>
          </div>
  
          <div className="add-borrow-buttons">
            <button className="add-borrow-confirm" onClick={handleSubmit}>
              บันทึก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};  

export default ReqFrom;
