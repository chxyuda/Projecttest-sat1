import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import DashboardApprover from "./DashboardApprover.js";
import './DashboardApproverSummary.css';

const DashboardApproverSummary = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [summary, setSummary] = useState({
    totalWithdrawn: 0,
    totalBorrowed: 0,
    totalReturned: 0
  });
  const [chartData, setChartData] = useState(null);

  const borrowReturnChartRef = useRef(null);
  const stockWithdrawalChartRef = useRef(null);

  // ✅ ดึงจำนวนวัสดุที่เบิก
  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://newstock.sat.or.th:5001/api/requests');
      return response.data.length; // นับจำนวนรายการทั้งหมด
    } catch (error) {
      console.error('Error fetching requests:', error);
      return 0;
    }
  };

  // ✅ ดึงจำนวนวัสดุที่ยืม (รวมทุกสถานะ)
  const fetchBorrowRequests = async () => {
    try {
      const response = await axios.get('http://newstock.sat.or.th:5001/api/borrow-requests');
      return response.data.filter(item => 
        item.status.toLowerCase() === 'approved' || 
        item.status.toLowerCase() === 'borrowed'
      ).length;
    } catch (error) {
      console.error('Error fetching borrow requests:', error);
      return 0;
    }
  };

  // ✅ ดึงจำนวนวัสดุที่คืน (เฉพาะที่คืนแล้ว)
  const fetchReturnedRequests = async () => {
    try {
      const response = await axios.get('http://newstock.sat.or.th:5001/api/borrow-requests');
      return response.data.filter(item => item.status.toLowerCase() === 'returned').length;
    } catch (error) {
      console.error('Error fetching returned requests:', error);
      return 0;
    }
  };

  // ✅ ดึงข้อมูลสำหรับกราฟ
  const fetchChartData = async () => {
    try {
      const response = await axios.get('http://newstock.sat.or.th:5001/api/dashboard-charts');
  
      if (response.data && response.data.availableYears) {
        setChartData(response.data);
      } else {
        console.error('API ไม่ส่ง availableYears กลับมา:', response.data);
        setChartData({ availableYears: [] });
      }
    } catch (error) {
      console.error('Error fetching chart data:', error);
      setChartData({ availableYears: [] });
    }
  };
  
  // ✅ โหลดข้อมูลเมื่อ Component เริ่มทำงาน
  useEffect(() => {
    fetchChartData();
  }, []);
  

  // ✅ โหลดข้อมูลเมื่อเปิดหน้า
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [totalWithdrawn, totalBorrowed, totalReturned, charts] = await Promise.all([
          fetchRequests(),
          fetchBorrowRequests(),
          fetchReturnedRequests(),
          fetchChartData(),
        ]);

        setSummary({
          totalWithdrawn,
          totalBorrowed,
          totalReturned,
        });

        setChartData(charts);
      } catch (err) {
        console.error('เกิดข้อผิดพลาด:', err);
      }
    };

    fetchData();
  }, []);

  const fetchBorrowSummary = async () => {
    try {
      const response = await axios.get('http://newstock.sat.or.th:5001/api/borrow-requests');
  
      // ✅ นับทุก status ที่เกี่ยวข้อง
      const totalBorrowed = response.data.filter(
        (request) => 
          request.status.toLowerCase() === 'approved' || 
          request.status.toLowerCase() === 'received' || 
          request.status.toLowerCase() === 'returned'
      ).length;
  
      setSummary((prevSummary) => ({
        ...prevSummary,
        totalBorrowed,
      }));
    } catch (error) {
      console.error('Error fetching borrow summary:', error);
    }
  };
  
  const fetchReturnSummary = async () => {
    try {
      const response = await axios.get('http://newstock.sat.or.th:5001/api/borrow-requests');
  
      // ✅ นับเฉพาะ "คืนของแล้ว"
      const totalReturned = response.data.filter(
        (request) => request.status.toLowerCase() === 'returned'
      ).length;
  
      setSummary((prevSummary) => ({
        ...prevSummary,
        totalReturned,
      }));
    } catch (error) {
      console.error('Error fetching return summary:', error);
    }
  };
  
  // ✅ เรียก API ตอนโหลดหน้า
  useEffect(() => {
    fetchBorrowSummary();
    fetchReturnSummary();
  }, []);
  

  return (
    <>
      <DashboardApprover />

      <div className="dashboard-summary-content">
        <div className="dashboard-summary-title">Dashboard</div>

        {/* Dashboard Boxes */}
        <div className="dashboard-summary-box-container">
          <div className="dashboard-summary-box dashboard-summary-box1">
            <h3>จำนวนวัสดุที่เบิก</h3>
            <p>{summary.totalWithdrawn} รายการ</p>
          </div>
          <div className="dashboard-summary-box dashboard-summary-box2">
            <h3>จำนวนที่ยืม</h3>
            <p>{summary.totalBorrowed} รายการ</p>
          </div>
          <div className="dashboard-summary-box dashboard-summary-box3">
            <h3>จำนวนที่คืน</h3>
            <p>{summary.totalReturned} รายการ</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="dashboard-summary-function-section">
          <h2>กราฟสรุปรายงานประจำปี</h2>
          <p className="dashboard-summary-description">
            เลือกปี พ.ศ. ที่ต้องการเพื่อดูข้อมูลการยืม-คืนวัสดุ และเบิกวัสดุ
          </p>

          <div className="dashboard-summary-year-selector">
  <label htmlFor="yearSelect">เลือกปี พ.ศ.:</label>
  <select
    id="yearSelect"
    value={selectedYear}
    onChange={(e) => setSelectedYear(Number(e.target.value))}
    disabled={!chartData || !chartData.availableYears.length}
  >
    {chartData && chartData.availableYears.length > 0 ? (
      chartData.availableYears.map((year) => (
        <option key={year} value={year}>
          {year + 543} {/* แปลงเป็น พ.ศ. */}
        </option>
      ))
    ) : (
      <option>ไม่มีข้อมูล</option>
    )}
  </select>
</div>
<div className="dashboard-summary-charts">
  <div className="dashboard-summary-chart-container">
    <h3>รายงานการยืม-คืนวัสดุ (รายปี)</h3>
    <canvas ref={borrowReturnChartRef}></canvas>
  </div>

  <div className="dashboard-summary-chart-container">
    <h3>รายงานจำนวนการเบิกวัสดุ (รายปี)</h3>
    <canvas ref={stockWithdrawalChartRef}></canvas>
  </div>
</div>
        </div>
      </div>
    </>
  );
};

export default DashboardApproverSummary;
