// 게시글 작성 페이지 구현
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function PostForm({ setPosts }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3000/api/posts', { title, content })
      .then(() => {
        alert('게시글이 작성되었습니다.');
        setTitle('');
        setContent('');

      axios.get('http://localhost:3000/api/posts')
        .then((response) => setPosts(response.data))
        .catch((error) => console.error('Error fetching posts:', error));

      navigate('/');
      })
      .catch((error) => console.error('Error creating post:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>새 게시글 작성</h2>
      <div>
        <label htmlFor="title">제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="content">내용</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <button type="submit">작성</button>
    </form>
  );
}

PostForm.propTypes = {
  setPosts: PropTypes.func.isRequired
};

export default PostForm;