const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

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

      // ตรวจสอบ Role และ Redirect ตามบทบาท
      if (role === "Admin" || role === "IT") {
        return res.status(200).json({ success: true, role: "IT" });
      } else if (role === "Approver") {
        return res.status(200).json({ success: true, role: "Approver" });
      } else {
        return res.status(401).json({ success: false, message: "บทบาทไม่ถูกต้อง" });
      }
    } else {
      // จัดการกรณีที่ไม่มีข้อมูลจากฐานข้อมูล
      return res.status(401).json({ success: false, message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
    }
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
