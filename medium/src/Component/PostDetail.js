import React from 'react';
import { useParams, Link } from 'react-router-dom';

const PostDetail = () => {
  const { postId } = useParams();

  // Sample data for demonstration purposes
  const post = {
    id: 1,
    title: 'Post 1',
    topic: 'Technology',
    featuredImage: 'https://placeimg.com/300/200/tech',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    dateTime: '2023-08-03 10:30 AM',
    author: 'John Doe',
  };

  return (
    <div>
      <h2>Post Details</h2>
      <div className="post">
        <img src={post.featuredImage} alt={post.title} />
        <div className="post-details">
          <h3>{post.title}</h3>
          <p>Topic: {post.topic}</p>
          <p>{post.text}</p>
          <p>Published on: {post.dateTime}</p>
          <p>Author: {post.author}</p>
        </div>
      </div>
      {/* Add edit and delete options */}
      <Link to={`/post/${postId}/edit`}>Edit</Link>
      <button>Delete</button>
    </div>
  );
};

export default PostDetail;
