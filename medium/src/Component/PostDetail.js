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
  const dateTimeString = post.published_at;

const dateObj = new Date(dateTimeString);


const year = dateObj.getFullYear();
const month = dateObj.getMonth() + 1; 
const day = dateObj.getDate();

const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

  return (
    <div className="post-details-container">
   
      <div className="post-details">
        
        <h3 className='post-title'>{post.title}</h3>
        <p className='post-topic'>{post.topic}</p>
        <div className='author'>
        <i class="fa fa-user fa-lg"></i>
        <p className='author'>{post.author}</p>
        <a href='/'>Follow</a>
        </div>

        <p className='published-at'>Published On:  {formattedDate}</p>
        <img src={post.image} alt={post.title} />
        
        <p className='post-text'>{post.text}</p>

      </div>
      {/* Add edit and delete options */}
      {/* <div className="edit-delete-options">
        <Link to={`/post/${postId}/edit`}>Edit</Link>
        <button onClick={handleDelete}>Delete</button>
      </div> */}
    </div>
  );
};

export default PostDetail;
