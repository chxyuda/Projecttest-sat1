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

      // ✅ ตรวจสอบรหัสผ่าน (ต้องตรงกับฐานข้อมูล)
      if (password !== user.password) {
          console.log("❌ Password mismatch");
          return res.status(401).json({ success: false, message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
      }

      // ✅ ตรวจสอบสถานะของบัญชี
      if (user.status.trim().toLowerCase() !== "approved") {
          console.log("❌ User not approved");
          return res.status(403).json({ success: false, message: "บัญชีของคุณยังไม่ได้รับการอนุมัติจาก IT" });
      }

     // ✅ อนุญาตให้ **IT, User และ Approver** เข้าสู่ระบบได้
if (user.role.trim().toLowerCase() === "it" || user.role.trim().toLowerCase() === "user" || user.role.trim().toLowerCase() === "approver") {
  console.log("✅ User Login Successful:", user.role);
  return res.status(200).json({
      success: true,
      message: "เข้าสู่ระบบสำเร็จ",
      user: {
          id: user.id,
          username: user.username,
          role: user.role,
      }
  });
}else {
          console.log("❌ Unauthorized Role:", user.role);
          return res.status(403).json({ success: false, message: "คุณไม่มีสิทธิ์เข้าถึงระบบ" });
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

const checkUserExists = (username, email, callback) => {
  const query = "SELECT COUNT(*) AS count FROM users WHERE username = ? OR email = ?";
  db.query(query, [username, email], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0].count > 0);
  });
};
// API: เพิ่มผู้ใช้งานใหม่
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 2 * 1024 * 1024 }, // จำกัดขนาดไฟล์ 2MB
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("❌ ต้องเป็นไฟล์รูปภาพเท่านั้น!"), false);
        }
        cb(null, true);
    }
});

router.post("/signup", upload.single("image"), async (req, res) => { 
  console.log("📩 ข้อมูลที่ได้รับจาก Frontend:", req.body);
  console.log("📸 รูปภาพที่ได้รับ:", req.file ? "มีไฟล์" : "ไม่มีไฟล์");

  // ✅ รับค่าจาก req.body
  const { username, password, fullName, email, phone, department_name, section_name, task_name } = req.body;

  // ✅ ตรวจสอบว่ามีไฟล์หรือไม่ ถ้าไม่มีให้ `image` เป็น `NULL`
  const image = req.file ? req.file.buffer : null; // ใช้ Buffer แทน Base64

  // ✅ Debug ข้อมูลที่รับเข้ามา
  console.log({
      username, password, fullName, email, phone,
      department_name, section_name, task_name, image
  });

  // ✅ ตรวจสอบข้อมูลว่าครบหรือไม่
  if (!username || !password || !fullName || !email || !phone || !department_name || !section_name || !task_name) {
      return res.status(400).json({ success: false, message: "❌ ข้อมูลไม่ครบ" });
  }

  try {
      let query, values;

      // ✅ SQL รองรับ `image` เป็น `NULL`
      query = `
          INSERT INTO users (username, password, fullName, email, phone, department_name, section_name, task_name, image, role, status)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'User', 'Pending')
      `;
      values = [username, password, fullName, email, phone, department_name, section_name, task_name, image];

      // ✅ Debug SQL Query
      console.log("📝 Query:", query);
      console.log("🔢 Values:", values);

      // ✅ รัน SQL
      db.query(query, values, (err, result) => {
          if (err) {
              console.error("❌ SQL Error:", err);
              return res.status(500).json({ success: false, error: err.message });
          }
          return res.status(201).json({ success: true, message: "✅ สมัครสมาชิกสำเร็จ!" });
      });

  } catch (error) {
      console.error("❌ Error:", error);
      return res.status(500).json({ success: false, message: "เกิดข้อผิดพลาด" });
  }
});

app.put('/api/approve-user/:id', (req, res) => { 
  const userId = req.params.id;

  if (!userId) {
      return res.status(400).json({ success: false, message: "❌ ไม่มี ID ผู้ใช้ที่ต้องการอนุมัติ" });
  }

  const query = `UPDATE users SET status = 'Approved' WHERE id = ?`;
  db.query(query, [userId], (err, result) => {
      if (err) {
          console.error('❌ Database update error:', err);
          return res.status(500).json({ success: false, message: '❌ เกิดข้อผิดพลาดในการอนุมัติผู้ใช้' });
      }

      if (result.affectedRows === 0) {
          return res.status(404).json({ success: false, message: '❌ ไม่พบผู้ใช้ที่ต้องการอนุมัติ' });
      }

      // ✅ ดึงข้อมูลอัปเดตกลับไปยัง Frontend
      const getUserQuery = `SELECT id, username, fullName, email, phone, department_name, section_name, task_name, image FROM users WHERE id = ?`;
      db.query(getUserQuery, [userId], (err, userResult) => {
          if (err) {
              console.error("❌ Error fetching updated user:", err);
              return res.status(500).json({ success: false, message: '❌ ไม่สามารถดึงข้อมูลผู้ใช้ที่อนุมัติแล้ว' });
          }

          const user = userResult[0];
          res.status(200).json({
              success: true, 
              message: '✅ อนุมัติผู้ใช้สำเร็จ',
              user: {
                  ...user,
                  image: user.image || "/assets/no-image.png" // ✅ ตรวจสอบรูปภาพ
              }
          });
      });
  });
});


app.get('/api/pending-users', (req, res) => {
  const query = `
      SELECT id, username, fullName, email, phone, department_name, section_name, task_name, image 
      FROM users 
      WHERE status = 'Pending'`;

  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ Database error:', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
    
    // ✅ ตรวจสอบว่ามีรูปภาพหรือไม่ ถ้าไม่มีให้ใช้ค่า default
    const users = results.map(user => ({
      ...user,
      image: user.image || "/assets/no-image.png" // ✅ รูปเริ่มต้นถ้าไม่มี
    }));

    console.log("📌 Pending Users Data:", users);
    res.status(200).json({ success: true, users });
  });
});


app.put('/api/reject-user/:id', (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ success: false, message: "❌ ไม่มี ID ผู้ใช้ที่ต้องการไม่อนุมัติ" });
  }

  const query = `UPDATE users SET status = 'Rejected' WHERE id = ?`;
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error('❌ Database update error:', err);
      return res.status(500).json({ success: false, message: '❌ เกิดข้อผิดพลาดในการไม่อนุมัติผู้ใช้' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: '❌ ไม่พบผู้ใช้ที่ต้องการไม่อนุมัติ' });
    }

    res.status(200).json({ success: true, message: '✅ ไม่อนุมัติผู้ใช้สำเร็จ' });
  });
});


app.get("/api/users", (req, res) => {
  const query = `
      SELECT id, username, fullName, phone, email, department_name, section_name, task_name, status
      FROM users
      WHERE status = 'Approved'`;  // ✅ ดึงเฉพาะ Approved

  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error fetching approved users:", err.message);
      return res.status(500).json({ error: "❌ Failed to fetch approved users" });
    }

    res.json(results);
  });
});


app.get("/api/users/pending/count", (req, res) => {
  const query = "SELECT COUNT(*) AS count FROM users WHERE status = 'Pending'";

  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error fetching pending users count:", err.message);
      return res.status(500).json({ error: "❌ Failed to fetch pending users count" });
    }

    res.json({ count: results[0].count });
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

router.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM products WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ success: false, message: 'ไม่พบสินค้า' });
    }
    res.json(result[0]);
  });
});

router.get('/products/model/:model', (req, res) => {
  const { model } = req.params;
  const sql = `
    SELECT model, remaining
    FROM products
    WHERE model = ?
  `;

  db.query(sql, [model], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ success: false, message: 'ไม่พบสินค้า' });
    }
    res.json(result[0]);
  });
});


//เพิ่มข้อมูลใหม่
app.post("/api/products", (req, res) => {
  console.log("📌 ข้อมูลที่ได้รับจาก Frontend:", req.body);

  const {
    name,  // ❌ name นี้ใช้ผิด ควรใช้ equipment
    category,  
    brand,  
    inventory_number,
    serial_number = "-",
    details = "-",
    equipment_number = "-",
    equipment // ✅ ต้องใช้ค่าจาก req.body.equipment
} = req.body;

const model = name; // ✅ model ใช้ค่าจาก name ถูกต้อง (CC11111)
const category_name = category;
const brand_name = brand;
const product_name = equipment; // ✅ name ควรเป็นค่า equipment (หมึกพิมพ์)




  // ตรวจสอบว่าข้อมูลครบถ้วน
  if (!model || !category_name || !name || !brand_name || !inventory_number) {
      console.error("❌ ข้อมูลไม่ครบ:", { model, category_name, name, brand_name, inventory_number });
      return res.status(400).json({ success: false, message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  const query = `
    INSERT INTO products (category_name, name, brand_name, model, serial_number, inventory_number, status, details, borrowed_number, equipment_number)
    VALUES (?, ?, ?, ?, ?, ?, "In Stock", ?, 0, ?)
`;

db.query(
    query,
    [category_name, product_name, brand_name, model, serial_number, inventory_number, details, equipment_number],  // ✅ ใช้ product_name แทน name
    (err, result) => {
        if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในระบบ" });
        }
        console.log("✅ เพิ่มข้อมูลสำเร็จ:", { model, category_name, product_name, brand_name, inventory_number });
        res.status(201).json({ success: true, id: result.insertId });
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
      details = ?  -- ✅ อัปเดตตรงๆ โดยไม่ใช้ COALESCE
    WHERE id = ?
  `;

  db.query(
    query,
    [
      data.name,
      data.category_name,
      data.equipment,
      data.brand_name,
      data.equipment_number,
      data.serial_number,
      data.inventory_number,
      data.details,  // ✅ อนุญาตให้บันทึกค่าว่าง
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


app.get('/api/options', async (req, res) => {
  try {
    const [categories] = await db.promise().query("SELECT DISTINCT category_name AS category FROM products");
    const [equipments] = await db.promise().query("SELECT DISTINCT name AS equipment FROM products");
    const [brands] = await db.promise().query("SELECT DISTINCT brand_name AS brand FROM products");

    res.status(200).json({
      success: true,
      categories: categories,
      equipments: equipments,
      brands: brands,
    });
  } catch (error) {
    console.error("❌ Database error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
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


// ลบข้อมูลสินค้า (Products)
app.delete("/api/products", (req, res) => {
  const { ids } = req.body; // รับค่า ids เป็น Array

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: "❌ กรุณาระบุสินค้าที่ต้องการลบ" });
  }

  console.log("📌 IDs ที่ต้องการลบ:", ids); // ✅ Debug IDs

  const placeholders = ids.map(() => "?").join(","); // ✅ ป้องกัน SQL Injection
  const query = `DELETE FROM products WHERE id IN (${placeholders})`;

  db.query(query, ids, (err, results) => {
      if (err) {
          console.error("❌ Error deleting products:", err);
          return res.status(500).json({ success: false, message: "❌ เกิดข้อผิดพลาดในการลบข้อมูล" });
      }

      console.log("✅ ลบข้อมูลสำเร็จ:", results.affectedRows, "รายการ"); // ✅ Debug จำนวนที่ถูกลบ
      res.status(200).json({ success: true, message: `✅ ลบข้อมูลสำเร็จ ${results.affectedRows} รายการ` });
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
  const query = 'SELECT id, name FROM brands'; // ✅ เพิ่ม id
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

  console.log("📌 Received ID:", id); // ✅ ตรวจสอบค่า ID
  console.log("📌 Received Name:", name); // ✅ ตรวจสอบชื่อใหม่ที่ได้รับ

  if (!id || !name) {
    return res.status(400).json({ success: false, message: "กรุณาระบุ ID และชื่อยี่ห้อ" });
  }

  const updateQuery = "UPDATE brands SET name = ? WHERE id = ?";
  db.query(updateQuery, [name, id], (err, result) => {
    if (err) {
      console.error("❌ Error updating brand:", err);
      return res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในการแก้ไขยี่ห้อ" });
    }

    console.log("✅ Rows Affected:", result.affectedRows); // ✅ ตรวจสอบว่ามีการอัปเดตข้อมูลจริงหรือไม่

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

// ✅ ใช้ฟิลด์ `password_encrypted` แทน `original_password`
app.get("/api/users", (req, res) => {
  const query = `
      SELECT 
          id, username, fullName, phone, email, 
          department_name, section_name, task_name, status, image, password
      FROM users
  `;

  db.query(query, (err, results) => {
      if (err) {
          console.error("❌ Error fetching users:", err.message);
          return res.status(500).json({ error: "❌ Failed to fetch users" });
      }

      res.json(results); // ✅ ส่งรหัสผ่านปกติไปที่ Frontend
  });
});


app.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  const query = `
      SELECT id, username, fullName, phone, email, department_name, section_name, task_name, password 
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
      }
      res.json(results[0]); // ✅ ส่งรหัสผ่านปกติไปที่ Frontend ได้เลย
  });
});

// ✅ API เพิ่มผู้ใช้ใหม่
app.post("/api/users", async (req, res) => {
  const { fullName, department_name, section_name, task_name, phone, email, username, password } = req.body;

  if (!username || !password || !fullName || !email || !phone || !department_name || !section_name || !task_name) {
      return res.status(400).json({ error: "❌ ข้อมูลไม่ครบ กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  try {
      // บันทึกรหัสผ่านจริงโดยไม่เข้ารหัส
      const query = `
          INSERT INTO users (fullName, department_name, section_name, task_name, phone, email, username, password, status, role)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Pending', 'User')
      `;

      db.query(query, [fullName, department_name, section_name, task_name, phone, email, username, password], (err, results) => {
          if (err) {
              console.error("❌ Error adding user:", err);
              return res.status(500).json({ error: "❌ Failed to add user" });
          }
          res.status(201).json({ message: "✅ สมัครสมาชิกสำเร็จ! กรุณารอ IT อนุมัติบัญชีของคุณ", userId: results.insertId });
      });

  } catch (error) {
      console.error("❌ Error:", error);
      res.status(500).json({ error: "❌ เกิดข้อผิดพลาดในการสมัครสมาชิก" });
  }
});

// ✅ API อัปเดตข้อมูลบุคลากร
app.put('/api/users/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const { fullName, email, phone, department_name, section_name, task_name } = req.body;

      console.log("📌 ข้อมูลที่ได้รับจาก Frontend:", req.body); // ✅ Debug

      if (!id) {
          return res.status(400).json({ success: false, message: "❌ ไม่มี ID ผู้ใช้ที่ต้องการอัปเดต" });
      }

      if (!fullName || !email || !phone || !department_name || !section_name || !task_name) {
          return res.status(400).json({ success: false, message: "❌ ข้อมูลไม่ครบถ้วน กรุณากรอกข้อมูลให้ครบ" });
      }

      // ✅ อัปเดต `name` ในตาราง `users`
      const sql = `
          UPDATE users 
          SET fullName = ?, email = ?, phone = ?, 
              department_name = ?, section_name = ?, task_name = ?
          WHERE id = ?
      `;
      const values = [fullName, email, phone, department_name, section_name, task_name, id];

      console.log("📌 SQL Query ที่จะใช้:", sql);
      console.log("📌 ค่า Parameters:", values);

      const [result] = await db.promise().query(sql, values);

      console.log("📌 ผลลัพธ์จาก SQL Query:", result);

      if (result.affectedRows === 0) {
          return res.status(404).json({ success: false, message: "❌ ไม่พบผู้ใช้ที่ต้องการอัปเดต" });
      }

      res.json({ 
        success: true, 
        message: "✅ อัปเดตข้อมูลสำเร็จ!", 
        updatedUser: { fullName, email, phone, department_name, section_name, task_name } 
      });

  } catch (error) {
      console.error("❌ Error updating user:", error);
      res.status(500).json({ success: false, message: "❌ เกิดข้อผิดพลาดในการอัปเดตข้อมูล" });
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

//ดึงข้อมูล
app.get("/api/profile", async (req, res) => {
  try {
      const { username } = req.query; // รับ username จาก React

      if (!username) {
          return res.status(400).json({ message: "กรุณาระบุ username" });
      }

      // ✅ เพิ่มฟิลด์ให้ครบทุกข้อมูลที่ต้องการ
      const query = `
        SELECT 
          u.id, 
          u.fullName,
          u.username, 
          u.password, 
          u.phone, 
          u.email, 
          u.department_name, 
          u.section_name, 
          u.task_name, 
          u.image 
        FROM users u
        WHERE u.username = ?`;

      db.query(query, [username], (err, results) => {
          if (err) {
              console.error("❌ Database error:", err);
              return res.status(500).json({ message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
          }

          if (results.length === 0) {
              return res.status(404).json({ message: "ไม่พบข้อมูลผู้ใช้" });
          }

          res.json(results[0]); // ✅ ส่งข้อมูลกลับไปที่ React
      });
  } catch (error) {
      console.error("❌ Server error:", error);
      res.status(500).json({ message: "เกิดข้อผิดพลาดในการดึงข้อมูลโปรไฟล์" });
  }
});

//อัพเดต
app.post("/api/update-profile", upload.single("image"), (req, res) => {
  console.log("📌 ข้อมูลที่ได้รับจาก React:", req.body);

  const { username, fullName, phone, email, department_name, section_name, task_name } = req.body;
  let imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  // ✅ ตรวจสอบว่าค่าที่ได้รับไม่เป็น undefined
  if (!username || !fullName || !phone || !email || !department_name || !section_name || !task_name) {
    console.error("❌ ข้อมูลไม่ครบ:", req.body);
    return res.status(400).json({ message: "❌ ข้อมูลไม่ครบ กรุณากรอกให้ครบทุกช่อง" });
  }

  const query = `
    UPDATE users 
    SET fullName=?, phone=?, email=?, department_name=?, section_name=?, task_name=?, image=IFNULL(?, image) 
    WHERE username=?`;

  db.query(query, [fullName, phone, email, department_name, section_name, task_name, imagePath, username], (err, results) => {
    if (err) {
      console.error("❌ Error updating profile:", err);
      return res.status(500).json({ message: "เกิดข้อผิดพลาดในการอัปเดต" });
    }

    console.log("✅ อัปเดตสำเร็จ! Rows affected:", results.affectedRows);

    if (results.affectedRows > 0) {
      db.query("SELECT * FROM users WHERE username = ?", [username], (err, updatedResults) => {
        if (err) {
          return res.status(500).json({ message: "❌ ไม่สามารถดึงข้อมูลที่อัปเดตได้" });
        }
        res.json({ success: true, message: "อัปเดตสำเร็จ!", userData: updatedResults[0] });
      });
    } else {
      res.json({ success: false, message: "❌ ไม่มีการเปลี่ยนแปลงข้อมูล หรือ username ไม่ถูกต้อง" });
    }
  });
});


app.post("/api/upload-profile", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "ไม่พบไฟล์ที่อัปโหลด" });

  const imageUrl = `http://localhost:5001/uploads/${req.file.filename}`;
  console.log("📌 รูปอัปโหลดแล้ว:", imageUrl);
  res.json({ success: true, imageUrl });
});


app.put("/api/update-profile", (req, res) => {
  let { id, fullName, phone, email, department_name, section_name, task_name, image } = req.body;

  if (!id) {
      return res.status(400).json({ success: false, message: "❌ ไม่มี ID ของผู้ใช้" });
  }

  // ✅ ตรวจสอบค่าก่อนอัปเดต
  department_name = department_name?.trim() || null;
  section_name = section_name?.trim() || null;
  task_name = task_name?.trim() || null;
  image = image || null; // ถ้าไม่มีรูป ไม่ต้องอัปเดต

  const query = `
      UPDATE users 
      SET fullName = ?, phone = ?, email = ?, department_name = ?, section_name = ?, task_name = ?, image = IFNULL(?, image)
      WHERE id = ?
  `;

  db.query(query, [fullName, phone, email, department_name, section_name, task_name, image, id], (err, results) => {
      if (err) {
          console.error("❌ Database Update Error:", err);
          return res.status(500).json({ success: false, message: "❌ เกิดข้อผิดพลาดในการอัปเดตฐานข้อมูล" });
      }
      
      if (results.affectedRows === 0) {
          return res.status(404).json({ success: false, message: "❌ ไม่พบผู้ใช้ที่ต้องการอัปเดต" });
      }

      // ✅ ดึงข้อมูลล่าสุดกลับไปยัง React
      db.query("SELECT id, fullName, phone, email, department_name, section_name, task_name, image FROM users WHERE id = ?", [id], (err, updatedResults) => {
        if (err) {
          return res.status(500).json({ message: "❌ ไม่สามารถดึงข้อมูลที่อัปเดตได้" });
        }
        res.json({ success: true, message: "✅ อัปเดตสำเร็จ!", userData: updatedResults[0] });
      });
  });
});


// ✅ เพิ่มคำขอเบิกวัสดุ (ดึง user_id จากฐานข้อมูล users อัตโนมัติ)
router.post('/requests', (req, res) => {
  const {
    borrowerName,
    department,
    phone,
    email,
    material, // ยังรับ material แต่จริง ๆ คือ model
    category,
    equipment,
    brand,
    quantity,
    note,
    requestDate,
  } = req.body;

  const findUserSql = `SELECT id FROM users WHERE fullName = ?`;
  const checkStockSql = `SELECT remaining FROM products WHERE model = ?`;
  const insertSql = `
  INSERT INTO requests (user_id, borrower_name, department, phone, email, material, type, equipment, brand, quantity_requested, note, date_requested)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;
  const updateProductSql = `
  UPDATE products 
  SET remaining = remaining - ? 
  WHERE model = ? AND remaining >= ?
`;


  db.query(findUserSql, [borrowerName], (err, userResult) => {
    if (err) {
      console.error('FIND USER FAILED:', err);
      return res.status(500).json({ error: 'FIND USER FAILED: ' + err.message });
    }

    if (userResult.length === 0) {
      return res.status(404).json({ error: 'ไม่พบผู้ใช้ในระบบ' });
    }

    const userId = userResult[0].id;

    db.query(checkStockSql, [material], (err, stockResult) => {
      if (err) {
        console.error('CHECK STOCK FAILED:', err);
        return res.status(500).json({ error: 'CHECK STOCK FAILED: ' + err.message });
      }

      if (stockResult.length === 0) {
        return res.status(404).json({ error: 'ไม่พบวัสดุนี้ในคลัง' });
      }

      const remainingStock = stockResult[0].remaining;
      if (remainingStock < quantity) {
        return res.status(400).json({ error: 'จำนวนคงเหลือไม่เพียงพอ' });
      }

      db.query(
        insertSql,
        [userId, borrowerName, department, phone, email, material, category, equipment, brand, quantity, note, requestDate],
        (err, result) => {
          if (err) {
            console.error('INSERT REQUEST FAILED:', err);
            return res.status(500).json({ error: 'INSERT REQUEST FAILED: ' + err.message });
          }

          db.query(updateProductSql, [quantity, material, quantity], (err, updateResult) => {
            if (err) {
              console.error('UPDATE STOCK FAILED:', err);
              return res.status(500).json({ error: 'บันทึกคำขอได้ แต่ตัดสต็อกไม่สำเร็จ: ' + err.message });
            }

            if (updateResult.affectedRows === 0) {
              return res.status(400).json({ error: 'จำนวนคงเหลือไม่เพียงพอ หรือวัสดุไม่มีอยู่จริง' });
            }

            res.status(201).json({ message: 'บันทึกคำขอและตัดสต็อกสำเร็จ', id: result.insertId });
          });
        }
      );
    });
  });
});


// ✅ 2. ดึงคำขอทั้งหมด
router.get('/requests', (req, res) => {
  const sql = 'SELECT * FROM requests ORDER BY created_at DESC';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

router.get('/requests/user/:userId', (req, res) => {
  const { userId } = req.params;
  const sql = 'SELECT * FROM requests WHERE user_id = ? ORDER BY created_at DESC';

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// ✅ 3. ดึงคำขอตาม ID
router.get('/requests/:id', (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT r.*, p.remaining 
    FROM requests r 
    LEFT JOIN products p ON r.material = p.model 
    WHERE r.id = ?`;

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'ไม่พบคำขอ' });
    }
    res.json(results[0]);  // ✅ ต้องมี `remaining` กลับไปด้วย
  });
});


// ✅ ดึงคำขอตามชื่อผู้เบิก (เช่น fullName)
router.get('/requests/user/:username', (req, res) => {
  const { username } = req.params;
  const sql = 'SELECT * FROM requests WHERE borrower_name = ? ORDER BY created_at DESC';

  db.query(sql, [username], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// ✅ 4. อัปเดตสถานะคำขอ (สำหรับผู้อนุมัติ)
router.put('/requests/:id/approve', (req, res) => {
  const { id } = req.params;
  const { status, approved_by, date_approved, note } = req.body; // เปลี่ยนเป็น note

  const sql = `
    UPDATE requests 
    SET status = ?, approved_by = ?, date_approved = ?, note = ?, notification_status = 1
    WHERE id = ?
  `;

  db.query(sql, [status, approved_by, date_approved, note, id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'อัปเดตสถานะคำขอสำเร็จ' });
  });
});


// ✅ 5. อัปเดตสถานะเป็น "รับของแล้ว" (สำหรับ IT Staff)
router.put('/requests/:id/receive', (req, res) => {
  const { id } = req.params;
  const { received_by, date_received } = req.body;

  console.log("🔹 API HIT: PUT /requests/:id/receive", { id, received_by, date_received });

  // ✅ ตรวจสอบว่ามีค่าถูกส่งมาหรือไม่
  if (!received_by || !date_received) {
    return res.status(400).json({ error: "กรุณาส่งค่าผู้รับของและวันที่รับของ" });
  }

  const sql = `
    UPDATE requests 
    SET status = 'Received', received_by = ?, date_received = ?
    WHERE id = ?
  `;

  db.query(sql, [received_by, date_received, id], (err, result) => {
    if (err) {
      console.error("🔥 UPDATE ERROR:", err);
      return res.status(500).json({ error: "เกิดข้อผิดพลาดในการอัปเดตสถานะ" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "ไม่พบคำขอที่ต้องการอัปเดต" });
    }

    res.json({ message: "อัปเดตสถานะเป็น 'รับของแล้ว' สำเร็จ" });
  });
});


// ✅ 6. อัปเดตสถานะการแจ้งเตือน (เมื่อผู้ใช้กดดูแจ้งเตือน)
router.put('/requests/:id/notification', (req, res) => {
  const { id } = req.params;

  const sql = 'UPDATE requests SET notification_status = 0 WHERE id = ?';

  db.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'อัปเดตสถานะแจ้งเตือนสำเร็จ' });
  });
});

// ✅ เพิ่มคำขอยืมวัสดุ (ดึง user_id จากฐานข้อมูล users อัตโนมัติ)
router.post('/borrow-requests', (req, res) => {
  const {
    user_id,
    borrower_name,
    department,
    phone,
    email,
    material,
    category, // ใช้ category
    equipment,
    brand,
    quantity_requested,
    note,
    request_date,
    return_date,
  } = req.body;

  const checkStockSql = `SELECT remaining FROM products WHERE model = ?`;
  const insertRequestSql = `
    INSERT INTO borrow_requests (
      user_id, borrower_name, department, phone, email, material, category, equipment, brand, quantity_requested, note, request_date, return_date, status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')
  `;
  const updateStockSql = `UPDATE products SET remaining = remaining - ? WHERE model = ? AND remaining >= ?`;

  db.query(checkStockSql, [material], (err, results) => {
    if (err) {
      console.error('CHECK STOCK FAILED:', err);
      return res.status(500).json({ error: 'CHECK STOCK FAILED: ' + err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'ไม่พบสินค้าในคลัง' });
    }

    const remainingStock = results[0].remaining;
    if (remainingStock < quantity_requested) {
      return res.status(400).json({ error: 'จำนวนคงเหลือไม่เพียงพอ' });
    }

    db.query(
      insertRequestSql,
      [user_id, borrower_name, department, phone, email, material, category, equipment, brand, quantity_requested, note, request_date, return_date],
      (err, result) => {
        if (err) {
          console.error('INSERT BORROW REQUEST FAILED:', err);
          return res.status(500).json({ error: 'INSERT BORROW REQUEST FAILED: ' + err.message });
        }

        db.query(updateStockSql, [quantity_requested, material, quantity_requested], (err) => {
          if (err) {
            return res.status(500).json({ error: 'UPDATE STOCK FAILED: ' + err.message });
          }

          res.status(201).json({ message: 'บันทึกคำขอสำเร็จ', id: result.insertId });
        });
      }
    );
  });
});



// ✅ ดึงคำขอทั้งหมด
router.get('/borrow-requests', (req, res) => {
  const sql = `SELECT * FROM borrow_requests ORDER BY created_at DESC`;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


// ✅ ดึงคำขอของผู้ใช้ตาม userId
router.get('/borrow-requests/user/:userId', (req, res) => {
  const { userId } = req.params;
  const sql = `SELECT * FROM borrow_requests WHERE user_id = ? ORDER BY created_at DESC`;

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


// ✅ ดึงคำขอตาม ID
router.get('/borrow-requests/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM borrow_requests WHERE id = ?`;

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ message: 'ไม่พบคำขอ' });
    }

    res.json(results[0]);
  });
});


// ✅ อัปเดตสถานะคำขอ (สำหรับผู้อนุมัติ)
router.put('/borrow-requests/:id/approve', (req, res) => {
  const { id } = req.params;
  const { status, approved_by, date_approved, note } = req.body;

  const updateRequestSql = `
    UPDATE borrow_requests 
    SET status = ?, approved_by = ?, date_approved = ?, note = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.query(updateRequestSql, [status, approved_by, date_approved, note, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });

    if (status === 'Rejected') {
      // ดึงข้อมูลวัสดุที่ขอ เพื่อคืนจำนวนในกรณีไม่อนุมัติ
      const getRequestSql = `SELECT material, quantity_requested FROM borrow_requests WHERE id = ?`;
      const updateStockSql = `UPDATE products SET remaining = remaining + ? WHERE model = ?`;

      db.query(getRequestSql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length > 0) {
          const { material, quantity_requested } = results[0];

          db.query(updateStockSql, [quantity_requested, material], (err) => {
            if (err) return res.status(500).json({ error: err.message });

            return res.json({ message: 'อัปเดตสถานะเป็น ไม่อนุมัติ และคืนจำนวนอุปกรณ์สำเร็จ' });
          });
        } else {
          return res.status(404).json({ message: 'ไม่พบคำขอ' });
        }
      });
    } else {
      res.json({ message: 'อัปเดตสถานะสำเร็จ' });
    }
  });
});


// ✅ อัปเดตสถานะเป็น "รับของแล้ว" (สำหรับ IT Staff)
router.put('/borrow-requests/:id/receive', (req, res) => {
  const { id } = req.params;
  const { received_by, date_received } = req.body;

  const sql = `
    UPDATE borrow_requests 
    SET status = 'Received', received_by = ?, date_received = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.query(sql, [received_by, date_received, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({ message: 'อัปเดตสถานะเป็น รับของแล้ว สำเร็จ' });
  });
});


// ✅ อัปเดตสถานะเป็น "คืนของแล้ว" และคืนสต็อก (สำหรับการคืนอุปกรณ์)
router.put('/borrow-requests/:id/return', (req, res) => {
  const { id } = req.params;
  const { return_date } = req.body;

  const getQuantitySql = `SELECT material, quantity_requested FROM borrow_requests WHERE id = ?`;
  const updateRequestSql = `
    UPDATE borrow_requests 
    SET status = 'Returned', return_date = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;
  const updateStockSql = `UPDATE products SET remaining = remaining + ? WHERE model = ?`;

  db.query(getQuantitySql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) return res.status(404).json({ message: 'ไม่พบคำขอ' });

    const { material, quantity_requested } = results[0];

    db.query(updateRequestSql, [return_date, id], (err) => {
      if (err) return res.status(500).json({ error: err.message });

      db.query(updateStockSql, [quantity_requested, material], (err) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json({ message: 'อัปเดตสถานะคืนของแล้ว และคืนสต็อกสำเร็จ' });
      });
    });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});