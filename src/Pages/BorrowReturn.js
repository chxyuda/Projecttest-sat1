import React from "react";
import ITDashboard from "./ITDashboard";

const BorrowReturn = () => {
  return (
    <div>
      {/* เรียกใช้ ITDashboard */}
      <ITDashboard />
   {/* เนื้อหาของหน้าคลังวัสดุ */}
   <div className="borrowreturn-content">   
   <h1>หน้านี้สำหรับฟังก์ชัน ยืม/คืน </h1>;
  </div>
    </div>
  );
};

export default BorrowReturn;
