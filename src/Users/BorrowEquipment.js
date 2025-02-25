import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarehouse } from '@fortawesome/free-solid-svg-icons';
import UserDashboard from "./UserDashboard.js";
import "./BorrowEquipment.css";


const BorrowEquipment = () => {
    const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [category, setCategory] = useState("all");
  const [device, setDevice] = useState("all");
  const [brand, setBrand] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showDetails, setShowDetails] = useState(false); // สำหรับควบคุมการแสดง Modal
  const [selectedItem, setSelectedItem] = useState(null); // สำหรับเก็บข้อมูลอุปกรณ์ที่เลือก
  const [showBorrowForm, setShowBorrowForm] = useState(false);
  const [requests, setRequests] = useState([]);
  const [borrowFormData, setBorrowFormData] = useState({
    borrowerName: '',
    department: '',
    phone: '',
    email: '',
    material: '',
    category: '',
    equipment: '',
    brand: '',
    equipmentNumber: '',
    inventoryNumber: '',
    remaining: '',
    quantity: '',
    note: '',
    requestDate: new Date().toISOString().split('T')[0],
  });
  const [userData, setUserData] = useState({
    borrowerName: '',
    department: '',
    phone: '',
    email: ''
  });

  const storedUser = JSON.parse(localStorage.getItem('user')) || {};

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("🔍 User from LocalStorage:", user);
  
    if (user) {
      setUserData({
        borrowerName: user.fullName || "ไม่พบข้อมูล",
        department: user.department_name || "ไม่พบข้อมูล",
        phone: user.phone || "",
        email: user.email || ""
      });
    } else {
      console.warn("⚠️ No user found in localStorage");
    }
  }, []);
  
  const [showLoanForm, setShowLoanForm] = useState(false);
  const [loanFormData, setLoanFormData] = useState({
    borrowerName: '',
    department: '',
    phone: '',
    email: '',
    material: '',
    type: '',
    equipment: '',
    brand: '',
    remaining: '',
    quantity_requested: '',
    note: '',
    requestDate: new Date().toISOString().split('T')[0],
    returnDate: '',
  });
  

// คำนวณ index สำหรับแบ่งหน้า
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

// เปลี่ยนหน้า
const paginate = (pageNumber) => setCurrentPage(pageNumber);

// ไปหน้าก่อนหน้า
const goBack = () => {
  if (currentPage > 1) setCurrentPage(currentPage - 1);
};

// ไปหน้าถัดไป
const goNext = () => {
  if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
    setCurrentPage(currentPage + 1);
  }
};

// จำนวนหน้าทั้งหมด
const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
        try {
            const [productsRes, categoriesRes, brandsRes] = await Promise.all([
                axios.get("http://localhost:5001/api/products"),
                axios.get("http://localhost:5001/api/categories"),
                axios.get("http://localhost:5001/api/brands"),
            ]);
            setData(productsRes.data.data || []);
            setFilteredData(productsRes.data.data || []);
            setCategories(categoriesRes.data.data || []);
            setBrands(brandsRes.data.data || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    fetchData();
}, []);
  
  const handleFilter = () => {
    console.log("Original Data:", data);
    console.log("Filters:", { category, device, brand });
  
    if (data.length === 0) {
      console.warn("No data available.");
      return;
    }
  
    const filtered = data.filter((item) => {
      const matchCategory = category === "all" || item.category === category;
      const matchDevice = device === "all" || item.equipment === device;
      const matchBrand =
        brand === "all" || item.brand.toLowerCase() === brand.toLowerCase();
  
      return matchCategory && matchDevice && matchBrand;
    });
  
    console.log("Filtered Data:", filtered);
  
    if (filtered.length === 0) {
      console.warn("No data matched the filters.");
    }
  
    setFilteredData(filtered);
    setCurrentPage(1);
  
    // เพิ่มประวัติการค้นหา
    const newSearch = {
      category: category !== "all" ? category : "ประเภททั้งหมด",
      device: device !== "all" ? device : "อุปกรณ์ทั้งหมด",
      brand: brand !== "all" ? brand : "ยี่ห้อทั้งหมด",
      timestamp: new Date().toLocaleString("th-TH"),
    };
    setSearchHistory((prevHistory) => [newSearch, ...prevHistory]);
  };
  
  const handleShowHistory = () => {
    setShowHistory(true);
  };
  
  const handleCloseHistory = () => {
    setShowHistory(false);
  };

  useEffect(() => {
    console.log("Show History State:", showHistory);
    console.log("Show Details State:", showDetails);
  }, [showHistory, showDetails]);
  


  const handleShowDetails = async (item) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/products/${item.id}`); // ดึงข้อมูลล่าสุดของสินค้านี้จากฐานข้อมูล
      setSelectedItem(response.data); // เซ็ตข้อมูลใหม่ที่ได้จากฐานข้อมูล
      setShowDetails(true);
    } catch (error) {
      console.error('Error fetching product details:', error);
      alert('ไม่สามารถโหลดข้อมูลล่าสุดได้');
    }
  };
  
  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedItem(null);
  };
  
  const handleBorrow = (item) => {
    console.log("ทำรายการเบิก: ", item);
  };
  
  const handleLoan = (item) => {
    console.log("ทำรายการยืม: ", item);
  };

  useEffect(() => {
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/profile?username=${storedUser.username}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  fetchUserProfile();
}, []);

  
const handleShowBorrowForm = async (row) => {
  try {
    const response = await axios.get(`http://localhost:5001/api/products/${row.id}`);
    const updatedRemaining = response.data.remaining || 0;

    setBorrowFormData({
      borrowerName: userData.fullName || "ไม่พบข้อมูล",
      department: userData.department_name || "ไม่พบข้อมูล",
      phoneExt: userData.phone || storedUser?.phone || "",
      email: userData.email || storedUser?.email || "",
      material: row.material,
      category: row.category,
      equipment: row.equipment,
      brand: row.brand,
      equipmentNumber: row.equipment_number || "-",
      serialNumber: row.serial_number || "-",
      remaining: updatedRemaining,
      quantity: '',
      note: '',
      requestDate: new Date().toISOString().split('T')[0],
    });

    console.log("📌 Borrow Form Data:", borrowFormData);
    setShowBorrowForm(true);
  } catch (error) {
    console.error('❌ Failed to load updated stock:', error);
    alert('ไม่สามารถโหลดข้อมูลจำนวนคงเหลือล่าสุดได้');
  }
};


const handleSubmitBorrow = async (e) => {
  e.preventDefault();

  const user = userData || JSON.parse(localStorage.getItem('user')) || {}; // ✅ โหลดข้อมูลจาก LocalStorage

  console.log("🔍 ผู้ใช้ที่ใช้ในฟอร์มเบิก:", user); // ✅ Debug ตรวจสอบข้อมูล

  const dataToSend = {
    user_id: user.id || storedUser.id,  // ✅ ใช้ user.id หรือ storedUser.id
    borrower_name: user.fullName || storedUser.fullName || "", // ✅ ใช้ fullName ที่ตรงกับฐานข้อมูล
    department: user.department_name || "",
    phone: user.phone || "",
    email: user.email || "",
    material: borrowFormData.material,
    category: borrowFormData.category,
    equipment: borrowFormData.equipment,
    brand: borrowFormData.brand,
    equipmentNumber: borrowFormData.equipmentNumber,
    serialNumber: borrowFormData.serialNumber,
    quantity_requested: parseInt(borrowFormData.quantity, 10) || 0,
    note: borrowFormData.note || '',
    requestDate: borrowFormData.requestDate,
  };

  console.log("📤 Data Sent to API:", dataToSend);

  try {
    await axios.post('http://localhost:5001/api/requests', dataToSend);
    alert('บันทึกคำขอสำเร็จ');
    setShowBorrowForm(false);
  } catch (error) {
    console.error('❌ Error:', error.response ? error.response.data : error.message);
    alert('เกิดข้อผิดพลาด: ' + (error.response?.data?.error || 'ไม่ทราบสาเหตุ'));
  }
};


  const handleCloseBorrowForm = () => {
    setShowBorrowForm(false); // หรือฟังก์ชันที่คุณใช้ซ่อนฟอร์ม
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/requests');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };
  
    fetchRequests();
  }, []);
  
  const handleShowLoanForm = async (row) => {
    try {
      // ดึงข้อมูลจำนวนคงเหลือล่าสุดจากฐานข้อมูล โดยใช้ id ของวัสดุ (row.id)
      const response = await axios.get(`http://localhost:5001/api/products/${row.id}`);
  
      const updatedRemaining = response.data.remaining; // จำนวนคงเหลือล่าสุด
  
      setLoanFormData({
        borrowerName: userData.fullName,
        department: userData.department_name,
        phone: userData.phone,
        email: userData.email,
        material: row.material,
        category: row.category,
        equipment: row.equipment,
        brand: row.brand,
        remaining: updatedRemaining,
        quantity_requested: '',
        note: '',
        requestDate: new Date().toISOString().split('T')[0],
        returnDate: '',
        equipment_number: row.equipment_number || '', 
        serial_number: row.serial_number || ''
      });
      
     
  
      setShowLoanForm(true);
    } catch (error) {
      console.error('โหลดข้อมูลจำนวนคงเหลือล่าสุดล้มเหลว:', error);
      alert('ไม่สามารถโหลดข้อมูลจำนวนคงเหลือล่าสุดได้');
    }
  };
  
  const handleSubmitLoan = async (e) => {
    e.preventDefault();
  
    const userData = JSON.parse(localStorage.getItem('user'));

    const dataToSend = {
      user_id: userData.id,
      borrower_name: loanFormData.borrowerName,
      department: loanFormData.department,
      phone: loanFormData.phone || '',
      email: loanFormData.email,
      material: loanFormData.material,
      category: loanFormData.category,
      equipment: loanFormData.equipment,
      brand: loanFormData.brand,
      quantity_requested: parseInt(loanFormData.quantity_requested, 10) || 0,
      note: loanFormData.note || '',
      request_date: loanFormData.requestDate,
      return_date: loanFormData.returnDate,
      equipment_number: loanFormData.equipment_number,
      serial_number: loanFormData.serial_number
    };
    

    try {
      await axios.post('http://localhost:5001/api/borrow-requests', dataToSend);
      alert('บันทึกคำขอยืมสำเร็จ');
      setShowLoanForm(false);
  
      // อัปเดตข้อมูลสินค้าใหม่ทั้งตารางหลังทำรายการยืม
      const productResponse = await axios.get(`http://localhost:5001/api/products`);
      setData(productResponse.data.data || []);
      setFilteredData(productResponse.data.data || []);
    } catch (error) {
      console.error('เกิดข้อผิดพลาด:', error.response ? error.response.data : error.message);
      alert('เกิดข้อผิดพลาด: ' + (error.response?.data?.error || 'ไม่ทราบสาเหตุ'));
    }
  };
  
  
  const handleCloseLoanForm = () => {
    setShowLoanForm(false);
  };
  
  return (
    <>
      <UserDashboard />
        <div className="BorrowEqui-container">
          <h1 className="BorrowEqui-title">
            <FontAwesomeIcon icon={faWarehouse} className="BorrowEqui-icon" />
            ทำรายการเบิก / ยืม-คืน
          </h1>
          <div className="filter-section">
            <div className="filter-controls">
              <select onChange={(e) => setCategory(e.target.value)}>
                  <option value="all">ประเภททั้งหมด</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat.category_name}>
                      {cat.category_name}
                    </option>
                  ))}
                </select>
                <select onChange={(e) => setDevice(e.target.value)}>
                  <option value="all">อุปกรณ์ทั้งหมด</option>
                    {[...new Set(data.map((item) => item.equipment))].map((uniqueDevice, index) => (
                      <option key={index} value={uniqueDevice}>
                        {uniqueDevice}
                      </option>
                    ))}
                </select>
                <select onChange={(e) => setBrand(e.target.value)}>
                 <option value="all">ยี่ห้อทั้งหมด</option>
                   {brands.map((brand, index) => (
                     <option key={index} value={brand.name}>
                       {brand.name}
                     </option>
                   ))}
                </select>
                <div className="filter-buttons">
                  <button onClick={handleFilter} className="search-btn">
                    <span className="material-icons">search</span> ค้นหา
                  </button>
                  <button onClick={handleShowHistory} className="history-btn">
                    <span className="material-icons">history</span> ประวัติการค้นหา
                  </button>
                </div>
            </div>
         </div>
         <table className="BorrowEqui-table">
  <thead>
    <tr>
      <th>ชื่อ</th>
      <th>ประเภท</th>
      <th>อุปกรณ์</th>
      <th>ยี่ห้อ</th>
      <th>หมายเลขครุภัณฑ์</th>
      <th>จำนวน</th>
      <th>รายละเอียด</th>
      <th>ทำรายการ</th> {/* ✅ เพิ่มช่องทำรายการ */}
    </tr>
  </thead>
  <tbody>
    {currentItems.length > 0 ? (
      currentItems.map((item, index) => (
        <tr key={index}>
          <td>{item.material}</td>
          <td>{item.category}</td>
          <td>{item.equipment}</td>
          <td>{item.brand}</td>
          <td>{item.equipment_number}</td>
          <td>{item.inventory_number}</td>
          <td>
            <button
              className="BorrowEqui-details-btn"
              onClick={() => handleShowDetails(item)}
            >
              รายละเอียด
            </button>
          </td>
          {/* ✅ เพิ่มปุ่มเบิกและยืม */}
          <td>
  <div className="BorrowEqui-action-buttons">
    <button className="BorrowEqui-borrow-btn" onClick={() => handleShowBorrowForm(item)}>
  เบิก
</button>

<button className="BorrowEqui-loan-btn" onClick={() => handleShowLoanForm(item)}>
    ยืม
    </button>
  </div>
</td>

        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="8">ไม่พบข้อมูล</td>
      </tr>
    )}
  </tbody>
</table>

<div className="BorrowEqui-pagination">
  <button onClick={goBack} disabled={currentPage === 1}>
    ก่อนหน้า
  </button>
  {Array.from({ length: totalPages }, (_, i) => (
    <button
      key={i + 1}
      onClick={() => paginate(i + 1)}
      className={currentPage === i + 1 ? 'active' : ''}
    >
      {i + 1}
    </button>
  ))}
  <button onClick={goNext} disabled={currentPage === totalPages}>
    ถัดไป
  </button>
</div>

          {showHistory && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title">ประวัติการค้นหา</h3>
                  <button onClick={handleCloseHistory} className="BorrowEqui-close-btn">
                    &times;
                  </button>
                </div>
                <table className="history-table">
                  <thead>
                    <tr>
                      <th>ประเภท</th>
                      <th>อุปกรณ์</th>
                      <th>ยี่ห้อ</th>
                      <th>เวลา</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchHistory.map((history, index) => (
                      <tr key={index}>
                        <td>{history.category}</td>
                        <td>{history.device}</td>
                        <td>{history.brand}</td>
                        <td>{history.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
         {/* Modal สำหรับแสดงรายละเอียด */}
         {showDetails && selectedItem && (
            <div className="BorrowEqui-modal-overlay">
            <div className="BorrowEqui-modal-content">
              <div className="BorrowEqui-modal-header">
                <h3 className="BorrowEqui-modal-title">รายละเอียด</h3>
                <button onClick={handleCloseDetails} className="BorrowEqui-close-btn">&times;</button>
              </div>
              <div className="BorrowEqui-modal-details">
                <div className="BorrowEqui-details-section">
                    <p><strong>ชื่อ:</strong> {selectedItem.model}</p>
                    <p><strong>ประเภท:</strong> {selectedItem.category_name}</p>
                    <p><strong>อุปกรณ์:</strong> {selectedItem.name}</p>
                    <p><strong>ยี่ห้อ:</strong> {selectedItem.brand_name}</p>
                  </div>
                  <div className="BorrowEqui-details-section">
                    <p><strong>หมายเลขครุภัณฑ์:</strong> {selectedItem.equipment_number || "-"}</p>
                    <p><strong>Serial:</strong> {selectedItem.serial_number || "-"}</p>
                    <p><strong>จำนวนทั้งหมด:</strong> {selectedItem.inventory_number}</p>
                    <p><strong>คงเหลือ:</strong> {selectedItem.remaining}</p>
                  </div>
                  <div className="BorrowEqui-details-full">
                    <p><strong>รายละเอียดเพิ่มเติม:</strong> {selectedItem.details || "ไม่มีข้อมูลเพิ่มเติม"}</p>
                  </div>
             </div>
           </div>
         </div>
       )}
       {showBorrowForm && (
  <div className="BorrowEqui-modal-overlay">
    <div className="BorrowEqui-modal-content">
      <button className="BorrowEqui-close-btn" onClick={() => setShowBorrowForm(false)}>×</button>
      <h2>รายละเอียดการขอเบิก</h2>

      <form onSubmit={handleSubmitBorrow}>
        {/* กลุ่มข้อมูลผู้ขอเบิก */}
        <div className="form-grid">
          <div className="form-group-rqf">
            <label>ชื่อผู้ขอเบิก:</label>
            <input type="text" value={borrowFormData.borrowerName} readOnly />
          </div>
          <div className="form-group-rqf">
            <label>ฝ่ายสำนัก:</label>
            <input type="text" value={borrowFormData.department} readOnly />
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group-rqf">
            <label>เบอร์โทรภายใน:</label>
            <input type="text" value={borrowFormData.phoneExt} readOnly />
          </div>
          <div className="form-group-rqf">
            <label>Email:</label>
            <input type="text" value={borrowFormData.email} readOnly />
          </div>
        </div>

        {/* กลุ่มข้อมูลวัสดุอุปกรณ์ */}
        <div className="form-grid">
          <div className="form-group-rqf">
            <label>ชื่อวัสดุ:</label>
            <input type="text" value={borrowFormData.material} readOnly />
          </div>
          <div className="form-group-rqf">
            <label>ประเภท:</label>
            <input type="text" value={borrowFormData.category} readOnly />
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group-rqf">
            <label>อุปกรณ์:</label>
            <input type="text" value={borrowFormData.equipment} readOnly />
          </div>
          <div className="form-group-rqf">
            <label>ยี่ห้อ:</label>
            <input type="text" value={borrowFormData.brand} readOnly />
          </div>
        </div>

        {/* กลุ่มหมายเลขครุภัณฑ์และ Serial Number */}
        <div className="form-grid">
          <div className="form-group-rqf">
            <label>หมายเลขครุภัณฑ์:</label>
            <input
              type="text"
              value={borrowFormData.equipmentNumber}
              readOnly
            />
          </div>
          <div className="form-group-rqf">
            <label>Serial Number:</label>
            <input
              type="text"
              value={borrowFormData.serialNumber}
              readOnly
            />
          </div>
        </div>

        {/* จำนวน & หมายเหตุ */}
        <div className="form-grid">
          <div className="form-group-rqf">
            <label>จำนวนคงเหลือ:</label>
            <input type="text" value={borrowFormData.remaining} readOnly />
          </div>
          <div className="form-group-rqf">
            <label>จำนวน:</label>
            <input
              type="number"
              min="1"
              max={borrowFormData.remaining}
              value={borrowFormData.quantity}
              onChange={(e) =>
                setBorrowFormData((prev) => ({ ...prev, quantity: e.target.value }))
              }
              required
            />
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group-rqf">
            <label>หมายเหตุ:</label>
            <input
              type="text"
              value={borrowFormData.note}
              onChange={(e) => setBorrowFormData((prev) => ({ ...prev, note: e.target.value }))}
            />
          </div>
        </div>

        {/* วันที่ขอเบิก */}
        <div className="form-grid">
          <div className="form-group-rqf">
            <label>วันที่ขอเบิก:</label>
            <input
              type="date"
              value={borrowFormData.requestDate}
              onChange={(e) => setBorrowFormData((prev) => ({ ...prev, requestDate: e.target.value }))}
              required
            />
          </div>
        </div>

        {/* ปุ่มบันทึก */}
        <div className="BorrowEqui-submit-container">
          <button className="BorrowEqui-submit-btn" type="submit">
            บันทึกคำขอ
          </button>
        </div>
      </form>
    </div>
  </div>
)}

{showLoanForm && (
  <div className="BorrowEqui-modal-overlay">
    <div className="BorrowEqui-modal-content">
      <button className="BorrowEqui-close-btn" onClick={handleCloseLoanForm}>×</button>
      <h2>รายละเอียดการยืมวัสดุ</h2>
      
      <form onSubmit={handleSubmitLoan}>
        {/* เริ่มต้นการจัดเป็น 2 คอลัมน์ */}
        <div className="form-grid">
          <div className="form-group-rqf">
            <label>ชื่อผู้ยืม:</label>
            <input type="text" value={loanFormData.borrowerName} readOnly />
          </div>
          <div className="form-group-rqf">
            <label>ฝ่ายสำนัก:</label>
            <input type="text" value={loanFormData.department} readOnly />
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group-rqf">
            <label>เบอร์โทรภายใน:</label>
            <input type="text" value={loanFormData.phone} readOnly />
          </div>
          <div className="form-group-rqf">
            <label>Email:</label>
            <input type="text" value={loanFormData.email} readOnly />
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group-rqf">
            <label>ชื่อวัสดุ:</label>
            <input type="text" value={loanFormData.material} readOnly />
          </div>
          <div className="form-group-rqf">
            <label>ประเภท:</label>
            <input type="text" value={loanFormData.category} readOnly />
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group-rqf">
            <label>อุปกรณ์:</label>
            <input type="text" value={loanFormData.equipment} readOnly />
          </div>
          <div className="form-group-rqf">
            <label>ยี่ห้อ:</label>
            <input type="text" value={loanFormData.brand} readOnly />
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group-rqf">
            <label>หมายเลขครุภัณฑ์:</label>
            <input
              type="text"
              value={loanFormData.equipment_number}
              onChange={(e) =>
                setLoanFormData((prev) => ({ ...prev, equipment_number: e.target.value }))
              }
            />
          </div>
          <div className="form-group-rqf">
            <label>Serial Number:</label>
            <input
              type="text"
              value={loanFormData.serial_number}
              onChange={(e) =>
                setLoanFormData((prev) => ({ ...prev, serial_number: e.target.value }))
              }
            />
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group-rqf">
            <label>จำนวนคงเหลือ:</label>
            <input type="text" value={loanFormData.remaining} readOnly />
          </div>
          <div className="form-group-rqf">
            <label>จำนวน:</label>
            <input
              type="number"
              min="1"
              max={loanFormData.remaining}
              value={loanFormData.quantity_requested}
              onChange={(e) =>
                setLoanFormData((prev) => ({ ...prev, quantity_requested: e.target.value }))
              }
              required
            />
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group-rqf">
            <label>หมายเหตุ:</label>
            <input
              type="text"
              value={loanFormData.note}
              onChange={(e) => setLoanFormData((prev) => ({ ...prev, note: e.target.value }))}
            />
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group-rqf">
            <label>วันที่ยืม:</label>
            <input
              type="date"
              value={loanFormData.requestDate}
              onChange={(e) => setLoanFormData((prev) => ({ ...prev, requestDate: e.target.value }))}
              required
            />
          </div>
          <div className="form-group-rqf">
            <label>วันที่คืน:</label>
            <input
              type="date"
              value={loanFormData.returnDate}
              onChange={(e) => setLoanFormData((prev) => ({ ...prev, returnDate: e.target.value }))}
              required
            />
          </div>
        </div>

        <button className="BorrowEqui-submit-btn" type="submit">
          บันทึกคำขอ
        </button>
      </form>
    </div>
  </div>
)}


      </div>
    </>
  );  
};

export default BorrowEquipment;