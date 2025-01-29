const express = require('express');
const cors = require('cors'); // ประกาศตัวแปร cors เพียงครั้งเดียว
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');  // ✅ ใช้ mysql2/promise
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;
const router = express.Router();

app.use(cors()); // เรียกใช้งาน cors
app.use(bodyParser.json());


// MySQL Connection
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '12345678',
  database: process.env.DB_NAME || 'inventory_management',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


(async () => {
  try {
    const connection = await db.getConnection(); // ใช้ getConnection()
    console.log('✅ Connected to MySQL database.');
    connection.release(); // คืน connection กลับ pool
  } catch (err) {
    console.error('❌ Error connecting to MySQL:', err);
    process.exit(1); // ปิดโปรแกรมถ้าเชื่อมต่อไม่ได้
  }
})();

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

const bcrypt = require('bcrypt');

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' });
  }

  try {
    // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
    const query = 'SELECT username, password, role FROM users WHERE username = ?';
    const [users] = await db.query(query, [username]);

    if (users.length === 0) {
      return res.status(401).json({ success: false, message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }

    const user = users[0];

    // ตรวจสอบรหัสผ่านที่เข้ารหัส
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }

    // ✅ ส่งข้อมูล role กลับไปให้ frontend
    return res.status(200).json({ success: true, role: user.role });

  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// ✅ ดึงข้อมูลบุคลากร (ไม่ต้องดึง password)
app.get("/api/staff-info", async (req, res) => {
  const { username } = req.query;
  
  console.log("Received username:", username);

  try {
    const query = `
      SELECT 
        users.fullName,
        users.phone,
        users.email,
        users.username,
        departments.name AS department_name
      FROM users
      LEFT JOIN departments ON users.department_id = departments.id
      WHERE users.username = ?
    `;

    const [results] = await db.query(query, [username]);

    if (results.length > 0) {
      return res.status(200).json(results[0]);
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Database query error:", error);
    return res.status(500).json({ error: "Database error" });
  }
});

// ✅ ดึงข้อมูล departments ทั้งหมด
app.get('/api/departments', async (req, res) => {
  try {
    const query = 'SELECT id, name FROM departments';
    const [results] = await db.query(query);
    return res.status(200).json(results);
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// ✅ ดึงข้อมูล Sections ตาม Department ID
app.get('/api/sections/:departmentId', async (req, res) => {
  const { departmentId } = req.params;

  try {
    const query = 'SELECT id, name FROM sections WHERE department_id = ?';
    const [results] = await db.query(query, [departmentId]);
    return res.status(200).json(results);
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// ✅ ดึงข้อมูล Tasks ตาม Section ID
app.get('/api/tasks/:sectionId', async (req, res) => {
  const { sectionId } = req.params;

  try {
    const query = 'SELECT id, name FROM tasks WHERE section_id = ?';
    const [results] = await db.query(query, [sectionId]);
    return res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// ✅ API: เพิ่มผู้ใช้งานใหม่ (ใช้ bcrypt เข้ารหัสรหัสผ่าน)
app.post('/api/signup', async (req, res) => {
  const { username, password, fullName, email, phone, departmentName, sectionName, taskName } = req.body;

  console.log("Received signup data:", req.body);

  // ตรวจสอบว่ามีข้อมูลครบถ้วน
  if (!username || !password || !email || !fullName || !phone || !departmentName || !sectionName || !taskName) {
    return res.status(400).json({ success: false, message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
  }

  try {
    // ตรวจสอบว่าชื่อผู้ใช้หรืออีเมลซ้ำหรือไม่
    const checkQuery = `SELECT * FROM users WHERE username = ? OR email = ?`;
    const [existingUsers] = await db.query(checkQuery, [username, email]);

    if (existingUsers.length > 0) {
      return res.status(400).json({ success: false, message: 'ชื่อผู้ใช้หรืออีเมลนี้มีอยู่ในระบบแล้ว' });
    }

    // ✅ เข้ารหัสรหัสผ่านก่อนบันทึกลงฐานข้อมูล
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ ดำเนินการเพิ่มผู้ใช้ในฐานข้อมูล
    const insertQuery = `
      INSERT INTO users (username, password, fullName, email, phone, department_name, section_name, task_name)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await db.query(insertQuery, [username, hashedPassword, fullName, email, phone, departmentName, sectionName, taskName]);

    return res.status(201).json({ success: true, message: 'สมัครสมาชิกสำเร็จ' });

  } catch (error) {
    console.error('Database error during user insertion:', error);
    return res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' });
  }
});


// ✅ ดึงข้อมูลสินค้าทั้งหมด
app.get('/api/products', async (req, res) => {
  const { sortColumn = 'id', sortOrder = 'ASC' } = req.query;
  const validColumns = ['id', 'model', 'category_name', 'inventory_number'];

  if (!validColumns.includes(sortColumn)) {
    return res.status(400).json({ success: false, error: 'Invalid sort column' });
  }

  try {
    const query = `
      SELECT 
        id,
        model AS material,
        IFNULL(serial_number, '-') AS serial_number,
        category_name AS category,
        name AS equipment,
        brand_name AS brand,
        inventory_number,
        IFNULL(inventory_number - borrowed_number, 0) AS remaining,
        IFNULL(details, '-') AS details,
        IFNULL(equipment_number, '-') AS equipment_number
      FROM products
      ORDER BY ${sortColumn} ${sortOrder};
    `;

    const [results] = await db.query(query);
    res.status(200).json({ success: true, data: results });

  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// ✅ เพิ่มข้อมูลสินค้าใหม่
app.post('/api/products', async (req, res) => {
  const { material, serial_number = "-", category, equipment, brand, inventory_number, details = "-", equipment_number = "-" } = req.body;

  if (!material || !category || !equipment || !brand || !inventory_number) {
    return res.status(400).json({ success: false, message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  if (isNaN(inventory_number) || inventory_number <= 0) {
    return res.status(400).json({ success: false, message: "จำนวนสินค้าต้องเป็นตัวเลขที่มากกว่า 0" });
  }

  try {
    const query = `
      INSERT INTO products (model, serial_number, category_name, name, brand_name, inventory_number, details, equipment_number)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.execute(query, [material, serial_number, category, equipment, brand, inventory_number, details, equipment_number]);
    res.status(201).json({ success: true, message: "เพิ่มข้อมูลสำเร็จ" });

  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในระบบ" });
  }
});

// ✅ อัปเดตข้อมูลสินค้า
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const { material, category, equipment, brand, equipment_number, serial_number, inventory_number, details } = req.body;

  try {
    const query = `
      UPDATE products
      SET 
        model = IFNULL(?, model), 
        category_name = IFNULL(?, category_name), 
        name = IFNULL(?, name), 
        brand_name = IFNULL(?, brand_name),
        equipment_number = IFNULL(?, equipment_number),
        serial_number = IFNULL(?, serial_number),
        inventory_number = IFNULL(?, inventory_number),
        details = IFNULL(?, details)
      WHERE id = ?
    `;

    await db.execute(query, [material, category, equipment, brand, equipment_number, serial_number, inventory_number, details, id]);
    res.status(200).json({ success: true, message: "บันทึกข้อมูลสำเร็จ" });

  } catch (error) {
    console.error("Database update error:", error);
    res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล" });
  }
});

// ✅ ลบสินค้า
app.post('/api/products/delete', async (req, res) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ success: false, message: "Invalid IDs" });
  }

  try {
    const query = `DELETE FROM products WHERE id IN (?)`;
    await db.query(query, [ids]);
    res.status(200).json({ success: true, message: "ลบข้อมูลสำเร็จ" });

  } catch (error) {
    console.error("Error deleting products:", error);
    res.status(500).json({ success: false, message: "Database error" });
  }
});

// ✅ ดึงรายการ Categories
app.get('/api/categories', async (req, res) => {
  try {
    const [results] = await db.query('SELECT id, name AS category_name, type FROM categories');
    res.status(200).json({ success: true, data: results });

  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ✅ เพิ่ม Category ใหม่
app.post("/api/categories", async (req, res) => {
  const { name, type } = req.body;
  if (!name) return res.status(400).json({ success: false, message: "กรุณากรอกชื่อประเภท" });

  try {
    await db.execute("INSERT INTO categories (name, type) VALUES (?, ?)", [name, type || 'ประเภททั่วไป']);
    res.status(201).json({ success: true, message: "เพิ่มประเภทสำเร็จ" });

  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในระบบ" });
  }
});

// ✅ อัปเดต Category
app.put('/api/categories/:id', async (req, res) => {
  const { id } = req.params;
  const { name, type } = req.body;
  if (!name) return res.status(400).json({ success: false, message: "กรุณากรอกชื่อประเภท" });

  try {
    await db.execute('UPDATE categories SET name = ?, type = ? WHERE id = ?', [name, type || 'ประเภททั่วไป', id]);
    res.status(200).json({ success: true, message: "แก้ไขประเภทสำเร็จ" });

  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// ✅ ลบ Category
app.delete('/api/categories/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [checkResults] = await db.query('SELECT * FROM categories WHERE id = ?', [id]);
    if (checkResults.length === 0) {
      return res.status(404).json({ success: false, message: 'ไม่พบข้อมูลที่ต้องการลบ' });
    }

    await db.execute('DELETE FROM categories WHERE id = ?', [id]);
    res.status(200).json({ success: true, message: "ลบประเภทสำเร็จ" });

  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// ✅ ดึงข้อมูลยี่ห้อทั้งหมด
app.get('/api/brands', async (req, res) => {
  try {
    const [results] = await db.query('SELECT id, name, category FROM brands');
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// ✅ เพิ่มยี่ห้อใหม่
app.post('/api/brands', async (req, res) => {
  const { name, category = "ทั่วไป" } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, message: "กรุณากรอกชื่อยี่ห้อ" });
  }

  try {
    const checkQuery = "SELECT * FROM brands WHERE name = ?";
    const [existingBrand] = await db.query(checkQuery, [name]);

    if (existingBrand.length > 0) {
      return res.status(409).json({ success: false, message: "ชื่อยี่ห้อนี้มีอยู่ในระบบแล้ว" });
    }

    const insertQuery = "INSERT INTO brands (name, category) VALUES (?, ?)";
    const [result] = await db.execute(insertQuery, [name, category]);

    res.status(201).json({ success: true, id: result.insertId, message: "เพิ่มยี่ห้อสำเร็จ" });
  } catch (error) {
    console.error("Error adding brand:", error);
    res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในการเพิ่มยี่ห้อ" });
  }
});

// ✅ อัปเดตยี่ห้อ
app.put('/api/brands/:id', async (req, res) => {
  const { id } = req.params;
  const { name, category } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, message: "กรุณากรอกชื่อยี่ห้อ" });
  }

  try {
    const updateQuery = "UPDATE brands SET name = ?, category = ? WHERE id = ?";
    const [result] = await db.execute(updateQuery, [name, category || "ทั่วไป", id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "ไม่พบยี่ห้อที่ต้องการแก้ไข" });
    }

    res.status(200).json({ success: true, message: "แก้ไขยี่ห้อสำเร็จ" });
  } catch (error) {
    console.error("Error updating brand:", error);
    res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในการแก้ไขยี่ห้อ" });
  }
});

// ✅ ลบยี่ห้อ
app.delete('/api/brands/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ success: false, message: "กรุณาระบุ ID" });
  }

  try {
    const deleteQuery = "DELETE FROM brands WHERE id = ?";
    const [result] = await db.execute(deleteQuery, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "ไม่พบยี่ห้อที่ต้องการลบ" });
    }

    res.status(200).json({ success: true, message: "ลบยี่ห้อสำเร็จ" });
  } catch (error) {
    console.error("Error deleting brand:", error);
    res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในการลบยี่ห้อ" });
  }
});

// ✅ ดึงข้อมูลบุคลากรทั้งหมด (แก้ให้ใช้ `await`)
app.get("/api/users", async (req, res) => {
  const query = `
    SELECT 
      id, 
      username, 
      fullName, 
      phone, 
      email, 
      department_name AS department, 
      section_name, 
      task_name, 
      role, 
      status, 
      createdAt, 
      updatedAt, 
      image 
    FROM users
    WHERE status = 'Approved'
  `;

  try {
    const [results] = await db.query(query); // ✅ ใช้ `await` และ destructure `[results]`
    res.json(results);
  } catch (error) {
    console.error("Error fetching approved users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});


// ✅ ดึงข้อมูลบุคลากรตาม ID
app.get("/api/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const query = `
      SELECT 
        id, 
        fullName, 
        department_name AS department, 
        image 
      FROM users
      WHERE id = ?
    `;
    const [results] = await db.query(query, [userId]);

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(results[0]);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Failed to fetch user details" });
  }
});

// ✅ เพิ่มข้อมูลบุคลากร
app.post("/api/users", async (req, res) => {
  const { fullName, department_id, section_id, task_id, phone, email, username, password } = req.body;

  try {
    // ดึงชื่อแผนก, แผนกย่อย, และงานที่เกี่ยวข้อง
    const getNamesQuery = `
      SELECT d.name AS department_name, s.name AS section_name, t.name AS task_name
      FROM departments d
      LEFT JOIN sections s ON d.id = s.department_id
      LEFT JOIN tasks t ON s.id = t.section_id
      WHERE d.id = ? AND s.id = ? AND t.id = ?
    `;
    const [results] = await db.query(getNamesQuery, [department_id, section_id, task_id]);

    if (results.length === 0) {
      return res.status(400).json({ error: "Invalid department, section, or task" });
    }

    const { department_name, section_name, task_name } = results[0];

    // เพิ่มผู้ใช้ใหม่
    const insertQuery = `
      INSERT INTO users (fullName, department_name, section_name, task_name, phone, email, username, password)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [insertResult] = await db.execute(insertQuery, [
      fullName, department_name, section_name, task_name, phone, email, username, password
    ]);

    res.status(201).json({ message: "User added successfully", userId: insertResult.insertId });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Failed to add user" });
  }
});

// ✅ อัปเดตข้อมูลบุคลากร
app.put("/api/users/:id", async (req, res) => {
  const userId = req.params.id;
  const { fullName, department, section_name, task_name, phone, email, username, password } = req.body;

  if (!fullName || !department || !email || !username || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const query = `
      UPDATE users 
      SET 
        fullName = ?, 
        department_name = ?,  
        section_name = ?, 
        task_name = ?, 
        phone = ?, 
        email = ?, 
        username = ?, 
        password = ?
      WHERE id = ?
    `;
    const [result] = await db.execute(query, [
      fullName, department, section_name, task_name, phone, email, username, password, userId
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

// ✅ ลบข้อมูลบุคลากร
app.delete("/api/users", async (req, res) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: "กรุณาระบุรายการที่ต้องการลบ" });
  }

  try {
    const query = `DELETE FROM users WHERE id IN (?)`;
    const [result] = await db.query(query, [ids]);

    res.json({ message: "ลบข้อมูลสำเร็จ!", affectedRows: result.affectedRows });
  } catch (error) {
    console.error("Error deleting users:", error);
    res.status(500).json({ error: "Failed to delete users" });
  }
});

// ✅ อนุมัติผู้ใช้
app.put("/api/users/approve/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const query = `UPDATE users SET status = 'Approved' WHERE id = ?`;
    const [result] = await db.execute(query, [userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found or already approved" });
    }

    res.json({ message: "✅ อนุมัติสำเร็จ!" });
  } catch (error) {
    console.error("❌ Error approving user:", error);
    res.status(500).json({ error: "Failed to approve user" });
  }
});

// ✅ ปฏิเสธผู้ใช้
app.put("/api/users/reject/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const query = `UPDATE users SET status = 'Rejected' WHERE id = ?`;
    const [result] = await db.execute(query, [userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found or already rejected" });
    }

    res.json({ message: "❌ ไม่อนุมัติสำเร็จ!" });
  } catch (error) {
    console.error("❌ Error rejecting user:", error);
    res.status(500).json({ error: "Failed to reject user" });
  }
});

// ✅ ดึงผู้ใช้ที่ยังรอการอนุมัติ
app.get("/api/pending-users", async (req, res) => {
  try {
    const query = "SELECT * FROM users WHERE status = 'Pending'";
    const [pendingUsers] = await db.query(query);
    res.json(pendingUsers);
  } catch (error) {
    console.error("❌ Error fetching pending users:", error);
    res.status(500).json({ error: "Internal Server Error" });
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