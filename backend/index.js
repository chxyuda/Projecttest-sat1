const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// Create Express app
const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678', // Change to your MySQL password
    database: 'inventory_management'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// API: Get Departments
app.get('/api/departments', (req, res) => {
    const query = 'SELECT * FROM departments';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching departments:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json(results);
    });
});

// API: Get Sections by Department
app.post('/api/signup', (req, res) => {
  const { username, password, fullName, email, phone, departmentId, sectionId, taskId } = req.body;

  // ตรวจสอบว่าข้อมูลครบถ้วน
  if (!username || !password || !fullName || !email || !departmentId) {
      return res.status(400).json({ error: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
  }

  // Query ชื่อ department, section, task
  const queryDepartment = 'SELECT name FROM departments WHERE id = ?';
  db.query(queryDepartment, [departmentId], (err, departmentResult) => {
      if (err) {
          console.error('Error fetching department name:', err);
          return res.status(500).json({ error: 'เกิดข้อผิดพลาดในฐานข้อมูล' });
      }
      const departmentName = departmentResult[0]?.name || null;

      const querySection = 'SELECT name FROM sections WHERE id = ?';
      db.query(querySection, [sectionId], (err, sectionResult) => {
          if (err) {
              console.error('Error fetching section name:', err);
              return res.status(500).json({ error: 'เกิดข้อผิดพลาดในฐานข้อมูล' });
          }
          const sectionName = sectionResult[0]?.name || null;

          const queryTask = 'SELECT name FROM tasks WHERE id = ?';
          db.query(queryTask, [taskId], (err, taskResult) => {
              if (err) {
                  console.error('Error fetching task name:', err);
                  return res.status(500).json({ error: 'เกิดข้อผิดพลาดในฐานข้อมูล' });
              }
              const taskName = taskResult[0]?.name || null;

              // Insert ข้อมูลลงใน users
              const queryInsert = `
                  INSERT INTO users 
                  (username, password, fullName, email, phone, department_name, section_name, task_name, role, status, createdAt, updatedAt)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'User', 'Pending', NOW(), NOW())
              `;
              db.query(queryInsert, [username, password, fullName, email, phone, departmentName, sectionName, taskName], (err) => {
                  if (err) {
                      console.error('Error inserting user:', err);
                      return res.status(500).json({ error: 'เกิดข้อผิดพลาดในฐานข้อมูล' });
                  }
                  res.status(201).json({ message: 'สมัครสมาชิกสำเร็จ' });
              });
          });
      });
  });
});


// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
