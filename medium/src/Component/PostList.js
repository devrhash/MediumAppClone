import React from 'react';
import { Link } from 'react-router-dom';
import './PostList.css'
const PostList = () => {
  // Sample data for demonstration purposes
  const posts = [
    {
      id: 1,
      title: 'Post 1',
      topic: 'Technology',
      featuredImage: 'https://placeimg.com/300/200/tech',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      dateTime: '2023-08-03 10:30 AM',
      author: 'John Doe',
    },
    {
      id: 2,
      title: 'Post 2',
      topic: 'Travel',
      featuredImage: 'https://placeimg.com/300/200/nature',
      text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem...',
      dateTime: '2023-08-02 02:15 PM',
      author: 'Jane Smith',
    },
    // Add more posts as needed
  ];

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
