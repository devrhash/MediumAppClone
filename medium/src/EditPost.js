import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './AddPost.css';

const EditPost = () => {
  const { postId } = useParams();

  const [post, setPost] = useState({
    title: '',
    topic: '',
    featuredImage: '',
    text: '',
  });

  useEffect(() => {
    // Fetch the post data from the API based on the post ID
    fetch(`YOUR_API_ENDPOINT/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched post data
        setPost(data);
      })
      .catch((error) => {
        console.error('Error fetching post:', error);
        // Implement error handling logic here
      });
  }, [postId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPost({ ...post, featuredImage: file });
  };

  const handleSave = () => {
    // Prepare the form data to send to the server
    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('topic', post.topic);
    formData.append('text', post.text);
    formData.append('image', post.featuredImage);

    // Call the API to update the post data
    fetch(`YOUR_API_ENDPOINT/${postId}`, {
      method: 'PUT',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          console.log('Post updated successfully!');
          // Implement any success message or redirect logic here
        } else {
          console.error('Error updating post:', response.status);
          // Implement error handling logic here
        }
      })
      .catch((error) => {
        console.error('Error updating post:', error);
        // Implement error handling logic here
      });
  };

  return (
    <div className="add-post-container">
      <h2>Edit Post</h2>
      <div className="form-group">
        <label>Title:</label>
        <input type="text" value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} />
      </div>
      <div className="form-group">
        <label>Topic:</label>
        <input type="text" value={post.topic} onChange={(e) => setPost({ ...post, topic: e.target.value })} />
      </div>
      {/* Add file input for image upload */}
      <div className="form-group">
        <label>Featured Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <div className="form-group">
        <label>Text:</label>
        <textarea value={post.text} onChange={(e) => setPost({ ...post, text: e.target.value })} />
      </div>
      <button className="save-button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default EditPost;
