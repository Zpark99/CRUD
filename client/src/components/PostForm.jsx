// 게시글 작성 페이지 구현
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function PostForm({ setPosts }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    	e.preventDefault();
        
        axios.post('http://localhost:3000/api/posts', {title, content })
        	.then((response) => {
              setPosts(response.data);
        	    navigate('/');
        })
   		 .catch((error) => console.error('Error creating post:', error));
  };

  return (
    <Container style={{ maxWidth: '800px', marginTop: '50px' }}>
      <h2 className="mb-5">새 게시글 작성</h2>
      
      <Form onSubmit={handleSubmit}>
        {/* 제목 입력 */}
        <Form.Group className="mb-3">
          <Form.Label>제목</Form.Label>
          <Col md={10}>
          <Form.Control 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요"
          />
          </Col>
        </Form.Group>
      
      <Form.Group as={Row} className="mb-4">
        <Form.Label column sm={2}>
          내용

        </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력하세요"
            />
          </Col>
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