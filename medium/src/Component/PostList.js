import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PostList.css'
import axios from 'axios';

const PostList = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {

    axios.get('http://127.0.0.1:3000/posts/all')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
    
      });
  }, []);

  return (
    <div>
     
      {posts.map((post) => (
        <div key={post.id} className="post">
          <img src={post.featuredImage} alt={post.title} />
          <div className="post-details">
          <h3>{post.title}</h3>
            <p>Topic: {post.topic}</p>
            <p>{post.text}</p>
            <p>Published on: {post.dateTime}</p>
            <p>Author: {post.author}</p>
            <Link to={`/post/${post.id}`}>View Details</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
