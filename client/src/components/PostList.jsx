// 게시글 목록 페이지
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

// API_URL 수정완료 
const API_URL = import.meta.env.VITE_API_BASE_URL;

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/posts`)
      .then(response => {
        console.log(response.data); // 여기에 [ { id: 1..., }, { id: 2... }, ] 형태로 찍힘.
        
        setPosts(response.data)
      })
      .catch((err) => console.error(err));
  });

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-hold">게시판</h1>
        <Link to="/postform" className="btn btn-primary">
          글쓰기
        </Link>
      </div>

      <table className="table table-striped table-bordered text-center align-middle">
        <thead className="table-light">
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>내용</th>
            <th>작성일</th>
            <th>상세보기</th>
          </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr key={post.id}>
            <td>{post.id}</td>
            <td>{post.title}</td>
            <td>{post.content}</td>
            <td>{new Date(post.created_at).toLocaleDateString()}</td>
            <td>
              <Link to={`/post/${post.id}`} className="btn btn-outline-primary btn-sm">
                상세 보기
              </Link>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default PostList;