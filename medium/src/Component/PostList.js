import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PostList.css'
import axios from 'axios';

const PostList = ({filter}) => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log(filter);
    if(filter.author!=''){
      console.log(filter.author);
      axios.get(`http://127.0.0.1:3000/get/post/author/${filter.author}`)
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
    
      });

    }
    else if(filter.date!='')
    {
      console.log('inside 2');
      axios.get(`http://127.0.0.1:3000/get/post/filter/date/${filter.date}`)
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
    
      });

    }
    else if(filter.sortby!='')
    {
      console.log('inside 2');
      axios.get(`http://127.0.0.1:3000/get/post/filter/likesAndComments/${filter.sortby}`)
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
    
      });
      
    }
    // 
    else if(filter.search!='')
    {
      axios.get(`http://localhost:3000/posts/search?search=${filter.search}`)
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
    
      });


    }
    else{
      console.log('inside 3');
    axios.get('http://127.0.0.1:3000/posts/all')
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
    
      });
    }

  }, [filter]);

  return (
    <div>
     
      {posts.map((post) => (
        <div key={post.id} className="post">
          <div className="post-details">
          <h3>{post.title}</h3>
            <p>Topic: {post.topic}</p>
            {/* <p>{post.text}</p> */}
            <p>Published on: {post.published_at}</p>
            <p>Author: {post.author_name}</p>
            <Link to={`/post/${post.id}`}>View Details</Link>
          </div>
          <img src={post.image} alt={post.title} />
        </div>
      ))}
    </div>
  );
};

export default PostList;
