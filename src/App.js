import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login";
import SignUp from "./SignUp";
import Header from "./Header";
import SuccessModal from "./SuccessModal";
import ForgotPassword from "./Pages/ForgotPassword";
import VerifyCode from "./Pages/VerifyCode";
import SetNewPassword from "./Pages/SetNewPassword";
import ITDashboard from "./Pages/ITDashboard";
import Inventory from "./Pages/Inventory";
import Settings from "./Pages/Settings";
import Personnel from "./Pages/Personnel";
import BorrowReturn from "./Pages/BorrowReturn";
import Request from "./Pages/Request";
import Dashboard from "./Pages/Dashboard";
import UserDashboard from "./Users/UserDashboard.js";
import StaffProfile from "./Pages/StaffProfile";
import ProfileModal from "./Pages/ProfileModal";
import Navbar from "./Users/Navbar.js";
import Borrow from "./Users/BorrowEquipment.js";
import RequestForm from "./Users/RequestForm.js";
import RequestStatus from "./Users/RequestStatus.js";
import Track from "./Users/Track.js";
import BorrowStatus from "./Users/BorrowStatus.js";
import RequestHistory from "./Users/RequestHistory.js";
import WithdrawalHistory from "./Users/WithdrawalHistory.js";
import DashboardApprover from "./Approver/DashboardApprover.js";


function App() {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("th-TH", { hour12: false }));

      const dayNames = [
        "วันอาทิตย์",
        "วันจันทร์",
        "วันอังคาร",
        "วันพุธ",
        "วันพฤหัสบดี",
        "วันศุกร์",
        "วันเสาร์",
      ];
      const monthNames = [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม",
      ];

      const dayName = dayNames[now.getDay()];
      const day = now.getDate();
      const month = monthNames[now.getMonth()];
      const year = now.getFullYear() + 543;

      setCurrentDate(`${dayName}ที่ ${day} ${month} ${year}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <Header currentTime={currentTime} currentDate={currentDate} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/success" element={<SuccessModal />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/set-new-password" element={<SetNewPassword />} />
          <Route path="/ITDashboard" element={<ITDashboard />} />
          <Route path="/it-dashboard" element={<ITDashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/personnel" element={<Personnel />} />
          <Route path="/borrow-return" element={<BorrowReturn />} />
          <Route path="/request" element={<Request />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/staff-profile" element={<StaffProfile />} />
          <Route path="/profileModal/:id" element={<ProfileModal />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/borrow" element={<Borrow />} />
          <Route path="/requestForm" element={<RequestForm />} />
          <Route path="/requestStatus" element={<RequestStatus />} /> {/* ✅ เปลี่ยน path ไม่ให้ชนกัน */}
          <Route path="/track" element={<Track />} />
          <Route path="/borrowStatus" element={<BorrowStatus />} /> {/* ✅ ใช้ตัวอักษรใหญ่เหมือน component */}
          <Route path="/requesthistory" element={<RequestHistory /> } />
          <Route path="/withdrawalHistory" element={<WithdrawalHistory />} />
          <Route path="/approver-dashboard" element={<DashboardApprover />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
