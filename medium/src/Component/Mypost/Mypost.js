import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Mypost.css";
const MyPost = () => {
  const [posts, setPosts] = useState([]);
  const jwtToken = localStorage.getItem("jwtToken");
  const headers = {
    authToken: jwtToken,
  };
  const [refresh, setRefresh] = useState(0);
  const change = (data) => {
    let editposts = JSON.parse(localStorage.getItem("editposts"));
    let new_array = data;
    for (let index = 0; index < new_array.length; index++) {
      if (editposts != null) {
        for (let x of editposts) {
          if (new_array[index].id == x.id) {
            new_array[index].text = x.text;
            new_array[index].featured_image = x.featured_image;
            new_array[index].topic = x.topic;
            new_array[index].title = x.title;
          }
        }
      }
    }
    setPosts(new_array);
  };
  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/get/myPost", { headers })
      .then((response) => {
        change(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, [refresh]);
  const handleDelete = (postId) => {
    axios
      .delete(`http://127.0.0.1:3000/delete/posts/${postId}`, { headers })
      .then((response) => {
        console.log(response.data);
        setRefresh(refresh + 1);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

  return (
    <div className="postBody">
      <div className="postContainer">
        {posts.map((post) => (
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
            <div className="card__footer">
              <div className="reactions">
                <Link to={`/post/${post.id}/edit`}>
                  <p
                    style={{
                      fontSize: "18px",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    EDIT
                  </p>
                </Link>
              </div>
              <div className="reactions">
                <Link to={`/revise/${post.id}`}>
                  <p
                    style={{
                      fontSize: "18px",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    History
                  </p>
                </Link>
              </div>

              <div className="reactions">
                <p
                  style={{
                    fontSize: "18px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                  onClick={() => handleDelete(post.id)}
                >
                  DELETE
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPost;
