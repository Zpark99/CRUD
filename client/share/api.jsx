const API_URL = import.meta.env.VITE_API_BASE_URL;

// API_URL 수정완료

export const editPost = async (postId, updatedData) => { 
  try {
    const response = await fetch(`${API_URL}/api/posts/${postId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });
  
    if  (response.ok) {
      return { success: true } ;
    } else {
      const errorData = await response.json();
      return { success: false, error: errorData.message || 'Failed to edit post' };
    }
  } catch (error) {
    console.error('Error editing post:', error);
    return { success: false, error: 'Network error' };
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await fetch(`${API_URL}/api/posts/${postId}`, { method: 'DELETE' });

    if (response.ok) {
      return { success: true };
    } else {
      let errorData = {};
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: 'Unknown error (no JSON returned)' };
      }
      return { success: false, error: errorData.message || 'Failed to delete post' };
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    return { success: false, error: 'Network error' };
  }
};