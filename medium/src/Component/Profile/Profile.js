import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import "./Profile.css";
export default function Profile() {
    const {authorId}=useParams();
    const [following,setFollowing]=useState(false);
     const jwtToken = localStorage.getItem('jwtToken');
     const [post,setPost]=useState([]);
     const[Details,setDetails]=useState("");


    useEffect(() => {


    
    axios.get(`http://127.0.0.1:3000/get/post/author/${authorId}`)
      .then((response) => {
        setPost(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);

      });
      axios.get(`http://127.0.0.1:3000/author/details/${authorId}`)
      .then((response) => {
      setDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);

      });
      


  }, []);

  return (
    <div className="postBody">
      <div className="profilecard">
     
      <h1>{Details.name}</h1>
    {!following&&(<p onClick={()=>setFollowing(!following)}  style={{fontSize:"px",color:"black",fontWeight:"600",cursor:'pointer'}}>Follow</p>)}
    {following&&(<p onClick={()=>setFollowing(!following)}  style={{fontSize:"px",color:"green",fontWeight:"600"}}>Following</p>)}
      <p>Followers:{Details.followers_count}</p>
      <p>email:{Details.email}</p>
      <p>posts:{post.length}</p>
    
      </div>
      
        <h2 style={{marginTop:"50px"}}>Posts</h2>
        <div className="postContainer">
        {post.map((post) => (
          <div className="authorpostcard">
            <div className="card__header">
              <img
                src={post.image}
                alt="card__image"
                className="card__image"
                width="200"
                height="200"
              ></img>
            </div>
            <div className="card__body">
              <span className="tag tag-blue">{post.topic}</span>
              <h4>{post.title}</h4>
              <p>{post.text}</p>
            </div>
           
              
            </div>
         
        ))}
      </div>
      </div>
  );
}
