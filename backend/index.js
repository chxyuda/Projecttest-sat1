const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const db = require("./db"); // ✅ ใช้ `db.js` ที่เราแยกไว้
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

// ✅ Nodemailer Transporter (ส่งอีเมล)
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
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

// ✅ ตรวจสอบการเชื่อมต่อ SMTP
transporter.verify((error) => {
    if (error) {
        console.error("❌ SMTP Connection Error:", error);
    } else {
        console.log("✅ SMTP Server is ready to send emails.");
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

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  console.log("📌 Received Login Request:", username); // Debug

  const query = "SELECT id, username, password, role, status FROM users WHERE username = ?";
  db.query(query, [username], async (err, results) => {
      if (err) {
          console.error("❌ Database error:", err);
          return res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
      }

      if (results.length === 0) {
          console.log("❌ No user found with this username");
          return res.status(401).json({ success: false, message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
      }

      const user = results[0];
      console.log("✅ User Found:", user); // Debug

      // เช็ครหัสผ่าน
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          console.log("❌ Password mismatch");
          return res.status(401).json({ success: false, message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
      }

      // เช็คว่าได้รับการอนุมัติหรือยัง
      if (user.status.trim().toLowerCase() !== "approve") {
          console.log("❌ User not approved");
          return res.status(403).json({ success: false, message: "บัญชีของคุณยังไม่ได้รับการอนุมัติจาก IT" });
      }

      res.status(200).json({
          success: true,
          message: "เข้าสู่ระบบสำเร็จ",
          user: {
              id: user.id,
              username: user.username,
              role: user.role,
          }
      });
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

const checkUserExists = (username, email, callback) => {
  const query = "SELECT COUNT(*) AS count FROM users WHERE username = ? OR email = ?";
  db.query(query, [username, email], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0].count > 0);
  });
};
// API: เพิ่มผู้ใช้งานใหม่
router.post("/signup", async (req, res) => {
  console.log("📩 ข้อมูลที่ได้รับจาก Frontend:", req.body); // Debug

  const { username, password, fullName, email, phone, department_name, section_name, task_name } = req.body;

  // ตรวจสอบข้อมูลก่อนบันทึก
  if (!username || !password || !fullName || !email || !phone || !department_name || !section_name || !task_name) {
      console.error("❌ ข้อมูลขาด:", { username, password, fullName, email, phone, department_name, section_name, task_name });
      return res.status(400).json({ success: false, message: "❌ ข้อมูลไม่ครบ: ตรวจสอบอีกครั้ง" });
  }

  try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const query = `
          INSERT INTO users (username, password, fullName, email, phone, department_name, section_name, task_name, role, status)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'User', 'Pending')
      `;

      db.query(query, [username, hashedPassword, fullName, email, phone, department_name, section_name, task_name], (err, result) => {
          if (err) {
              console.error("❌ Database error:", err);
              return res.status(500).json({ success: false, error: err.message });
          }

          return res.status(201).json({ success: true, message: "✅ สมัครสมาชิกสำเร็จ! กรุณารอ IT อนุมัติบัญชีของคุณ" });
      });

  } catch (error) {
      console.error("❌ Error hashing password:", error);
      return res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในการสมัครสมาชิก" });
  }
});


app.put('/api/approve-user/:id', (req, res) => {
  const userId = req.params.id;

  const query = `UPDATE users SET status = 'Approved' WHERE id = ?`;
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Database update error:', err);
      return res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการอนุมัติผู้ใช้' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'ไม่พบผู้ใช้ที่ต้องการอนุมัติ' });
    }

    res.status(200).json({ success: true, message: 'อนุมัติผู้ใช้สำเร็จ' });
  });
});

app.get('/api/pending-users', (req, res) => {
  const query = `SELECT id, username, fullName, email, phone FROM users WHERE status = 'Pending'`;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
    res.status(200).json({ success: true, users: results });
  });
});

// ดึงรายการ products
// ดึงข้อมูลทั้งหมด
app.get('/api/products', (req, res) => {
  const { sortColumn = 'id', sortOrder = 'ASC' } = req.query; // Default sorting
  const validColumns = ['id', 'model', 'category_name', 'inventory_number']; // คอลัมน์ที่อนุญาต
  if (!validColumns.includes(sortColumn)) {
    return res.status(400).json({ success: false, error: 'Invalid sort column' });
  }

  const query = `
    SELECT 
      id,
      model AS material,
      COALESCE(serial_number, '-') AS serial_number,
      category_name AS category,
      name AS equipment,
      brand_name AS brand,
      inventory_number,
      COALESCE(inventory_number - borrowed_number, 0) AS remaining,
      COALESCE(details, '-') AS details,
      COALESCE(equipment_number, '-') AS equipment_number
    FROM products
    ORDER BY ${sortColumn} ${sortOrder};
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, error: 'Server error' });
    }
    console.log('Query Results:', results); // ล็อกข้อมูลผลลัพธ์
    res.status(200).json({ success: true, data: results });
  });  
});


// เพิ่มข้อมูลใหม่
app.post("/api/products", (req, res) => {
  const {
    material, // ชื่อสินค้า
    serial_number = "-", // ค่าเริ่มต้นหากไม่ได้ส่งมา
    category, // ประเภท
    equipment, // อุปกรณ์
    brand, // ยี่ห้อ
    inventory_number, // จำนวน
    details = "-", // รายละเอียด
    equipment_number = "-" // หมายเลขครุภัณฑ์
  } = req.body;

  // ตรวจสอบว่าข้อมูลสำคัญครบถ้วนหรือไม่
  if (!material || !category || !equipment || !brand || !inventory_number) {
    return res.status(400).json({ success: false, message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  // ตรวจสอบว่า inventory_number เป็นตัวเลขที่มากกว่า 0
  if (isNaN(inventory_number) || inventory_number <= 0) {
    return res.status(400).json({ success: false, message: "จำนวนสินค้าต้องเป็นตัวเลขที่มากกว่า 0" });
  }

  const query = `
    INSERT INTO products (material, serial_number, category, equipment, brand, inventory_number, details, equipment_number)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [material, serial_number, category, equipment, brand, inventory_number, details, equipment_number],
    (err) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในระบบ" });
      }
      res.status(201).json({ success: true, message: "เพิ่มข้อมูลสำเร็จ" });
    }
  );
});

// อัปเดตข้อมูล
app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const query = `
    UPDATE products
    SET 
      model = COALESCE(?, model), 
      category_name = COALESCE(?, category_name), 
      name = COALESCE(?, name), 
      brand_name = COALESCE(?, brand_name),
      equipment_number = COALESCE(?, equipment_number),
      serial_number = COALESCE(?, serial_number),
      inventory_number = COALESCE(?, inventory_number),
      details = COALESCE(?, details)
    WHERE id = ?
  `;

  db.query(
    query,
    [
      data.name,
      data.category,
      data.equipment,
      data.brand,
      data.equipment_number,
      data.serial_number,
      data.inventory_number,
      data.details,
      id,
    ],
    (err, results) => {
      if (err) {
        console.error("Database update error:", err);
        return res
          .status(500)
          .json({ success: false, message: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล" });
      }
      res.status(200).json({ success: true, message: "บันทึกข้อมูลสำเร็จ" });
    }
  );
});

app.get('/api/options', (req, res) => {
  const query = `
    SELECT DISTINCT category_name AS category FROM products;
    SELECT DISTINCT name AS equipment FROM products;
    SELECT DISTINCT brand_name AS brand FROM products;
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, error: 'Server error' });
    }
    res.status(200).json({
      success: true,
      categories: results[0],
      equipments: results[1],
      brands: results[2],
    });
  });
});
// ดึงข้อมูลตัวเลือก
app.get('/api/filters', (req, res) => {
  const queries = {
    categories: 'SELECT DISTINCT category_name FROM products',
    equipment: 'SELECT DISTINCT name FROM products',
    brands: 'SELECT DISTINCT brand_name FROM products',
  };

  const results = {};

  const promises = Object.keys(queries).map((key) => {
    return new Promise((resolve, reject) => {
      db.query(queries[key], (err, data) => {
        if (err) {
          reject(err);
        } else {
          results[key] = data.map((item) => item[Object.keys(item)[0]]);
          resolve();
        }
      });
    });
  });

  Promise.all(promises)
    .then(() => res.status(200).json({ success: true, data: results }))
    .catch((error) => {
      console.error('Error fetching filters:', error);
      res.status(500).json({ success: false, message: 'Error fetching filters' });
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

  console.log("Received ID:", id); // Log ID
  console.log("Received Name:", name); // Log Name

  if (!id || !name) {
    return res.status(400).json({ success: false, message: "กรุณาระบุ ID และชื่อยี่ห้อ" });
  }

  const updateQuery = "UPDATE brands SET name = ? WHERE id = ?";
  db.query(updateQuery, [name, id], (err, result) => {
    if (err) {
      console.error("Error updating brand:", err);
      return res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในการแก้ไขยี่ห้อ" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "ไม่พบยี่ห้อที่ต้องการแก้ไข" });
    }

    res.status(200).json({ success: true, message: "แก้ไขยี่ห้อสำเร็จ" });
  });
});

// ลบยี่ห้อ
app.delete('/api/brands/:id', (req, res) => {
  const { id } = req.params;

  console.log("Request to delete ID:", id); // Log ID

  if (!id) {
    return res.status(400).json({ success: false, message: "กรุณาระบุ ID" });
  }

  const deleteQuery = "DELETE FROM brands WHERE id = ?";
  db.query(deleteQuery, [id], (err, result) => {
    if (err) {
      console.error("Error deleting brand:", err);
      return res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในการลบยี่ห้อ" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "ไม่พบยี่ห้อที่ต้องการลบ" });
    }

    res.status(200).json({ success: true, message: "ลบยี่ห้อสำเร็จ" });
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


// ดึงข้อมูลบุคลากรทั้งหมด
const crypto = require("crypto");
// ✅ ทดสอบถอดรหัส
const encryptedHex = "796F75727275706C6F6164"; // 🔥 ใส่ค่าจริงจากฐานข้อมูล
console.log("🔓 Decrypted Password:", decryptPassword(encryptedHex));

const AES_SECRET_KEY = Buffer.from("12345678901234567890123456789012", "utf-8"); // ✅ 32 bytes
const IV_KEY = Buffer.from("1234567890123456", "utf-8"); // ✅ 16 bytes

// ✅ ฟังก์ชันเข้ารหัสรหัสผ่าน
function encryptPassword(password) {
  const cipher = crypto.createCipheriv("aes-256-cbc", AES_SECRET_KEY, IV_KEY);
  let encrypted = cipher.update(password, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;  // ✅ ส่งค่าเป็น HEX String
}

// ✅ ฟังก์ชันถอดรหัสรหัสผ่าน
function decryptPassword(encryptedHex) {
  if (!encryptedHex || encryptedHex === "NULL") return "🔒 ซ่อนเพื่อความปลอดภัย";
  try {
      const decipher = crypto.createDecipheriv("aes-256-cbc", AES_SECRET_KEY, IV_KEY);
      let decrypted = decipher.update(Buffer.from(encryptedHex, "hex"), "utf8"); // ✅ แปลงจาก HEX เป็น UTF-8
      decrypted += decipher.final("utf8");
      return decrypted;
  } catch (error) {
      console.error("❌ Error decrypting password:", error);
      return "🔒 ไม่สามารถถอดรหัส";
  }
}


// ✅ ใช้ฟิลด์ `password_encrypted` แทน `original_password`
app.get("/api/users", (req, res) => {
  const query = `
      SELECT 
          id, username, fullName, phone, email, 
          department_name, section_name, task_name, status, image, 
          password_encrypted 
      FROM users
  `;

  db.query(query, (err, results) => {
      if (err) {
          console.error("❌ Error fetching users:", err.message);
          return res.status(500).json({ error: "❌ Failed to fetch users" });
      }

      // ถอดรหัสรหัสผ่านเฉพาะที่ต้องการแสดง
      const users = results.map(user => ({
          ...user,
          password: decryptPassword(user.password_encrypted),
      }));

      res.json(users);
  });
});

app.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  const query = `
      SELECT id, username, fullName, phone, email, department_name, section_name, task_name, password_encrypted 
      FROM users 
      WHERE id = ?
  `;

  db.query(query, [userId], (err, results) => {
      if (err) {
          console.error("❌ Error fetching user details:", err);
          return res.status(500).json({ error: "❌ Failed to fetch user details" });
      }
      if (results.length === 0) {
          return res.status(404).json({ error: "❌ User not found" });
      } else {
          const user = results[0];
          user.password = decryptPassword(user.password_encrypted);
          delete user.password_encrypted; // ไม่แสดงค่าที่เข้ารหัส
          res.json(user);
      }
  });
});


// ✅ API เพิ่มผู้ใช้ใหม่
app.post("/api/users", async (req, res) => {
  const { fullName, department_name, section_name, task_name, phone, email, username, password } = req.body;

  if (!username || !password || !fullName || !email || !phone || !department_name || !section_name || !task_name) {
      return res.status(400).json({ error: "❌ Missing required fields" });
  }

  try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const encryptedPassword = encryptPassword(password);

      const query = `
          INSERT INTO users (fullName, department_name, section_name, task_name, phone, email, username, password, password_encrypted)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(query, [fullName, department_name, section_name, task_name, phone, email, username, hashedPassword, encryptedPassword], (err, results) => {
          if (err) {
              console.error("❌ Error adding user:", err);
              return res.status(500).json({ error: "❌ Failed to add user" });
          }
          res.status(201).json({ message: "✅ User added successfully", userId: results.insertId });
      });

  } catch (error) {
      console.error("❌ Error hashing password:", error);
      res.status(500).json({ error: "❌ Failed to hash password" });
  }
});


const updatePasswordEncrypted = async () => {
  try {
      db.query("SELECT id, password FROM users", (err, users) => {
          if (err) throw err;

          users.forEach(user => {
              const encryptedPassword = encryptPassword(user.password); // ✅ ใช้ค่ารหัสผ่านจริงจากตาราง password
              db.query(
                  "UPDATE users SET password_encrypted = ? WHERE id = ?",
                  [encryptedPassword, user.id],
                  (err, result) => {
                      if (err) console.error("❌ Error updating:", err);
                      else console.log(`✅ Updated user ${user.id}`);
                  }
              );
          });
      });
  } catch (error) {
      console.error("❌ Error updating password_encrypted:", error);
  }
};

// ✅ API อัปเดตข้อมูลบุคลากร (ให้แอดมินแก้ไขรหัสผ่านได้)
// ✅ API อัปเดตข้อมูลบุคลากร
app.put("/api/users/:id", async (req, res) => {
  const userId = req.params.id;
  const { fullName, department_name, section_name, task_name, phone, email, username, password } = req.body;

  try {
      let query = `UPDATE users SET fullName = ?, department_name = ?, section_name = ?, task_name = ?, phone = ?, email = ?, username = ?`;
      const params = [fullName, department_name, section_name, task_name, phone, email, username];

      if (password) {
          const hashedPassword = await bcrypt.hash(password, 10);
          const encryptedPassword = encryptPassword(password);
          query += ", password = ?, password_encrypted = ?";
          params.push(hashedPassword, encryptedPassword);
      }

      query += " WHERE id = ?";
      params.push(userId);

      db.query(query, params, (err, results) => {
          if (err) {
              console.error("❌ Error updating user:", err);
              return res.status(500).json({ error: "❌ Failed to update user" });
          }
          res.json({ message: "✅ User updated successfully" });
      });

  } catch (error) {
      console.error("❌ Error hashing password:", error);
      res.status(500).json({ error: "❌ Failed to hash password" });
  }
});


// ลบข้อมูลบุคลากร
app.delete("/api/users", (req, res) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: "❌ กรุณาระบุผู้ใช้ที่ต้องการลบ" });
  }

  const placeholders = ids.map(() => "?").join(",");
  const query = `DELETE FROM users WHERE id IN (${placeholders})`;

  db.query(query, ids, (err, results) => {
      if (err) {
          console.error("❌ Error deleting users:", err);
          return res.status(500).json({ success: false, message: "❌ เกิดข้อผิดพลาดในการลบข้อมูล" });
      }

      res.status(200).json({ success: true, message: `✅ ลบข้อมูลสำเร็จ ${results.affectedRows} รายการ` });
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