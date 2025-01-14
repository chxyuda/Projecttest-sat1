const express = require('express');
const cors = require('cors'); // ประกาศตัวแปร cors เพียงครั้งเดียว
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;
const router = express.Router();

app.use(cors()); // เรียกใช้งาน cors
app.use(bodyParser.json());


// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '12345678',
  database: process.env.DB_NAME || 'inventory_management',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1); // ปิดโปรแกรมถ้าการเชื่อมต่อไม่สำเร็จ
  }
  console.log('Connected to MySQL database.');
});

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// ตรวจสอบการเชื่อมต่อ SMTP
transporter.verify((error) => {
  if (error) {
    console.error('SMTP Connection Error:', error);
  } else {
    console.log('SMTP Server is ready to take messages');
  }
});

// API: ส่ง OTP ไปยังอีเมล
app.post('/api/send-otp', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'กรุณาระบุอีเมล' });
  }

  const query = 'SELECT email FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, error: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'ไม่พบอีเมลนี้ในระบบ' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Password Reset OTP',
      text: `รหัส OTP ของคุณคือ: ${otp}`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.error('Error sending email:', err);
        return res.status(500).json({ success: false, message: 'ไม่สามารถส่ง OTP ได้' });
      }
      res.status(200).json({ success: true, message: 'ส่ง OTP สำเร็จ' });
    });
  });
});

// API: Login ตรวจสอบ Username และ Password
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' });
  }

  const query = 'SELECT role FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, error: 'Server error' });
    }

    if (results.length > 0) {
      return res.status(200).json({ success: true, role: results[0].role });
    } else {
      return res.status(401).json({ success: false, message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }
  });
});

// API: ดึงข้อมูลบุคลากร
app.get("/api/staff-info", (req, res) => {
  const { username } = req.query;
  console.log("Received username:", username);
  console.log("API received username:", username);
  
  const query = `
    SELECT 
      users.fullName,
      users.phone,
      users.email,
      users.username,
      users.password,
      departments.name AS department_name
    FROM users
    LEFT JOIN departments ON users.department_id = departments.id
    WHERE users.username = ?
  `;

  db.query(query, [username], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });
});

// API: ดึงข้อมูล departments ทั้งหมด
app.get('/api/departments', (req, res) => {
  const query = 'SELECT id, name FROM departments';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, error: 'Server error' });
    }
    res.status(200).json(results);
  });
});
// API: ดึงข้อมูล Sections ตาม Department ID
app.get('/api/sections/:departmentId', (req, res) => {
  const departmentId = req.params.departmentId;
  const query = 'SELECT id, name FROM sections WHERE department_id = ?';
  db.query(query, [departmentId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, error: 'Server error' });
    }
    res.status(200).json(results);
  });
});

app.get('/api/tasks/:sectionId', (req, res) => {
  const sectionId = req.params.sectionId;
  const query = 'SELECT id, name FROM tasks WHERE section_id = ?';
  db.query(query, [sectionId], (err, results) => {
      if (err) {
          console.error('Error fetching tasks:', err);
          return res.status(500).json({ success: false, error: 'Server error' });
      }
      res.status(200).json(results);
  });
});

// API: เพิ่มผู้ใช้งานใหม่
app.post('/api/signup', (req, res) => {
  const { username, password, fullName, email, phone, departmentName, sectionName, taskName } = req.body;

  console.log("Received signup data:", req.body);

  // ตรวจสอบว่ามีข้อมูลครบถ้วน
  if (!username || !password || !email || !fullName || !phone || !departmentName || !sectionName || !taskName) {
    return res.status(400).json({ success: false, message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
  }

  // ตรวจสอบว่าชื่อผู้ใช้หรืออีเมลซ้ำหรือไม่
  const checkQuery = `SELECT * FROM users WHERE username = ? OR email = ?`;
  db.query(checkQuery, [username, email], (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Database error during username/email check:', checkErr);
      return res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการตรวจสอบข้อมูล' });
    }

    if (checkResults.length > 0) {
      return res.status(400).json({ success: false, message: 'ชื่อผู้ใช้หรืออีเมลนี้มีอยู่ในระบบแล้ว' });
    }

    // ดำเนินการเพิ่มผู้ใช้ในฐานข้อมูล
    const insertQuery = `
      INSERT INTO users (username, password, fullName, email, phone, department_name, section_name, task_name)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(insertQuery, [username, password, fullName, email, phone, departmentName, sectionName, taskName], (insertErr) => {
      if (insertErr) {
        console.error('Database error during user insertion:', insertErr);
        return res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' });
      }
      res.status(201).json({ success: true, message: 'สมัครสมาชิกสำเร็จ' });
    });
  });
});

// ดึงรายการ products
// ดึงข้อมูลทั้งหมด
app.get('/api/products', (req, res) => { 
  const query = `
    SELECT 
      model AS material,
      COALESCE(serial_number, '-') AS serial_number,
      category_name AS category,
      name AS equipment,
      brand_name AS brand,
      inventory_number, -- จำนวนทั้งหมด
      COALESCE(inventory_number - borrowed_number, 0) AS remaining, -- คำนวณคงเหลือ
      details,
      equipment_number -- เพิ่ม equipment_number
    FROM products
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, error: 'Server error' });
    }
    res.status(200).json({ success: true, data: results });
  });
});

// เพิ่มข้อมูลใหม่
app.post('/api/products', (req, res) => {
  const { name, brand_name, model, equipment_number } = req.body;

  console.log("Data received:", { name, brand_name, model, equipment_number });

  if (!name) {
    return res.status(400).json({ success: false, message: "กรุณากรอกชื่ออุปกรณ์" });
  }

  const checkQuery = "SELECT * FROM products WHERE name = ?";
  db.query(checkQuery, [name], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในระบบ" });
    }

    if (results.length > 0) {
      return res.status(409).json({ success: false, message: "ชื่ออุปกรณ์นี้มีอยู่ในระบบแล้ว" });
    }

    const insertQuery = `
      INSERT INTO products (name, brand_name, model, equipment_number) 
      VALUES (?, ?, ?, ?)
    `;
    db.query(insertQuery, [name, brand_name, model || "รุ่นทั่วไป", equipment_number || null], (err, result) => {
      if (err) {
        console.error("Error adding product:", err);
        return res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในการเพิ่มอุปกรณ์" });
      }
      res.status(201).json({ success: true, id: result.insertId, message: "เพิ่มอุปกรณ์สำเร็จ" });
    });
  });
});


// อัปเดตข้อมูล
app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, brand_name, model, equipment_number } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, message: "กรุณากรอกชื่อสินค้า" });
  }

  const checkQuery = "SELECT * FROM products WHERE id = ?";
  db.query(checkQuery, [id], (checkErr, checkResults) => {
    if (checkErr || checkResults.length === 0) {
      return res.status(404).json({ success: false, message: "ไม่พบสินค้าที่ต้องการอัปเดต" });
    }

    const updateQuery = `
      UPDATE products 
      SET name = ?, brand_name = ?, model = ?, equipment_number = ? 
      WHERE id = ?
    `;
    db.query(updateQuery, [name, brand_name, model || "รุ่นทั่วไป", equipment_number || null, id], (err) => {
      if (err) {
        console.error("Error updating product:", err);
        res.status(500).json({ success: false, error: "Database error" });
      } else {
        res.status(200).json({ success: true, message: "อัปเดตข้อมูลสำเร็จ" });
      }
    });
  });
});

// ลบข้อมูล
app.post('/api/products/delete', (req, res) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ success: false, message: "Invalid IDs" });
  }

  const query = `DELETE FROM products WHERE id IN (?)`;
  db.query(query, [ids], (err, result) => {
    if (err) {
      console.error("Error deleting products:", err);
      res.status(500).json({ success: false, message: "Database error" });
    } else {
      res.status(200).json({
        success: true,
        message: "ลบข้อมูลสำเร็จ",
        affectedRows: result.affectedRows,
      });
    }
  });
});

// ดึงรายการ categories
app.get('/api/categories', (req, res) => {
  const query = 'SELECT id, name AS category_name, type FROM categories';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'ไม่มีข้อมูลประเภท' });
    }
    res.status(200).json({ success: true, data: results });
  });
});


app.post("/api/categories", (req, res) => {
  const { name, type } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  const query = "INSERT INTO categories (name, type) VALUES (?, ?)";
  db.query(query, [name, type || 'ประเภททั่วไป'], (err, result) => {
    if (err) {
      console.error("Error adding category:", err);
      return res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในระบบ" });
    }
    res.status(201).json({ success: true, id: result.insertId });
  });
});


app.put('/api/categories/:id', (req, res) => {
  const { id } = req.params;
  const { name, type } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, message: "กรุณากรอกชื่อประเภท" });
  }

  const query = 'UPDATE categories SET name = ?, type = ? WHERE id = ?';
  db.query(query, [name, type || 'ประเภททั่วไป', id], (err) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, error: 'Server error' });
    }
    res.status(200).json({ success: true });
  });
});


app.delete('/api/categories/:id', (req, res) => {
  const { id } = req.params;

  const checkQuery = 'SELECT * FROM categories WHERE id = ?';
  db.query(checkQuery, [id], (checkErr, checkResults) => {
    if (checkErr || checkResults.length === 0) {
      return res.status(404).json({ success: false, message: 'ไม่พบข้อมูลที่ต้องการลบ' });
    }

    const deleteQuery = 'DELETE FROM categories WHERE id = ?';
    db.query(deleteQuery, [id], (deleteErr) => {
      if (deleteErr) {
        console.error('Database error:', deleteErr);
        return res.status(500).json({ success: false, error: 'Server error' });
      }
      res.status(200).json({ success: true });
    });
  });
});


// ดึงข้อมูลยี่ห้อทั้งหมด
app.get('/api/brands', (req, res) => { 
  const query = 'SELECT DISTINCT name FROM brands';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, error: 'Server error' });
    }
    res.status(200).json({ success: true, data: results });
  });
});

// เพิ่มยี่ห้อใหม่
app.post('/api/brands', (req, res) => {
  const { name, category = "ทั่วไป" } = req.body; // กำหนดค่า default เป็น "ทั่วไป"
  console.log("Data received from client:", { name, category });

  if (!name) {
    console.error("Error: Brand name is missing.");
    return res.status(400).json({ success: false, message: "กรุณากรอกชื่อยี่ห้อ" });
  }

  const checkQuery = "SELECT * FROM brands WHERE name = ?";
db.query(checkQuery, [name], (err, results) => {
  if (err) {
    console.error("Error during SELECT query:", err);
    return res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในการตรวจสอบยี่ห้อ" });
  }

  if (results.length > 0) {
    return res.status(409).json({ success: false, message: "ชื่อยี่ห้อนี้มีอยู่ในระบบแล้ว" });
  }
    const insertQuery = "INSERT INTO brands (name, category) VALUES (?, ?)";
    db.query(insertQuery, [name, category], (err, result) => {
      if (err) {
        console.error("Error during INSERT query:", err);
        return res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในการเพิ่มยี่ห้อ" });
      }
      console.log("Brand added successfully:", result);
      res.status(201).json({ success: true, id: result.insertId });
    });
  });
});

// อัปเดตยี่ห้อ
app.put('/api/brands/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  // Debug ค่าที่ได้รับจาก Frontend
  console.log("Request Params ID:", id);
  console.log("Request Body Name:", name);

  if (!id || !name) {
    return res.status(400).json({ success: false, message: "กรุณาระบุ ID และชื่อยี่ห้อ" });
  }

  const updateQuery = "UPDATE brands SET name = ? WHERE id = ?";
  db.query(updateQuery, [name, id], (err, result) => {
    if (err) {
      // Debug ข้อผิดพลาดจาก Query
      console.error("Query Error:", err);
      return res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในระบบ" });
    }

    // Debug ผลลัพธ์ของ Query
    console.log("Query Result:", result);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "ไม่พบยี่ห้อที่ต้องการแก้ไข" });
    }

    return res.status(200).json({ success: true, message: "แก้ไขสำเร็จ" });
  });
});


// ลบยี่ห้อ
app.delete('/api/brands/:id', (req, res) => {
  const { id } = req.params;

  console.log("Request to delete ID:", id);

  if (!id) {
    console.error("Missing ID");
    return res.status(400).json({ success: false, message: "กรุณาระบุ ID" });
  }

  const checkQuery = "SELECT * FROM brands WHERE id = ?";
  db.query(checkQuery, [id], (checkErr, checkResults) => {
    if (checkErr) {
      console.error("Error during SELECT query:", checkErr);
      return res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในระบบ" });
    }

    if (checkResults.length === 0) {
      console.warn("No brand found with ID:", id);
      return res.status(404).json({ success: false, message: "ไม่พบยี่ห้อที่ต้องการลบ" });
    }

    const deleteQuery = "DELETE FROM brands WHERE id = ?";
    db.query(deleteQuery, [id], (deleteErr, result) => {
      if (deleteErr) {
        console.error("Error during DELETE query:", deleteErr);
        return res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในการลบยี่ห้อ" });
      }

      console.log("Brand deleted successfully:", id);
      res.status(200).json({ success: true, message: "ลบยี่ห้อสำเร็จ" });
    });
  });
});


app.put('/api/brands/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, message: "กรุณากรอกชื่อยี่ห้อ" });
  }

  // SQL Query แก้ไขข้อมูล
  const updateQuery = "UPDATE brands SET name = ? WHERE id = ?";
  db.query(updateQuery, [name, id], (err, result) => {
    if (err) {
      console.error("Error updating brand:", err);
      return res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในการแก้ไขยี่ห้อ" });
    }

    // ตรวจสอบว่ามีการแก้ไขข้อมูลหรือไม่
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "ไม่พบยี่ห้อที่ต้องการแก้ไข" });
    }

    res.status(200).json({ success: true, message: "แก้ไขยี่ห้อสำเร็จ" });
  });
});


app.get('/api/names', (req, res) => {
  const { type } = req.query;

  if (!type) {
    return res.status(400).json({ success: false, message: 'กรุณาระบุประเภท (type)' });
  }

  const query = 'SELECT name FROM categories WHERE type = ?';
  db.query(query, [type], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, error: 'Server error' });
    }
    res.status(200).json(results);
  });
});

app.post('/api/search-history', (req, res) => {
  const { category, brand, status } = req.body;

  const query = `
    INSERT INTO search_history (category, brand, status)
    VALUES (?, ?, ?)
  `;
  db.query(query, [category, brand, status], (err) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, error: 'Server error' });
    }
    res.status(201).json({ success: true, message: 'บันทึกประวัติการค้นหาสำเร็จ' });
  });
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
