import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SavedPost.css";
import axios from "axios";

const SavedPost = () => {
  const [posts, setPosts] = useState([]);
  const [listOp, setListOp] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const jwtToken = localStorage.getItem("jwtToken");
  const [option, setOption] = useState("");
  const [listname,setListname]=useState("");

  const addList = () => {
    let new_array = listOp;
    new_array.push(listname);
    localStorage.setItem("listop", JSON.stringify(new_array));
    setRefresh(refresh + 1);
    setListname("");
    setOption("");
  };
  useEffect(() => {
    let listop = JSON.parse(localStorage.getItem("listop"));
    console.log(listop);
    setListOp(listop);
  }, [refresh]);

  useEffect(() => {
    console.log(option);
    let new_array = [];
    let savedposts = JSON.parse(localStorage.getItem("savedposts"));
    let savetolist = JSON.parse(localStorage.getItem("savetolist"));
    let post_array = [];
    if (savetolist !== null) {
      console.log(savetolist);
      for (let x of savetolist) {
        if (x.list == option) {
          new_array.push(x.id);
        }
      }
      if (savedposts !== null) {
        console.log(savedposts);
        for (let x of savedposts) {
          for (let y of new_array) {
            if (x.id == y) {
              post_array.push(x);
              break;
            }
          }
        }
        console.log(post_array);
        setPosts(post_array);
      }
    }
  }, [option]);

  const headers = {
    authToken: jwtToken,
  };

  return (
    <div className="savedposts">
      <div>
      <input value={listname} onChange={(e) => setListname(e.target.value)} placeholder="Create List" className="savedinput"></input>
      <button onClick={addList} className="button-4">submit</button>
      </div>
        <select  onChange={(e)=>setOption(e.target.value)} value={option} className="savedinput">
        <option value="">select list</option>
        {listOp.map((opt, index) => (
          <option key={index} value={index}>
            {opt}
          </option>
        ))}
      </select>
      <div className="postContainer">
        {posts.map((post) => (
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
                  <Link to={`/author/${post.author_id}`}>
                    <h5>{post.author_name}</h5>
                  </Link>
                  <small>{post.published_at}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedPost;
