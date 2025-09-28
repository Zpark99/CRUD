export const editPost = async (postId, updatedData) => { 
  try {
    const response = await fetch(`/api/posts/${postId}`, {
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
    const response = await fetch(`/api/posts/${postId}`, { method: 'DELETE', })
    
    if (response.ok) {
      return { success: true };
    } else {
      const errorData = await response.json();
      return { success: false, error: errorData.message || 'Failed to delete post' };
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    return { success: false, error: 'Network error' };
  }
};