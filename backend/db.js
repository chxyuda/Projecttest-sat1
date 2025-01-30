const mysql = require("mysql2");
require("dotenv").config(); // โหลดตัวแปรแวดล้อมจาก .env

// ✅ ตั้งค่าการเชื่อมต่อ MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "12345678",
    database: process.env.DB_NAME || "inventory_management",
});

db.connect((err) => {
    if (err) {
        console.error("❌ MySQL Connection Error:", err);
        process.exit(1); // ปิดเซิร์ฟเวอร์ถ้าเชื่อมต่อไม่ได้
    }
    console.log("✅ Connected to MySQL database.");
});

module.exports = db; // ✅ ส่งออก `db` เพื่อให้ไฟล์อื่นใช้
