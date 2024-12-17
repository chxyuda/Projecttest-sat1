const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const nodemailer = require('nodemailer'); // สำหรับส่งอีเมล
const crypto = require('crypto'); // สร้าง OTP แบบสุ่ม

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678', // เปลี่ยนเป็นรหัสผ่าน MySQL ของคุณ
  database: 'inventory_management',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Storage สำหรับ OTP ชั่วคราว
let otpStore = {};

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // เปลี่ยนเป็น SMTP ที่ใช้งาน (เช่น smtp.sat.or.th)
  port: 587,              // ใช้พอร์ต 587 สำหรับ STARTTLS
  secure: false,          // true สำหรับ SSL (พอร์ต 465), false สำหรับ STARTTLS
  auth: {
    user: "your-email@gmail.com",   // อีเมล Gmail หรือองค์กร
    pass: "your-app-password",      // App Password ของ Gmail
  },
  tls: {
    rejectUnauthorized: false, // ปิดการตรวจสอบ Certificate ชั่วคราว
  },
});

// ตรวจสอบการเชื่อมต่อ SMTP ก่อนส่งอีเมล
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Connection Error:", error);
  } else {
    console.log("SMTP Server is ready to take messages");
  }
});

// API: ส่ง OTP ไปยังอีเมล
app.post('/api/send-otp', (req, res) => {
  const { email } = req.body;
  console.log("Received request for email:", email);

  const query = 'SELECT email FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, error: 'Server error' });
    }

    if (results.length === 0) {
      console.log("Email not found in database");
      return res.status(404).json({ success: false, message: 'Email not found' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[email] = otp;

    const mailOptions = {
      from: "your-email@gmail.com",
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP code is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
        return res.status(500).json({ success: false, message: "Failed to send OTP" });
      }
      console.log("Email sent successfully:", info.response);
      res.status(200).json({ success: true, message: "OTP sent successfully" });
    });
  });
});

// API: ยืนยัน OTP
app.post('/api/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  // ตรวจสอบ OTP
  if (otpStore[email] && otpStore[email] === parseInt(otp)) {
    delete otpStore[email]; // ลบ OTP หลังจากยืนยันสำเร็จ
    res.status(200).json({ success: true, message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
  }
});

// API: Login ตรวจสอบ Username และ Password
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT role FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, error: 'Server error' });
    }

    if (results.length > 0) {
      const role = results[0].role;

      if (role === "Admin" || role === "IT") {
        return res.status(200).json({ success: true, role: "IT" });
      } else if (role === "Approver") {
        return res.status(200).json({ success: true, role: "Approver" });
      } else {
        return res.status(401).json({ success: false, message: "บทบาทไม่ถูกต้อง" });
      }
    } else {
      return res.status(401).json({ success: false, message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
    }
  });
});
// API: ดึงข้อมูลเจ้าหน้าที่
app.get('/api/staff-info', (req, res) => {
  const staffId = 1; // สมมติว่า ID ของเจ้าหน้าที่ IT คือ 1 (ดึงจากการ Login ได้จริงในอนาคต)

  const query = "SELECT fullName, role, phone, email FROM users WHERE id = ?";
  db.query(query, [staffId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ success: false, error: "Server error" });
    }
    if (results.length > 0) {
      return res.status(200).json(results[0]);
    } else {
      return res.status(404).json({ success: false, message: "Staff not found" });
    }
  });
});
// API: ดึงข้อมูลสินค้าจากฐานข้อมูล
app.get("/api/products", (req, res) => {
  const query = "SELECT name, asset_number, category, device, brand, quantity FROM products";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res.status(500).json({ success: false, error: "Server error" });
    }
    return res.status(200).json(results);
  });
});
// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
