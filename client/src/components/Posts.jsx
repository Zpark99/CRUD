import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_BASE_URL;

function Posts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/api/posts`)
      .then(response => setPosts(response.data))
      .catch(err => {
        console.error(err); // 로그 출력
        setError('게시글을 가져오는데 실패했습니다.');
      });
  }, []);

  return (
    <div>
      <h1>게시글 목록</h1>
      {error && <p>{error}</p>}
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;