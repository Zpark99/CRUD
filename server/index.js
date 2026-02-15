import express from 'express';
import db from './config/db.js'; 
import cors from 'cors';

const index = express();
const port = 3000;

// 백엔드 코드 수정 
index.use(cors({
  origin: 'https://d3hkrvr14wb43j.cloudfront.net',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));
index.use(express.json());


// 게시글 작성 API, validatePost 추가 
index.post('/api/posts', async (req, res) => {
  const { title, content } = req.body;
  const query = 'INSERT INTO posts (title, content) VALUES (?, ?)';
  
  try {
    const [result] = await db.query(query, [title, content]);
    res.status(201).send('Post created successfully');
  } catch (err) {
    console.error('DB 쿼리 에러', err); // console.errer -> console.error 오타 수정
    res.status(500).send('Error creating post');
  }
});

// [GET] /api/posts - 모든 게시글 조회
index.get('/api/posts', async (req, res) => {
  const query = 'SELECT * FROM posts ORDER BY id DESC';
  
  try {
    const [results] = await db.query(query);
    res.status(200).json(results);
  } catch (err) {
    console.error('데이터베이스 쿼리 오류:', err);
    res.status(500).send('Error fetching posts');
  }
});

// [GET] /api/posts/:id - 특정 게시글 조회
index.get('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM posts WHERE id = ?'; // id 조건 추가

  try {
    const [results] = await db.query(query, [id]); // id를 실제 파라미터로 전달

    if (results.length === 0) {
      return res.status(404).send('Post not found');
    }
    
    res.status(200).json(results[0]); // 첫 번째(단일) 결과만 반환
  } catch (err) {
    console.error('데이터베이스 쿼리 오류:', err);
    res.status(500).json({ message: 'Error fetching post' });
  }
});

// 조회수 증가 API 
index.patch('/api/posts/:id/view', async (req, res) => {
  const { id } = req.params;
  const query = 'UPDATE posts SET view_cnt = view_cnt + 1 WHERE id =?';

  try {
    const [result] = await db.query(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

  } catch (err) {
    console.error('[PATCH] 조회수 증가 오류:', err);
    res.status(500).json({ message: '조회수 증가 실패'});
  }
});

// 게시글 수정 API
index.put('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const query = 'UPDATE posts SET title = ?, content = ? WHERE id = ?';

  try {
    await db.query(query, [title, content, id]);
  } catch (err) {
    console.error('[PUT] DB 쿼리 에러:', err);
    res.status(500).send('Error updating post', err);
  }
});


// 게시글 삭제 API
index.delete('/api/posts/:id', async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM posts WHERE id = ?';

  try {
    const [result] = await db.query(query, [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).send('Post not found');
    }
    
    res.send('Post deleted successfully');
  } catch (err) {
    console.error('[DELETE] DB 쿼리 에러:', err)
    res.status(500).send('Error deleting post', err);
  }
});

// 검증 미들웨어 작성 - 게시글 작성 및 수정 반영
const validatePost = (req, res, next) => {
  const { title, content } = req.body;
  if( !title || !content || title.trim() === '' || content.trim() === '') {
    return res.status(400).json({ message: '제목과 내용을 모두 입력해야 합니다.' });
  }
  next();
};

// 서버 실행 // 
index.listen(port, () => {
  console.log(`Server running on port ${port}`);
});