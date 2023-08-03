import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './PostDetail.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostDetail = () => {
  const { postId } = useParams();

  const [post, setPosts] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    
    axios.get(`http://127.0.0.1:3000/get/post/${postId}`)
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
    
      });
  }, []);
  const handleDelete=()=>{
    axios.delete(`http://127.0.0.1:3000/delete/posts/${postId}`)
      .then((response) => {
        console.log(response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
    
      });


  }

  return (
    <div className="post-details-container">
   
      <div className="post-details">
        
        <h3>{post.title}</h3>
        <img src={post.image} alt={post.title} />
        <p>Topic: {post.topic}</p>
        <p>{post.text}</p>
        <p>Published on: {post.dateTime}</p>
        <p>Author: {post.author}</p>
      </div>
      {/* Add edit and delete options */}
      <div className="edit-delete-options">
        <Link to={`/post/${postId}/edit`}>Edit</Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default PostDetail;
