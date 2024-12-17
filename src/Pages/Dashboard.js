import React from "react";
import ITDashboard from "./ITDashboard";

const Dashboard = () => {
  return (
    <div>
      {/* เรียกใช้ ITDashboard */}
      <ITDashboard />
   {/* เนื้อหาของหน้าคลังวัสดุ */}
   <div className="กashboard-content">   
   <h1>หน้านี้สำหรับฟังก์ชัน Dashboard </h1>;
  </div>
    </div>
  );
};

export default Dashboard;
