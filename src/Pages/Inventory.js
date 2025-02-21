import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Inventory.css";
import ITDashboard from "./ITDashboard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarehouse } from '@fortawesome/free-solid-svg-icons';


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
  
        console.log("Products Response:", productsResponse.data.data);
        console.log("Categories Response:", categoriesResponse.data.data);
        console.log("Brands Response:", brandsResponse.data.data);
  
        setData(productsResponse.data.data || []);
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

  useEffect(() => {
    console.log("Show History State:", showHistory);
    console.log("Show Details State:", showDetails);
  }, [showHistory, showDetails]);
  

  const goBack = () => {
    if (currentPage > 1) {
      console.log("ย้อนกลับไปยังหน้า:", currentPage - 1); // เพิ่มข้อความเพื่อ debug
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

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
  
  
  return (
    <>
      <ITDashboard />
        <div className="inventory-container">
          <h1 className="inventory-title">
            <FontAwesomeIcon icon={faWarehouse} className="inventory-icon" />
            คลังวัสดุ / รายการ
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
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title">ประวัติการค้นหา</h3>
                  <button onClick={handleCloseHistory} className="close-btn">
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
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title">รายละเอียด</h3>
                  <button onClick={handleCloseDetails} className="close-btn">&times;</button>
                </div>
                <div className="modal-details">
                  <div className="details-section">
                    <p><strong>ชื่อ:</strong> {selectedItem.model}</p>
                    <p><strong>ประเภท:</strong> {selectedItem.category_name}</p>
                    <p><strong>อุปกรณ์:</strong> {selectedItem.name}</p>
                    <p><strong>ยี่ห้อ:</strong> {selectedItem.brand_name}</p>
                  </div>
                  <div className="details-section">
                    <p><strong>หมายเลขครุภัณฑ์:</strong> {selectedItem.equipment_number || "-"}</p>
                    <p><strong>Serial:</strong> {selectedItem.serial_number || "-"}</p>
                    <p><strong>จำนวนทั้งหมด:</strong> {selectedItem.inventory_number}</p>
                    <p><strong>คงเหลือ:</strong> {selectedItem.remaining}</p>
                  </div>
                  <div className="details-full">
                    <p><strong>รายละเอียดเพิ่มเติม:</strong> {selectedItem.details || "ไม่มีข้อมูลเพิ่มเติม"}</p>
                  </div>
             </div>
           </div>
         </div>
       )}
      </div>
    </>
  );  
};

export default Inventory;