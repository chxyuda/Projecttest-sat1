import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Inventory.css";
import ITDashboard from "./ITDashboard";

const Inventory = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [devices, setDevices] = useState([]);
  const [brands, setBrands] = useState([]);
  const [category, setCategory] = useState("all");
  const [device, setDevice] = useState("all");
  const [brand, setBrand] = useState("all");
  const [searchHistory, setSearchHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axios.get("http://localhost:5001/api/products");
        const categoryResponse = await axios.get("http://localhost:5001/api/categories");
        const deviceResponse = await axios.get("http://localhost:5001/api/devices"); // API สำหรับดึงข้อมูลอุปกรณ์
        const brandResponse = await axios.get("http://localhost:5001/api/brands");

        setData(productResponse.data);
        setFilteredData(productResponse.data);
        setCategories(categoryResponse.data);
        setDevices(deviceResponse.data); // ตั้งค่าอุปกรณ์
        setBrands(brandResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleFilter = () => {
    let filtered = data;

    if (category !== "all") {
      filtered = filtered.filter((item) => item.category_name === category);
    }
    if (device !== "all") {
      filtered = filtered.filter((item) => item.device_name === device); // เปลี่ยนฟิลด์เป็น device_name
    }
    if (brand !== "all") {
      filtered = filtered.filter((item) => item.brand_name === brand);
    }

    setFilteredData(filtered);

    const newSearch = {
      category,
      device,
      brand,
      timestamp: new Date().toLocaleString("th-TH"),
    };
    setSearchHistory((prevHistory) => [...prevHistory, newSearch]);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <ITDashboard />
      <div className="inventory-container">
        <h2 className="inventory-title">คลังวัสดุ/ รายการ</h2>
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
              {devices.map((dev, index) => (
                <option key={index} value={dev.device_name}>
                  {dev.device_name}
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
            <button onClick={handleFilter}>ค้นหา</button>
          </div>
          <button className="history-btn">ดูประวัติการค้นหาทั้งหมด</button>
        </div>

        <table className="inventory-table">
          <thead>
            <tr>
              <th>ชื่อสินค้า</th>
              <th>หมายเลขครุภัณฑ์</th>
              <th>ประเภท</th>
              <th>อุปกรณ์</th>
              <th>ยี่ห้อ</th>
              <th>จำนวน</th>
              <th>รายละเอียด</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.serial_number || "-"}</td>
                <td>{item.category_name}</td>
                <td>{item.device_name}</td>
                <td>{item.brand_name}</td>
                <td>{item.inventory_number}</td>
                <td>
                  <button className="details-btn">รายละเอียด</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
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
        </div>
      </div>
    </div>
  );
};

export default Inventory;
