import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Drafts.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Drafts = () => {
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const jwtToken = localStorage.getItem("jwtToken");
 const navigate=useNavigate();

  useEffect(() => {

    let drafts = JSON.parse(localStorage.getItem("drafts"));

        console.log(drafts);
       
        if (drafts !== null) {
          setPosts(drafts);
        }
       
  }, [refresh]);

  const addPost=(e)=>{
    let index=e.target.id;
    let drafts=JSON.parse(localStorage.getItem("drafts"));
    const postData={
      title:drafts[index].title,
      topic:drafts[index].topic,
      text:drafts[index].text,
      featured_image:drafts[index].featured_image

    }
    axios
      .post("http://127.0.0.1:3000/create/post", postData, { headers })
      .then((response) => {
        console.log("Post saved!", response.data);
      })
      .catch((error) => {
        console.error("Error saving post:", error);
        // Implement error handling logic here
      });
       navigate("/");
       drafts.splice(index,1);
      localStorage.setItem("drafts",JSON.stringify(drafts));

  }

  const remove=(e)=>{
     let index=e.target.id;
     let drafts=JSON.parse(localStorage.getItem("drafts"));
     drafts.splice(index,1);
     localStorage.setItem("drafts",JSON.stringify(drafts));
     setRefresh(refresh+1);
  }
  const headers = {
    authToken: jwtToken,
  };

  return (
    <div className="postBody">
    <div className="postContainer">
      {posts.map((post,index) => (
        <div className="card">
          <div className="card__header">
            <img
              src={post.featured_image}
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
          <div className="card__footer">
            <p style={{color:"green",fontWeight:'600',fontSize:'14PX',cursor:'pointer'}} id={index} onClick={addPost}>
              Save
            </p>
              <p style={{color:"Red",fontWeight:'600',fontSize:'14PX',cursor:'pointer'}} id={index} onClick={remove}>
             Delete
            </p>
          </div>

        </div>
      ))}
    </div>
    </div>
  );
};

export default Drafts;
