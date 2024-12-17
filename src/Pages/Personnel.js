import React from "react";
import ITDashboard from "./ITDashboard";

const Personnel = () => {
  return (
    <div>
      {/* เรียกใช้ ITDashboard */}
      <ITDashboard />
   {/* เนื้อหาของหน้าคลังวัสดุ */}
   <div className="personnel-content">   
   <h1>หน้านี้สำหรับฟังก์ชัน บุคลากร </h1>;
  </div>
    </div>
  );
};

export default Personnel;
