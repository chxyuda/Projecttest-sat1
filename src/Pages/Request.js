import React from "react";
import ITDashboard from "./ITDashboard";

const Request = () => {
  return (
    <div>
      {/* เรียกใช้ ITDashboard */}
      <ITDashboard />
   {/* เนื้อหาของหน้าคลังวัสดุ */}
   <div className="request-content">   
   <h1>หน้านี้สำหรับฟังก์ชัน คำขอ </h1>;
  </div>
    </div>
  );
};

export default Request;
