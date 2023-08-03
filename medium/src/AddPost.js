import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for API calls
import './AddPost.css';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [imageFile, setImageFile] = useState(null); // State to store the selected image file
  const [text, setText] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSave = () => {
    // Prepare the form data to send to the server
    const formData = new FormData();
    formData.append('title', title);
    formData.append('topic', topic);
    formData.append('text', text);
    formData.append('image', imageFile);

    // Call the API to store the post data and image
    axios.post('YOUR_API_ENDPOINT', formData)
      .then((response) => {
        console.log('Post saved!', response.data);
        // Implement any success message or redirect logic here
      })
      .catch((error) => {
        console.error('Error saving post:', error);
        // Implement error handling logic here
      });
  };

  return (
    <div className="add-post-container">
      <h2>Add Post</h2>
      <div className="form-group">
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Topic:</label>
        <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} />
      </div>
      {/* Add file input for image upload */}
      <div className="form-group">
        <label>Featured Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <div className="form-group">
        <label>Text:</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <button className="save-button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default AddPost;

