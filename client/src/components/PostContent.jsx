import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { deletePost } from "../../share/api";
import { Container, Row, Col, Button } from "react-bootstrap";

const PostContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    console.log("### 게시글 요청 시작:", id);

    axios
      .get(`http://localhost:3000/api/posts/${id}`)
      .then((response) => {
        console.log("### 게시글 응답 데이터:", response.data);
        setPost(response.data);

        // 조회수 증가 API 호출
        console.log("### 조회수 증가 API 호출");
        axios
          .patch(`http://localhost:3000/api/posts/${id}/view`)
          .catch((error) => console.error("조회수 증가 오류:", error));
      })
      .catch((error) => console.error("게시글 불러오기 오류:", error));
  }, [id]);

  if (!post) return <div>로딩 중...</div>;

  // 수정
  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  // 삭제
  const handleDelete = async () => {
    try {
      const result = await deletePost(id);
      if (result.success) {
        alert("게시글이 성공적으로 삭제되었습니다.");
        navigate("/");
      } else {
        alert(result.error || "게시글 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("삭제 오류:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container style={{ maxWidth: "800px", marginTop: "50px" }}>
      <h2 className="mb-4">{post.title}</h2>

      <Row className="mb-4">
        {/* 조회수 + 작성일 */}
        <Col md="6">
          <p>
            <strong>조회수:</strong> {post.view_cnt}
          </p>
        </Col>
        <Col md="6" className="text-end">
          <p>
            <strong>작성일:</strong>{" "}
            {new Date(post.created_at).toLocaleString()}
          </p>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              backgroundColor: "#f9f9f9",
              minHeight: "350px",
            }}
          >
            <p>{post.content}</p>
          </div>
        </Col>
      </Row>

      <Row className="mt-4">
        {/* 목록 버튼 */}
        <Col md="6">
          <Link to="/">
            <Button variant="secondary">목록으로 돌아가기</Button>
          </Link>
        </Col>

        {/* 수정 / 삭제 버튼 */}
        <Col className="d-flex justify-content-end">
          <Button variant="primary" className="me-2" onClick={handleEdit}>
            수정
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            삭제
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PostContent;
