// 게시글 목록 페이지
import React, { useState, useEffect } from "react";
import axios from 'axios';

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
      <ul>
        {/* posts가 배열이 아닐 수도 있는 상황을 대비한 방어 코드(Optional Chaining) */}
        {posts?.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostList;