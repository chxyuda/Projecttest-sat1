const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const nodemailer = require('nodemailer'); // สำหรับส่งอีเมล
require('dotenv').config(); // ใช้สำหรับโหลดตัวแปรจากไฟล์ .env

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
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
app.get('/api/products', (req, res) => {
  const query = `
    SELECT 
      model AS material,
      COALESCE(serial_number, '-') AS serial_number,
      category_name AS category,
      name AS equipment,
      brand_name AS brand,
      COALESCE(inventory_number, 0) AS quantity,
      details -- เพิ่มฟิลด์นี้
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


app.post("/api/products", (req, res) => {
  const { material, serialNumber, category, equipment, brand, quantity, remaining, status, details } = req.body; // เพิ่ม details
  const query = `
    INSERT INTO products (material, serial_number, category, equipment, brand, quantity, remaining, status, details)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) -- เพิ่ม details
  `;
  db.query(query, [material, serialNumber, category, equipment, brand, quantity, remaining, status, details], (err) => {
    if (err) {
      console.error("Error adding product:", err);
      res.status(500).json({ success: false, error: "Database error" });
    } else {
      res.status(201).json({ success: true });
    }
  });
});

app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const query = `UPDATE products SET name = ? WHERE id = ?`;
  db.query(query, [name, id], (err) => {
    if (err) {
      console.error("Error updating product:", err);
      res.status(500).json({ success: false, error: "Database error" });
    } else {
      res.status(200).json({ success: true });
    }
  });
});



app.post("/api/products/delete", (req, res) => {
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
      res
        .status(200)
        .json({ success: true, message: "Products deleted successfully", affectedRows: result.affectedRows });
    }
  });
});

// ดึงรายการ categories
app.get('/api/categories', (req, res) => {
  const query = 'SELECT id, name, type FROM categories';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, error: 'Server error' });
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


// ดึงรายการ brands
app.get('/api/brands', (req, res) => {
  const query = 'SELECT DISTINCT brand_name AS name FROM products';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, error: 'Server error' });
    }
    res.status(200).json({ success: true, data: results });
  });
});

// ตัวอย่าง API สำหรับเพิ่มยี่ห้อ (brands)
app.post('/api/brands', async (req, res) => {
  console.log("Request Body:", req.body); // Debug ค่าที่มาจาก Frontend
  const { name, category } = req.body;

  if (!name || !category) {
      return res.status(400).json({ success: false, message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
  }

  try {
      const result = await db.query('INSERT INTO brands (name, category) VALUES (?, ?)', [name, category]);
      res.status(200).json({ success: true, id: result.insertId });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการเพิ่มยี่ห้อ' });
  }
});

app.delete('/api/brands/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) {
      return res.status(400).json({ success: false, message: 'ID ไม่ถูกต้อง' });
  }

  try {
      const query = 'DELETE FROM brands WHERE id = ?';
      await db.query(query, [id]);
      res.status(200).json({ success: true, message: 'ลบยี่ห้อสำเร็จ' });
  } catch (error) {
      console.error('Error deleting brand:', error);
      res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการลบยี่ห้อ' });
  }
});

app.put('/api/brands/:id', async (req, res) => {
    const { id } = req.params;
    const { name, category } = req.body;

    if (!id || !name || !category) {
        return res.status(400).json({ success: false, message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
    }

    try {
        const query = 'UPDATE brands SET name = ?, category = ? WHERE id = ?';
        await db.query(query, [name, category, id]);
        res.status(200).json({ success: true, message: 'แก้ไขยี่ห้อสำเร็จ' });
    } catch (error) {
        console.error('Error updating brand:', error);
        res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการแก้ไขยี่ห้อ' });
    }
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
