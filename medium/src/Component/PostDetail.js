import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './PostDetail.css';

const PostDetail = () => {
  const { postId } = useParams();

  // Sample data for demonstration purposes
  const post = {
    id: 1,
    title: 'Post 1',
    topic: 'Technology',
    featuredImage: 'https://placeimg.com/600/400/tech',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    dateTime: '2023-08-03 10:30 AM',
    author: 'John Doe',
  };

  return (
    <div className="post-details-container">
      <h2>Post Details</h2>
      <div className="post-details">
        <img src={post.featuredImage} alt={post.title} />
        <h3>{post.title}</h3>
        <p>Topic: {post.topic}</p>
        <p>{post.text}</p>
        <p>Published on: {post.dateTime}</p>
        <p>Author: {post.author}</p>
      </div>
      {/* Add edit and delete options */}
      <div className="edit-delete-options">
        <Link to={`/post/${postId}/edit`}>Edit</Link>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default PostDetail;
