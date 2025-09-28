import PostList from '../src/components/PostList';
import Posts from '../src/components/Posts';
import PostContent from './../src/components/PostContent';
import PostForm from './../src/components/PostForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Router = () => {
  const [posts, setPosts] = useState([]);

    // 게시글 목록을 초기화하는 useEffect
    useEffect(() => {
    axios.get('api/posts')
      .then((response) => setPosts(response.data))
      .catch((error) => console.error('Error fetching posts:', error));
    }, []); // 한 번만 실행

  return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PostList />} />
                <Route path="/" element={<PostList posts={posts} setPosts={setPosts} />} />  {/* posts와 setPosts를 전달 */}
                {/* <Route path="postform" element={<PostForm />} /> */}
                <Route path="/postform" element={<PostForm setPosts={setPosts} />} />  {/* setPosts 전달 */}                
                <Route path="post/:id" element={<PostContent />} />
                <Route path="api/posts" element={<Posts />} /> {/* API 결과를 보여주는 페이지 */}
            </Routes>
        </BrowserRouter>
    );
};

export default Router;