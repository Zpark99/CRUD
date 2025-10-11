import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { editPost } from "../../share/api";


const PostEdit = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const [title, setTitle] = useState('');
   const [content, setContent] = useState('');

   useEffect(() => {
    axios.get(`/api/posts/${id}`)
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
    <div>
      <h2>Edit Post</h2>
    <div>
      <label htmlFor="title">Title</label>
      <input id="title" type="text" value={title || ''} onChange={(e) => setTitle(e.target.value)}/>
    </div>
    <div>
      <label htmlFor="content">Content</label>
      <textarea value={content || ''} onChange={(e) => setContent(e.target.value)}></textarea>
    </div>
    <button onClick={handleSave}>Save</button>
    <button onClick={() => navigate('/')}>Cancel</button>
    </div>
  )
}

export default PostEdit;