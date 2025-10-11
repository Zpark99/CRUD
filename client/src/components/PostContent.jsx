import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { deletePost } from "../../share/api";

const PostContent = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
  console.log("게시글 요청 시작:", id);
  axios.get(`http://localhost:3000/api/posts/${id}`)
    .then(response => {
      console.log("게시글 응답 데이터:", response.data);
      setPost(response.data);
    })
    .catch(error => console.error('게시글 불러오기 오류:', error));
}, [id]);

  if (!post) return <div>로딩 중...</div>;
  
  // 수정 
  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };
  
  // 삭제
  const handleDelete = async () => {   // ← async 추가
    try {
      const result = await deletePost(id); // ← await 사용 가능해짐

      if (result.success) {
        alert('Post deleted successfully');
        navigate('/');
      } else {
        alert(result.error || 'Failed to delete post');
      }
    } catch (error) {
      console.error("삭제 오류:", error);
      alert('Unexpected error during delete');
    }
  };

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p><strong>작성일:</strong> {new Date(post.created_at).toLocaleString()}</p>
      <button onClick={handleEdit}>Edit</button>  
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default PostContent;