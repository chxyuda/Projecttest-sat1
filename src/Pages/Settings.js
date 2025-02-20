import React, { useState, useEffect } from "react";
import ITDashboard from "./ITDashboard";
import "./Settings.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

const Settings = () => {
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [newCategoryType, setNewCategoryType] = useState(" "); // สำหรับชนิดประเภท
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
  const [newCategoryName, setNewCategoryName] = useState(""); // สำหรับเก็บชื่อประเภทใหม่
  const [newModel, setNewModel] = useState(""); // เพิ่มตัวแปร state
  const [editingBrandId, setEditingBrandId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false); // เปิด/ปิด Modal แก้ไข
  const [currentEditItem, setCurrentEditItem] = useState(null); // เก็บข้อมูลรายการที่จะแก้ไข
  const [newEquipmentNumber, setNewEquipmentNumber] = useState(""); // สำหรับหมายเลขครุภัณฑ์
  const [newSerial, setNewSerial] = useState(""); // สำหรับ Serial Number
  const [newInventory, setNewInventory] = useState(1); // สำหรับจำนวนสินค้า (ค่าดีฟอลต์ 1)
  const [newDetails, setNewDetails] = useState(""); // สำหรับรายละเอียด
  const [editingBrand, setEditingBrand] = useState(""); // State สำหรับเก็บชื่อยี่ห้อที่กำลังแก้ไข
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductBrand, setNewProductBrand] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("");
  const [newProductDetails, setNewProductDetails] = useState("");
  const [products, setProducts] = useState([]);


  console.log("Selected Items:", selectedItems);
  console.log({ newModel, newEquipment });
  console.log("Name being sent:", newBrand);
  console.log("Editing Index Cleared:", editingBrandIndex); // Debug
  console.log("Editing Brand Cleared:", editingBrandName); // Debug
  console.log("Data being sent:", currentEditItem);



  useEffect(() => {
    const fetchAllData = async () => {
      await fetchDropdownData(); // ดึงข้อมูล Dropdown
      await fetchProducts(); // ดึงข้อมูล Products
      await fetchBrands(); // ดึงข้อมูล Brands
      await fetchEquipments();
      
    };
  
    fetchAllData();
  }, []);
  
  
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/products');
      if (response.data.success) {
        setData(response.data.data); // ตั้งค่า State ของข้อมูล
        console.log("Fetched data:", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const handleRefresh = () => {
    fetchData(); // โหลดข้อมูลใหม่
  };
  
  useEffect(() => {
    console.log("Selected Items:", selectedItems); // แสดงผล selectedItems ทุกครั้งที่มีการเปลี่ยนแปลง
  }, [selectedItems]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/products');
        if (response.data.success) {
          setData(response.data.data); // ตั้งค่า State `data` ด้วยข้อมูลจาก API
          console.log("Fetched data:", response.data.data); // Debug เพื่อตรวจสอบข้อมูล
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  
  const handleCheckboxChange = (itemId) => {
    setSelectedItems(prevSelected =>
        prevSelected.includes(itemId)
            ? prevSelected.filter(id => id !== itemId) // เอาออกถ้าถูกเลือกแล้ว
            : [...prevSelected, itemId] // เพิ่มเข้าไปถ้ายังไม่ถูกเลือก
    );
};

  useEffect(() => { 
    if (currentEditItem) {
      setCurrentEditItem((prev) => ({
        ...prev,
        id: prev.id || "", 
        material: prev.material || "",
        category: prev.category || "",
        equipment: prev.equipment || "",
        brand_name: prev.brand_name || "", // ชื่อฟิลด์ควรตรงกัน
        inventory_number: prev.inventory_number || 0,
        details: prev.details || "-",
        equipment_number: prev.equipment_number || "-",
      }));
    }
  }, [currentEditItem]);
  
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/options');
        if (response.data.success) {
          setCategories(response.data.categories);
          setEquipments(response.data.equipments);
          setBrands(response.data.brands);
        }
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };
    fetchOptions();
  }, []);

  const [filters, setFilters] = useState({
    categories: [],
    equipment: [],
    brands: [],
  });
  
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/filters');
        if (response.data.success) {
          setFilters(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    };
    fetchFilters();
  }, []);
  
  
  const handleEditClick = (item) => {
    setCurrentEditItem({
      id: item.id || "", 
      name: item.material || "",
      category: item.category || "",
      equipment: item.equipment || "",
      brand: item.brand || "",
      equipment_number: item.equipment_number || "-",
      serial_number: item.serial_number || "-",
      inventory_number: item.inventory_number || 0,
      details: item.details !== "-" ? item.details || "" : "",  // ✅ อนุญาตให้เป็นค่าว่าง
    });
    setShowEditModal(true);
};


  useEffect(() => {
    console.log("Current Edit Item:", currentEditItem);
  }, [currentEditItem]);
  

  
  const handleInputChange = (field, value) => {
    setCurrentEditItem((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleSave = async () => {
    try {
      const payload = {
        name: currentEditItem.name || "-",
        category_name: currentEditItem.category || "-",
        equipment: currentEditItem.equipment || "-",
        brand_name: currentEditItem.brand || "-",
        equipment_number: currentEditItem.equipment_number || "-",
        serial_number: currentEditItem.serial_number || "-",
        inventory_number: currentEditItem.inventory_number || 1,
        details: currentEditItem.details.trim() === "-" ? "" : currentEditItem.details.trim(), // ✅ ลบ "-" ออก
      };

      console.log("📌 กำลังส่งข้อมูล:", payload);

      const response = await axios.put(
        `http://localhost:5001/api/products/${currentEditItem.id}`,
        payload
      );

      if (response.data.success) {
        alert("✅ บันทึกข้อมูลสำเร็จ");
        setShowEditModal(false);
        fetchData();
      } else {
        alert("❌ ไม่สามารถบันทึกข้อมูลได้");
      }
    } catch (error) {
      console.error("❌ Error updating data:", error);
      alert("❌ เกิดข้อผิดพลาดในการอัปเดตข้อมูล");
    }
};


  const openEditModal = (item) => {
    console.log("Item received:", item);
    setCurrentEditItem({
      id: item.id || "",
      name: item.material || "",
      category: item.category_name || "",
      equipment: item.equipment || "",
      brand_name: item.brand || "",
      equipment_number: item.equipment_number || "-",
      serial_number: item.serial_number || "-",
      inventory_number: item.inventory_number || 0,
      details: item.details || "-",
    });
    setShowEditModal(true);
  };
   
  const handleCancel = () => {
    setShowEditModal(false); // ปิด Modal
    setCurrentEditItem(null); // รีเซ็ตข้อมูล
  };
  
  const handleDeleteSelected = async () => {
    if (selectedItems.length === 0) {
        alert("❌ กรุณาเลือกอย่างน้อยหนึ่งรายการเพื่อลบ");
        return;
    }

    if (!window.confirm("⚠️ คุณต้องการลบรายการที่เลือกหรือไม่?")) return;

    console.log("📌 รายการที่ถูกเลือก:", selectedItems); // ✅ Debug

    try {
        const response = await axios.delete("http://localhost:5001/api/products", {
            data: { ids: selectedItems } // ✅ ตรวจสอบว่ากำลังส่ง ID อะไรไป
        });

        console.log("📌 คำตอบจากเซิร์ฟเวอร์:", response.data); // ✅ Debug

        if (response.data.success) {
            alert(`✅ ลบข้อมูลสำเร็จ! (${response.data.message})`);

            // ✅ แก้ไขโค้ดนี้เพื่อลบเฉพาะรายการที่ถูกเลือก
            setData(prevData => prevData.filter(item => !selectedItems.includes(item.id)));

            setSelectedItems([]); // เคลียร์การเลือก
        } else {
            alert("❌ ไม่สามารถลบข้อมูลได้: " + response.data.message);
        }
    } catch (error) {
        console.error("❌ Error deleting items:", error.response?.data || error.message);
        alert("❌ เกิดข้อผิดพลาดในการลบข้อมูล");
    }
};

  
const [showDeleteModal, setShowDeleteModal] = useState(false);

const handleDeleteConfirm = async () => {
  setShowDeleteModal(false); // ปิด Modal
  try {
    const response = await axios.post("http://localhost:5001/api/products/delete", {
      ids: selectedItems,
    });

    if (response.data.success) {
      setData((prevData) =>
        prevData.filter((item) => !selectedItems.includes(item.id))
      );
      setSelectedItems([]);
      alert("ลบข้อมูลสำเร็จ");
    }
  } catch (error) {
    console.error("Error deleting items:", error.response?.data || error.message);
    alert("เกิดข้อผิดพลาดในการลบข้อมูล");
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
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/categories");
        if (response.data.success) {
          setCategories(response.data.data);
          console.log("Categories fetched:", response.data.data); // ตรวจสอบข้อมูล
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchEquipments();
}, []);


  const fetchEquipments = async () => {
    try {
        const response = await axios.get("http://localhost:5001/api/products");
        if (response.data.success) {
            const uniqueEquipments = response.data.data.filter(
                (item, index, self) =>
                    index === self.findIndex((t) => t.equipment === item.equipment)
            );
            setEquipments(uniqueEquipments); // อาจทำให้ข้อมูลบางส่วนหาย
        }
    } catch (error) {
        console.error("Error fetching equipments:", error);
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
    setEditingEquipmentRow(index); // ตั้ง row ที่ต้องการแก้ไข
    setNewEquipment(equipments[index]?.equipment || ""); // ดึงค่าอุปกรณ์ปัจจุบันมาใส่ใน input
  };
  

  // ฟังก์ชันเพิ่มอุปกรณ์ใหม่
  const handleAddEquipment = async () => {
    // ตรวจสอบว่ามีข้อมูลครบถ้วนหรือไม่
    if (!newEquipment.trim()) {
      alert("กรุณากรอกชื่ออุปกรณ์");
      return;
    }
    
    // กำหนดค่าดีฟอลต์
    const defaultSerial = "ไม่มี";
    const defaultInventory = 1; // จำนวนเริ่มต้น
    const defaultDetails = "ไม่มีรายละเอียด";
    
    try {
      const response = await axios.post("http://localhost:5001/api/products", {
        name: newEquipment, // ชื่ออุปกรณ์ (ต้องกรอก)
        brand_name: newBrand || "ทั่วไป", // ใช้ค่า 'ทั่วไป' ถ้าไม่ได้เลือก
        equipment_number: newEquipmentNumber || "-", // กำหนดให้เป็น "-" ถ้าไม่ได้กรอก
        serial_number: newSerial || defaultSerial,
        inventory_number: newInventory || defaultInventory,
        remaining: newInventory || defaultInventory, // สมมติว่าเริ่มต้นเท่ากับจำนวน
        details: newDetails || defaultDetails,
      });
    
      if (response.data.success) {
        alert("เพิ่มอุปกรณ์สำเร็จ");
        fetchEquipments(); // โหลดข้อมูลใหม่
        setNewEquipment(""); // ล้างค่า input
      } else {
        alert(response.data.message || "เกิดข้อผิดพลาด");
      }
    } catch (error) {
      console.error("Error adding equipment:", error);
      alert("เกิดข้อผิดพลาดในการเพิ่มอุปกรณ์");
    }
  };
  

  // ฟังก์ชันบันทึกการแก้ไข
  const handleSaveEquipment = async (index) => {
    if (!newEquipment.trim()) {
      alert("ชื่ออุปกรณ์ไม่สามารถเว้นว่างได้");
      return;
    }
  
    try {
      const response = await axios.put(
        `http://localhost:5001/api/products/${equipments[index].id}`,
        { name: newEquipment }
      );
  
      if (response.data.success) {
        const updatedEquipments = [...equipments];
        updatedEquipments[index].equipment = newEquipment; // อัปเดตค่าที่แก้ไข
        setEquipments(updatedEquipments); // อัปเดต state
        setEditingEquipmentRow(null); // ออกจากโหมดแก้ไข
        setNewEquipment(""); // รีเซ็ตค่า
        alert("แก้ไขข้อมูลอุปกรณ์สำเร็จ");
      } else {
        alert("เกิดข้อผิดพลาดในการแก้ไขข้อมูลอุปกรณ์");
      }
    } catch (error) {
      console.error("Error saving equipment:", error);
      alert("เกิดข้อผิดพลาดในการแก้ไขข้อมูลอุปกรณ์");
    }
  };
  
  // ฟังก์ชันลบอุปกรณ์
  const handleDeleteEquipment = async (index) => {
    if (window.confirm("คุณต้องการลบอุปกรณ์นี้หรือไม่?")) {
      try {
        const response = await axios.post("http://localhost:5001/api/products/delete", {
          ids: [equipments[index].id],
        });
  
        if (response.data.success) {
          const updatedEquipments = equipments.filter((_, i) => i !== index);
          setEquipments(updatedEquipments); // อัปเดต state
          alert("ลบข้อมูลอุปกรณ์สำเร็จ");
        } else {
          alert("เกิดข้อผิดพลาดในการลบข้อมูลอุปกรณ์");
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
      if (!seen.has(item.name)) {
        seen.add(item.name);
        uniqueEquipments.push(item);
      }
    });
    return uniqueEquipments;
  };
  
  
  useEffect(() => {
    fetchEquipments();
  }, []);
  
  useEffect(() => {
    console.log("Updated equipments:", equipments);
  }, [equipments]);
  
  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    console.log("Categories state:", categories);
  }, [categories]);
  

  const fetchBrands = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/brands");
      if (response.data.success) {
        setBrands(response.data.data); // เก็บข้อมูลใน state
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
      alert("ไม่สามารถดึงข้อมูลยี่ห้อได้");
    }
  };
  
  
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
  
    try {
      const response = await axios.post("http://localhost:5001/api/brands", {
        name: newBrand.trim(),
        category: "ทั่วไป",
      });
  
      if (response.data.success) {
        alert("เพิ่มยี่ห้อสำเร็จ");
  
        // เพิ่มข้อมูลใหม่ใน state พร้อม id
        setBrands([...brands, { id: response.data.id, name: newBrand.trim() }]);
  
        setNewBrand(""); // รีเซ็ตค่า input
      }
    } catch (error) {
      console.error("Error adding brand:", error);
      alert("เกิดข้อผิดพลาดในการเพิ่มยี่ห้อ");
    }
  };
  

  const handleDeleteBrand = async (id) => {
    if (!id) {
      alert("ID ไม่สามารถเว้นว่างได้");
      console.error("ID ที่ส่งไป:", id); // Debug ID
      return;
    }
  
    if (!window.confirm("คุณต้องการลบยี่ห้อนี้หรือไม่?")) return;
  
    try {
      const response = await axios.delete(`http://localhost:5001/api/brands/${id}`);
      if (response.data.success) {
        alert("ลบยี่ห้อสำเร็จ");
        // กรองข้อมูลใน state โดยลบรายการที่มี id ตรงกัน
        setBrands(brands.filter((brand) => brand.id !== id));
      } else {
        alert(response.data.message || "เกิดข้อผิดพลาดในการลบ");
      }
    } catch (error) {
      console.error("Error deleting brand:", error);
      alert("เกิดข้อผิดพลาดในการลบยี่ห้อ");
    }
  };
  
  const handleEditBrand = (index) => {
    console.log("🔹 Editing ID:", brands[index]?.id); // ✅ Debug ค่า ID
  
    if (!brands[index]?.id) {
      alert("❌ ID ของยี่ห้อไม่ถูกต้อง");
      return;
    }
  
    setEditingBrandId(brands[index].id); // ✅ เก็บค่า ID สำหรับการอัปเดต
    setEditingBrand(brands[index].name || "");
    setEditingBrandIndex(index);
  };
  
  const handleSaveBrand = async (id) => {
    if (!id) {
        alert("❌ ID ไม่สามารถเว้นว่างได้");
        console.error("❌ ID ที่ส่งไป:", id); // Debug ID
        return;
    }

    if (!editingBrandName || !editingBrandName.trim()) {
        alert("❌ ชื่อยี่ห้อไม่สามารถเว้นว่างได้");
        return;
    }

    try {
        console.log("📌 Sending update request:", { id, name: editingBrandName });

        const response = await axios.put(`http://localhost:5001/api/brands/${id}`, {
            name: editingBrandName.trim(),
        });

        if (response.data.success) {
            alert("✅ แก้ไขยี่ห้อสำเร็จ");

            // ✅ โหลดข้อมูลใหม่จากฐานข้อมูล
            await fetchBrands(); 

            // ✅ รีเซ็ตค่า state หลังจากแก้ไขสำเร็จ
            setEditingBrandName(""); 
            setEditingBrandId(null); 
            setEditingBrandIndex(null); 
        } else {
            alert("❌ " + response.data.message);
        }
    } catch (error) {
        console.error("❌ Error editing brand:", error);
        alert("❌ เกิดข้อผิดพลาดในการแก้ไขยี่ห้อ");
    }
};

useEffect(() => {
  if (showBrandModal) {
      fetchBrands(); // โหลดข้อมูลใหม่ทุกครั้งที่เปิด Modal
  }
}, [showBrandModal]);

  const handleShowBrandModal = (index) => {
    setShowBrandModal(true); // เปิด Modal
};

const handleCloseBrandModal = () => {
    setShowBrandModal(false);
    setEditingBrandIndex(null);
    setEditingBrandName("");
  };

 useEffect(() => {
  const fetchData = async () => {
    try {
      const categoryRes = await axios.get("/api/categories");
      const equipmentRes = await axios.get("/api/equipments");

      console.log("Categories Data:", categoryRes.data); // ตรวจสอบข้อมูลประเภท
      console.log("Equipments Data:", equipmentRes.data); // ตรวจสอบข้อมูลอุปกรณ์

      if (categoryRes.data.success) setCategories(categoryRes.data.data);
      if (equipmentRes.data.success) setEquipments(equipmentRes.data.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  fetchData();
}, []);

  const handleShowAddProductForm = () => {
    setShowAddProductModal(true); // แสดง Modal
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    
    console.log("📌 formData ที่ส่งไป API:", formData); // ตรวจสอบข้อมูลที่ส่งไป API
    
    if (!formData.equipment || !formData.category || !formData.brand || !formData.inventory_number) {
      alert("❌ กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    try {
        const response = await axios.post("http://localhost:5001/api/products", formData);
        console.log("📌 คำตอบจากเซิร์ฟเวอร์:", response.data); // ตรวจสอบว่ามีการตอบกลับอะไรจาก API

        if (response.data.success) {
            alert("✅ เพิ่มข้อมูลสำเร็จ!");
            setShowAddProductModal(false);
            fetchProducts(); // โหลดข้อมูลใหม่
        } else {
            alert(`❌ ${response.data.message}`);
        }
    } catch (error) {
        console.error("❌ Error adding product:", error.response?.data || error);
        alert("❌ เกิดข้อผิดพลาดในการเพิ่มข้อมูล");
    }
};

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/products");
      if (response.data.success) {
        setProducts(response.data.data);
        console.log("Products:", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  const fetchDropdownData = async () => {
    try {
        const equipmentResponse = await axios.get("http://localhost:5001/api/products");
        const categoryResponse = await axios.get("http://localhost:5001/api/categories");
        const brandResponse = await axios.get("http://localhost:5001/api/brands");

        console.log("📌 Equipment API Response:", equipmentResponse.data); // ✅ Debug Response
        console.log("📌 Category API Response:", categoryResponse.data);
        console.log("📌 Brand API Response:", brandResponse.data);

        if (equipmentResponse.data.success) {
            const uniqueEquipments = equipmentResponse.data.data
                .filter((item) => item.name) // ✅ กรองข้อมูลที่ไม่มีชื่อออก
                .map((item) => ({
                    id: item.id,
                    name: item.name || item.material || "N/A",
                }))
                .filter((item, index, self) =>
                    index === self.findIndex((t) => t.name === item.name)
                ); // ✅ กรองค่าซ้ำออก

            console.log("📌 อุปกรณ์ที่ถูกโหลด:", uniqueEquipments);
            setEquipments(uniqueEquipments);
        }

        if (categoryResponse.data.success) {
            setCategories(categoryResponse.data.data.map((item) => ({
                id: item.id,
                name: item.category_name,
            })));
        }

        if (brandResponse.data.success) {
            setBrands(brandResponse.data.data.map((item) => ({
                id: item.id,
                name: item.name,
            })));
        }
    } catch (error) {
        console.error("❌ Error fetching dropdown data:", error);
    }
};

useEffect(() => {
    fetchDropdownData();
}, []);

  
  
  useEffect(() => {
    fetchProducts();
  }, []);
  
const handleShowAddProductModal = () => setShowAddProductModal(true);

useEffect(() => {
  fetchDropdownData(); // ดึงข้อมูลทั้งหมดสำหรับ dropdown
}, []);


const handleCloseAddProductModal = () => {
  setShowAddProductModal(false); // ปิด Modal
};

const [formData, setFormData] = useState({
  model: "",
  name: "",
  category: "",
  brand: "",
  serial_number: "-",
  inventory_number: 1,
  details: "-",
  equipment_number: "-"
});


const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prevState) => ({
    ...prevState,
    [name]: value.trim() === "_" ? "" : value, // ✅ ป้องกัน `_` กลายเป็นค่าภายใน input
  }));
};



const handleSubmit = async (e) => {
  e.preventDefault();

  // ✅ กำหนดค่าตามที่คุณต้องการ
  const updatedFormData = {
    model: formData.model || formData.name || "-",  // ชื่อสินค้า = model
    category_name: formData.category || "-", // ประเภท
    name: formData.equipment || "-",  // อุปกรณ์
    brand_name: formData.brand || "-",  // ยี่ห้อ
    serial_number: formData.serial_number || "-",  // Serial
    equipment_number: formData.equipment_number || "-",  // หมายเลขครุภัณฑ์
    inventory_number: formData.inventory_number || 1, // จำนวนสินค้า (ค่าเริ่มต้น = 1)
    details: formData.details || "-", // รายละเอียด
  };

  console.log("📌 formData ที่จะส่งไป API:", updatedFormData); // ✅ Debug ค่า formData
  
  // ✅ ตรวจสอบว่ามีค่าทุกช่องที่จำเป็น
  if (!updatedFormData.name || !updatedFormData.category_name || !updatedFormData.brand_name || !updatedFormData.inventory_number) {
      console.error("❌ ข้อมูลที่ขาด:", {
          model: updatedFormData.model,
          category_name: updatedFormData.category_name,
          name: updatedFormData.name,
          brand_name: updatedFormData.brand_name,
          serial_number: updatedFormData.serial_number,
          equipment_number: updatedFormData.equipment_number,
          inventory_number: updatedFormData.inventory_number
      });
      alert("❌ กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
  }

  try {
      const response = await axios.post("http://localhost:5001/api/products", updatedFormData);
      console.log("📌 คำตอบจากเซิร์ฟเวอร์:", response.data); // ✅ Debug คำตอบจาก API

      if (response.data.success) {
          alert("✅ เพิ่มข้อมูลสำเร็จ!");
          setShowAddProductModal(false);
          fetchProducts(); // โหลดข้อมูลใหม่
      } else {
          alert(`❌ ${response.data.message}`);
      }
  } catch (error) {
      console.error("❌ Error adding product:", error.response?.data || error);
      alert("❌ เกิดข้อผิดพลาดในการเพิ่มข้อมูล");
  }
};


useEffect(() => {
  console.log("Equipments:", equipments);
  console.log("Categories:", categories);
  console.log("Brands:", brands);
}, [equipments, categories, brands]);

useEffect(() => {
  if (showModal || showEquipmentsModal || showBrandModal || showAddProductModal || showEditModal) {
    document.body.classList.add('modal-open');
  } else {
    document.body.classList.remove('modal-open');
  }
}, [showModal, showEquipmentsModal, showBrandModal, showAddProductModal, showEditModal]);


  return (
    <div>
      <ITDashboard />
      <div className="settings-container">
          <h1><FontAwesomeIcon icon={faCog} style={{ marginRight: "10px" }} /> การตั้งค่า</h1>
          <div className="actions-container">
          <button
  className="delete-selected-btn"
  onClick={handleDeleteSelected}
  disabled={selectedItems.length === 0} // ปิดปุ่มถ้าไม่มีการเลือก
>
  🗑️ ลบที่เลือก ({selectedItems.length})
</button>

            <button className="custom-btn" onClick={handleShowModal}>
              <span className="custom-btn-icon">🖉</span> ประเภท
            </button>
            <button className="custom-btn" onClick={handleShowEquipmentsModal}>
              <span className="custom-btn-icon">🖉</span> อุปกรณ์
            </button>
            <button className="custom-btn" onClick={() => handleShowBrandModal("brand")}>
              <span className="custom-btn-icon">🖉</span> ยี่ห้อ
            </button>
            <button className="add-product-btn" onClick={handleShowAddProductForm}>
              <span className="material-icons">add</span>
              เพิ่ม
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
                <th>serial</th>
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
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                  </td>
                  <td>{item.material}</td>
                  <td>{item.category || "-"}</td>
                  <td>{item.equipment}</td>
                  <td>{item.brand}</td>
                  <td>{item.equipment_number}</td>
                  <td>{item.serial_number}</td>
                  <td>{item.inventory_number}</td>
                  <td>{item.remaining}</td> {/* จำนวน */}
                  <td>{item.details || "ไม่มีรายละเอียด"}</td> {/* เพิ่มการแสดงผล */}
                  <td>
                    <button className="edit-btn" onClick={() => handleEditClick(item)}>
                      แก้ไข
                    </button>
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
  {equipments.length > 0 ? (
    equipments.map((equipment, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>
          {editingEquipmentRow === index ? (
            <input
              type="text"
              value={newEquipment}
              onChange={(e) => setNewEquipment(e.target.value)}
            />
          ) : (
            equipment.equipment
          )}
        </td>
        <td>
          {editingEquipmentRow === index ? (
            <>
              <button className="save-btn" onClick={() => handleSaveEquipment(index)}>
                บันทึก
              </button>
              <button className="cancel-btn" onClick={() => setEditingEquipmentRow(null)}>
                ยกเลิก
              </button>
            </>
          ) : (
            <>
              <button className="edit-btn" onClick={() => handleEditEquipment(index)}>
                แก้ไข
              </button>
              <button className="delete-btn" onClick={() => handleDeleteEquipment(index)}>
                ลบ
              </button>
            </>
          )}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="3">ไม่มีข้อมูลอุปกรณ์</td>
    </tr>
  )}
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
                        <button className="save-btn" onClick={() => handleSaveBrand(brand.id)}>บันทึก</button>
                        <button className="cancel-btn" onClick={() => setEditingBrandIndex(null)}>ยกเลิก</button>
                    </>
                ) : (
                    <>
                        <button className="edit-btn" onClick={() => handleEditBrand(index)}>แก้ไข</button>
                        <button className="delete-btn" onClick={() => handleDeleteBrand(brand.id)}>ลบ</button>
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
      {showEditModal && currentEditItem && (
  <div className="modal">
    <div className="modal-content">
      <h2>แก้ไขรายละเอียด</h2>
      <button className="close-btn" onClick={() => setShowEditModal(false)}>
        X
      </button>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <div className="form-grid">
          <div className="form-row">
            <label>ชื่อ:</label>
            <input
              type="text"
              value={currentEditItem.name}
              onChange={(e) =>
                setCurrentEditItem({ ...currentEditItem, name: e.target.value })
              }
            />
          </div>
          <div className="form-row">
            <label>ประเภท:</label>
            <select
              value={currentEditItem.category}
              onChange={(e) =>
                setCurrentEditItem({
                  ...currentEditItem,
                  category: e.target.value,
                })
              }
            >
              <option value="">เลือกประเภท</option>
              {filters.categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <label>อุปกรณ์:</label>
            <select
              value={currentEditItem.equipment}
              onChange={(e) =>
                setCurrentEditItem({
                  ...currentEditItem,
                  equipment: e.target.value,
                })
              }
            >
              <option value="">เลือกอุปกรณ์</option>
              {filters.equipment.map((equip, index) => (
                <option key={index} value={equip}>
                  {equip}
                </option>
              ))}
            </select>
          </div>
          <div className="form-row">
  <label>ยี่ห้อ:</label>
  <select
    value={currentEditItem.brand_name}
    onChange={(e) =>
      setCurrentEditItem({ ...currentEditItem, brand_name: e.target.value })
    }
  >
    {/* แสดงยี่ห้อในฐานข้อมูล */}
    {filters.brands.map((brand, index) => (
      <option key={index} value={brand}>
        {brand}
      </option>
    ))}
  </select>
</div>
          <div className="form-row">
            <label>หมายเลขครุภัณฑ์:</label>
            <input
              type="text"
              value={currentEditItem.equipment_number}
              onChange={(e) =>
                setCurrentEditItem({
                  ...currentEditItem,
                  equipment_number: e.target.value,
                })
              }
            />
          </div>
          <div className="form-row">
            <label>Serial:</label>
            <input
              type="text"
              value={currentEditItem.serial_number}
              onChange={(e) =>
                setCurrentEditItem({
                  ...currentEditItem,
                  serial_number: e.target.value,
                })
              }
            />
          </div>
          <div className="form-row">
            <label>จำนวน:</label>
            <input
              type="number"
              value={currentEditItem.inventory_number}
              onChange={(e) =>
                setCurrentEditItem({
                  ...currentEditItem,
                  inventory_number: e.target.value,
                })
              }
            />
          </div>
          <div className="form-row">
            <label>คงเหลือ:</label>
            <input
              type="number"
              value={currentEditItem.remaining}
              readOnly
            />
          </div>
        </div>
        <div className="form-row">
          <label>รายละเอียด:</label>
          <textarea
            value={currentEditItem.details || ""}
            onChange={(e) =>
              setCurrentEditItem({ ...currentEditItem, details: e.target.value })
            }
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="save-btn">
            บันทึก
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => setShowEditModal(false)}
          >
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  </div>
)}
{showAddProductModal && (
  <div className="modal">
    <div className="modal-content">
      <h2>เพิ่มวัสดุ</h2>
      <button className="close-btn" onClick={handleCloseAddProductModal}>
                &times;
              </button>
      <form onSubmit={handleAddProduct}>
        <div className="form-grid">
          {/* ชื่อสินค้า */}
          <div className="form-row">
            <label>ชื่อสินค้า:</label>
            <input
              type="text"
              name="name"
              placeholder="กรอกชื่อสินค้า"
              value={formData.name || ""}
              onChange={handleChange}
              required
            />
          </div>

          {/* ประเภท */}
          <div className="form-row">
            <label>ประเภท:</label>
            <select name="category" value={formData.category || ""} onChange={handleChange} required>
  <option value="">เลือกประเภท</option>
  {categories.length > 0 ? (
    categories.map((category) => (
      <option key={category.id} value={category.name}>
        {category.name}
      </option>
    ))
  ) : (
    <option value="">ไม่มีข้อมูล</option>
  )}
</select>

          </div>

          {/* อุปกรณ์ */}
          
          <div className="form-row">
  <label>อุปกรณ์:</label>
  <select 
    name="equipment" 
    value={formData.equipment || ""} 
    onChange={(e) => {
        console.log("📌 เลือกอุปกรณ์:", e.target.value); // ✅ Debug ค่าที่เลือก
        setFormData(prevFormData => ({
            ...prevFormData,
            equipment: e.target.value
        }));
    }}
  >
    <option value="">เลือกอุปกรณ์</option>
    {equipments.length > 0 ? (
        equipments.map((equipment, index) => (
            <option key={index} value={equipment.equipment || ""}>
                {equipment.equipment || "ไม่มีข้อมูล"}
            </option>
        ))
    ) : (
        <option value="">ไม่มีข้อมูล</option>
    )}
  </select>
</div>


          {/* ยี่ห้อ */}
          <div className="form-row">
            <label>ยี่ห้อ:</label>
            <select
              name="brand"
              value={formData.brand || ""}
              onChange={handleChange}
              required
            >
              <option value="">เลือกยี่ห้อ</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.name}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

          {/* หมายเลขครุภัณฑ์ */}
          <div className="form-row">
            <label>หมายเลขครุภัณฑ์:</label>
            <input
              type="text"
              name="equipment_number"
              placeholder="กรอกหมายเลขครุภัณฑ์"
              value={formData.equipment_number || ""}
              onChange={handleChange}
              required
            />
          </div>

          {/* Serial */}
          <div className="form-row">
            <label>Serial:</label>
            <input
              type="text"
              name="serial_number"
              placeholder="กรอก Serial Number"
              value={formData.serial_number || ""}
              onChange={handleChange}
            />
          </div>

          {/* จำนวน */}
          <div className="form-row">
            <label>จำนวน:</label>
            <input
              type="number"
              name="inventory_number"
              placeholder="ระบุจำนวน"
              min="1"
              value={formData.inventory_number || 1}
              onChange={handleChange}
              required
            />
          </div>

          {/* รายละเอียด */}
          <div className="form-row">
            <label>รายละเอียด:</label>
            <textarea
              name="details"
              placeholder="กรอกรายละเอียดสินค้า (ถ้ามี)"
              value={formData.details || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="save-btn">
            บันทึก
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => setShowAddProductModal(false)}
          >
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default Settings;
