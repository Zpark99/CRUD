const express = require('express');
const index = express();
const pool = require('./config/db');
const cors = require('cors');

const bodyParser = require("body-parser");
const port = 3000; // 포트 번호 설정

index.use(bodyParser.json());
index.use(bodyParser.urlencoded({extended: true}));

index.use(cors()); // CORS 미들웨어 추가, npm install cors로 해결
index.use(express.json()) // JSON 요청 처리

// 게시글 작성 API
index.post('/api/posts', (req, res) => {
  const { title, content } = req.body;
  const query = 'INSERT INTO posts (title, content) VALUES (?, ?)';
  db.query(query, [title, content], (err, result) => {
    if (err) {
      return res.status(500).send('Error creating post');
    }
    res.status(201).send('Post created successfully');
  });
});

// 게시글 상세 정보 가져오기
index.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM posts WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: '서버 오류' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다' });
    }
    res.json(results[0]);
  });
});

// 게시글 수정 API
index.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const query = 'UPDATE posts SET title = ?, content = ? WHERE id = ?';
  db.query(query, [title, content, id], (err, result) => {
    if (err) {
      return res.status(500).send('Error updating post');
    }
    res.send('Post updated successfully');
  });
});

// 게시글 삭제 API
index.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM posts WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).send('Error deleting post');
    }
    res.send('Post deleted successfully');
  });
});

// 서버 실행
index.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

/* DB 테스트 완료
// index.get('/', async ( req, res ) => {
//   try {
//     const [rows] = await pool.query('SELECT NOW() AS now');
//     res.json(rows[0]);
//   } catch (err) {
//     console.error('DB 연결 오류:', err);
//     res.status(500).send('DB 연결 실패');
//   }
// });

// index.listen(port, () => {
//   console.log(`Sever running on port ${port}`)
// })
*/