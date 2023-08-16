import { useEffect, useState } from "react";
import "./TopPost.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Topics from "../Topics";
export default function TopPost() {
  const [topPosts, setTopPosts] = useState([]);
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/get/topPosts")
      .then((response) => {
        console.log(response.data);
        let new_array = response.data;
        let new_posts=[];
        for(let index=0;index<3;index++){
        new_posts.push(new_array[index]);
        }
        setTopPosts(new_posts);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, [refresh]);
  return (
    <div>
      <Topics />
      <div className="postBody">
        <div className="postContainer">
          {topPosts.map((post) => (
            <div className="card">
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
                <div className="user">
                  <div className="user__info">
                    <h5>{post.author_name}</h5>

                    <small>{post.published_at}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
