import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { editPost } from "../../share/api";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const API_URL = import.meta.env_VITE_API_BASE_URL;

// API_URL 수정완료 

const PostEdit = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const [title, setTitle] = useState('');
   const [content, setContent] = useState('');

   useEffect(() => {
    axios.get(`${API_URL}/api/posts/${id}`)
        .then(response => {
                setTitle(response.data.title || '');
                setContent(response.data.content || '');
        })
        .catch(error => console.error('게시글 불러오기 오류:', error));
   }, [id]);

   const handleSave = async () => {
      const updatedData = {title, content};

      const result = await editPost(id, updatedData);

      if (result.success){
          alert('Post updated successfully');
          navigate('/');
      } else {
        alert(result.error || 'Failed to update post' );
      }
   };

  return (
    <Container style={{ maxWidth: '800px', marginTop: '50px' }}>
        	<h2 className="mb-5">게시글 수정</h2>
            <Form>
            	{/* 제목 수정 */}
                <Row>
                	<Form.Label>제목</Form.Label>
                    <Col md={10}>
                    	<Form.Control
                        	type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="제목을 입력하세요"
                        />
                    </Col>
                </Row>
                
                {/* 내용 수정 */}
                <Row className="mb-4 align-items-center">
                	<Form.Label>내용</Form.Label>
                    <Col me={10}>
                    	<Form.Control
                        	as="textarea"
                            rows={15}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="내용을 입력하세요"
                        />
                    </Col>
                </Row>
                
                {/* 버튼 */}
                <Row className="mt-3">
                	<Col md={10} className="text-end">
                    	<Button variant="primary" onClick={handleSave} className="me-2">
                        	저장
                        </Button>
                        <Button variant="secondary" onClick={() => navigate('/')}>
                        	취소
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
  )
}

export default PostEdit;