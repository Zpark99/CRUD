// 게시글 작성 페이지 구현
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Row, Form, Button, Alert } from 'react-bootstrap';

const API_URL = import.meta.env.VITE_API_BASE_URL;

// API_URL 수정완료 

function PostForm({ setPosts }) {

  // validation Error Message
  const [ error, setError ] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError('제목과 내용을 모두 입력하세요.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/posts`, {
        title, 
        content,
      });
    
      if(setPosts) {
        setPosts((prev) => [response.data, ...prev]);
    } 
    alert('게시글이 성공적으로 작성되었습니다!');
    navigate('/');

    } catch (err) {
      console.error('Error creating post:', err);
      setError('게시글 작성 중 오류가 발생했습니다, 서버 연결을 확인하세요.');
    }
  };

  return (
    <Container style={{ maxWidth: '800px', marginTop: '50px' }}>
      <h2 className="mb-5">새 게시글 작성</h2>

      {/* 에러 메세지 표시 */}
      {error && <Alert variant="danger">{error}</Alert>}
      
      {/* form */}
      <Form onSubmit={handleSubmit}>
        {/* 제목 입력 */}
        <Form.Group className="mb-3">
          <Form.Label>제목</Form.Label>
          <Form.Control 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요"
                isInvalid={!title.trim() && error} //제목이 비어있고 에러가 있으면 스타일 표시
          />
        </Form.Group>
      
      {/* 내용 입력 및 버튼 */}
      <Form.Group as={Row}>
        <Form.Label>내용</Form.Label>
            <Form.Control
              as="textarea"
              rows={15}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력하세요"
              style={{ paddingRight: '100px' }}
              isInvalid={!content.trim() && error} 
            />
            <Form.Control.Feedback type="invalid">
              내용을 입력해주세요.
            </Form.Control.Feedback>
        </Form.Group>
              
        <div className="text-end">
          <Button variant="primary" type="submit">
            작성
          </Button>
        </div>
      </Form>
     </Container>      
  );
}

PostForm.propTypes = {
  setPosts: PropTypes.func.isRequired
};

export default PostForm;