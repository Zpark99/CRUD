import dotenv from 'dotenv';
import mysql from 'mysql2/promise'; // require -> import

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 서버 시작할 때 연결 확인 (이 부분은 그대로 유지) -> top level await
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL 연결 성공');
    connection.release(); // 연결 반납
  } catch (err) {
    console.error('❌ MySQL 연결 실패:', err.message);
  }

export default pool; // module.exports -> export default