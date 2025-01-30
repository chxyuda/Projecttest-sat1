const bcrypt = require("bcryptjs");
const mysql = require("mysql2");

// ตั้งค่าการเชื่อมต่อฐานข้อมูล
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "inventory_management",
});

async function updatePassword(username, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const query = `UPDATE users SET password = ? WHERE username = ?`;
    
    db.query(query, [hashedPassword, username], (err, result) => {
        if (err) {
            console.error("❌ Error updating password:", err);
        } else {
            console.log(`✅ Password updated successfully for ${username}!`);
        }
        db.end(); // ปิดการเชื่อมต่อฐานข้อมูลหลังจากอัปเดตเสร็จ
    });
}

// 🔹 เปลี่ยนรหัสผ่านของ IT Staff ให้เป็น bcrypt
updatePassword("itstaff", "it1234");
