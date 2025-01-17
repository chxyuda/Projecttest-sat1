import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Inventory.css";
import ITDashboard from "./ITDashboard";

const Inventory = () => {
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
  
  

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get("http://localhost:5001/api/products");
        const categoriesResponse = await axios.get("http://localhost:5001/api/categories");
        const brandsResponse = await axios.get("http://localhost:5001/api/brands");
  
        setData(productsResponse.data.data || []); // ดึงเฉพาะ data ที่ซ้อนอยู่ใน response
        setFilteredData(productsResponse.data.data || []);
        setCategories(categoriesResponse.data.data || []);
        setBrands(brandsResponse.data.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
        setFilteredData([]);
        setCategories([]);
        setBrands([]);
      }
    };
    fetchData();
  }, []);  

  const handleFilter = () => {
    const filters = [
      { key: "category", value: category }, // เปลี่ยน "category_name" เป็น "category" ถ้า API ใช้คีย์นี้
      { key: "equipment", value: device },
      { key: "brand", value: brand },
    ];
  
    const filtered = filters.reduce((acc, filter) => {
      if (filter.value !== "all") {
        return acc.filter((item) => item[filter.key] === filter.value);
      }
      return acc;
    }, data);
  
    console.log("Filtered Data:", filtered); // ตรวจสอบข้อมูลหลังจากกรอง
    setFilteredData(filtered);
    setCurrentPage(1);
  
    const newSearch = {
      category: category !== "all" ? category : "ประเภททั้งหมด",
      device: device !== "all" ? device : "อุปกรณ์ทั้งหมด",
      brand: brand !== "all" ? brand : "ยี่ห้อทั้งหมด",
      timestamp: new Date().toLocaleString("th-TH"),
    };
    setSearchHistory((prevHistory) => [newSearch, ...prevHistory]);
  };
  
  

  const paginate = (pageNumber) => {
    console.log(`เปลี่ยนไปยังหน้า: ${pageNumber}`);
    setCurrentPage(pageNumber);
  };
  
  const indexOfLastItem = currentPage * itemsPerPage; // ดัชนีของแถวสุดท้ายในหน้านั้น
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // ดัชนีของแถวแรกในหน้านั้น
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem); // ดึงข้อมูลเฉพาะหน้าปัจจุบัน


  const handleShowHistory = () => {
  setShowHistory(true);
    };

  const handleCloseHistory = () => {
  setShowHistory(false);
  };

  const goBack = () => {
    if (currentPage > 1) {
      console.log("ย้อนกลับไปยังหน้า:", currentPage - 1); // เพิ่มข้อความเพื่อ debug
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleShowDetails = (item) => {
    setSelectedItem(item);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedItem(null);
  };
  
  
  return (
    <>
      <ITDashboard />
      <div className="inventory-container">
        <h1>คลังวัสดุ / รายการ</h1>
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
        <table className="inventory-table">
          <thead>
            <tr>
              <th>ชื่อ</th>
              <th>ประเภท</th>
              <th>อุปกรณ์</th>
              <th>ยี่ห้อ</th>
              <th>หมายเลขครุภัณฑ์</th>
              <th>จำนวน</th>
              <th>รายละเอียด</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.material}</td> {/* ชื่อ */}
                  <td>{item.category}</td> {/* ประเภท */}
                  <td>{item.equipment}</td> {/* อุปกรณ์ */}
                  <td>{item.brand}</td> {/* ยี่ห้อ */}
                  <td>{item.equipment_number}</td> {/* หมายเลขครุภัณฑ์ */}
                  <td>{item.inventory_number}</td> {/* จำนวน */}
                  <td>
                    <button onClick={() => handleShowDetails(item)} className="details-btn">
                      รายละเอียด
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">ไม่พบข้อมูล</td>
              </tr>
            )}
          </tbody>
        </table>
        {showHistory && (
          <div className="modal-overlay">
            <div className="modal-content1">
              <h3>ประวัติการค้นหา</h3>
              <button onClick={handleCloseHistory} className="close-btn">
                ปิด
              </button>
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
       <div className="pagination">
          <button onClick={goBack} disabled={currentPage === 1}>
            ย้อนกลับ
          </button>
          {Array.from(
            { length: Math.ceil(filteredData.length / itemsPerPage) },
            (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={currentPage === i + 1 ? "active" : ""}
                >
                {i + 1}
              </button>
            ) 
          )}
         {/* Modal สำหรับแสดงรายละเอียด */}
         {showDetails && selectedItem && (
            <div className="modal-overlay">
              <div className="modal-content">
                <button onClick={handleCloseDetails} className="close-btn">ปิด</button>
                  <h3>รายละเอียด</h3>
                    <div className="modal-details">
                      <p><strong>ชื่อ:</strong> {selectedItem.material}</p>
                      <p><strong>ประเภท:</strong> {selectedItem.category}</p>
                      <p><strong>อุปกรณ์:</strong> {selectedItem.equipment}</p>
                      <p><strong>ยี่ห้อ:</strong> {selectedItem.brand}</p>
                      <p><strong>หมายเลขครุภัณฑ์:</strong> {selectedItem.equipment_number}</p>
                      <p><strong>serial:</strong> {selectedItem.serial_number}</p>
                      <p><strong>จำนวนทั้งหมด:</strong> {selectedItem.inventory_number}</p>
                      <p><strong>คงเหลือ:</strong> {selectedItem.remaining}</p>
                      <p><strong>รายละเอียด:</strong> {selectedItem.details || "ไม่มีข้อมูลเพิ่มเติม"}</p>
                    </div>
                </div>
              </div>
            )}
          </div>
      </div>
      </>
  );  
};

export default Inventory;
