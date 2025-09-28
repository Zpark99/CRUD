import express from 'express';
import db from './config/db.js'; 
import cors from 'cors';

const index = express();
const port = 3000;

index.use(express.json());
index.use(cors());

// 게시글 작성 API
index.post('/api/posts', async (req, res) => {
  console.log('API 요청 받음:', req.body);
  const { title, content } = req.body;
  const query = 'INSERT INTO posts (title, content) VALUES (?, ?)';
  
  try {
    const [result] = await db.query(query, [title, content]);
    console.log('DB 쿼리 성공:', result);
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
    console.log('[GET] DB 쿼리 성공:', results.length, '게시글 조회')
    res.status(200).json(results);
  } catch (err) {
    console.error('데이터베이스 쿼리 오류:', err);
    res.status(500).send('Error fetching posts');
  }
});

// [GET] /api/posts/:id - 특정 게시글 조회 // 근데 조회 시간이 너무 오래 걸린다아아아..
index.get('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM posts ORDER BY id DESC';
  try {
    const [results] = await db.query(query, [id]);

    if (results.length === 0) {
      return res.status(404).send('Post not found');
    }
    res.status(200).json(results[id]);
  } catch (err) {
    console.error('데이터베이스 쿼리 오류:', err);
    res.status(500).send('Error fetching posts');
  }
});

// 게시글 수정 API
index.put('/api/posts/', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const query = 'UPDATE posts SET title = ?, content = ? WHERE id = ?';

  try {
    await db.query(query, [title, content, id]);
    console.log('[PUT] DB 쿼리 성공:');
    res.send('Post updated successfully');
  } catch (err) {
    console.error('[PUT] DB 쿼리 에러:', err);
    res.status(500).send('Error updating post', err);
  }
});

// 게시글 삭제 API
index.delete('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  console.log('[DELETE] /api/posts 요청 받음:', { id });

  const query = 'DELETE FROM posts WHERE id = ?';

  try {
    const [result] = await db.query(query, [id]);
    console.log('[DELETE] DB 쿼리 성공:', result);
    console.log('[DELETE] 삭제된 행 수:', result.affectedRows);
    
    if (result.affectedRows === 0) {
      return res.status(404).send('Post not found');
    }
    
    res.send('Post deleted successfully');
  } catch (err) {
    console.error('[DELETE] DB 쿼리 에러:', err)
    res.status(500).send('Error deleting post', err);
  }
});

// 서버 실행
index.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});