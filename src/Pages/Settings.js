import React from "react";
import ITDashboard from "./ITDashboard";

const Settings = () => {
  return (
    <div>
      {/* เรียกใช้ ITDashboard */}
      <ITDashboard />
   {/* เนื้อหาของหน้าคลังวัสดุ */}
   <div className="settings-content">   
   <h1>หน้านี้สำหรับฟังก์ชัน ตั้งค่า </h1>;
  </div>
    </div>
  );
};

export default Settings;
