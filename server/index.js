const express = require('express');
const index = express();
const pool = require('./config/db');

const bodyParser = require("body-parser");
const port = 3000; // 포트 번호 설정

index.use(bodyParser.json());
index.use(bodyParser.urlencoded({extended: true}));

index.get('/', async ( req, res ) => {
  try {
    const [rows] = await pool.query('SELECT NOW() AS now'); // DB 테스트용
    res.json(rows[0]);
  } catch (err) {
    console.error('DB 연결 오류:', err);
    res.status(500).send('DB 연결 실패');
  }
});

index.listen(port, () => {
  console.log(`Sever running on port ${port}`)
})
