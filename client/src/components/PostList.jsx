// 게시글 목록 페이지
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/posts')
      .then(response => {
        console.log(response.data); // 여기에 [ { id: 1..., }, { id: 2... }, ] 형태로 찍힘.
        
        setPosts(response.data)
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>게시판</h1>
      <div>
        글 쓰기
        <Link to="/postform">
          <button>글 작성</button>
        </Link>
      </div>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            {/* 추가 */}
            <Link to={`/post/${post.id}`}>상세 보기</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostList;