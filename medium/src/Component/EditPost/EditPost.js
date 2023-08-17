import React, { useState } from "react";
import axios from "axios";
import "./EditPost.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const EditPost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const { postId } = useParams();

  const jwtToken = localStorage.getItem("jwtToken");
  const headers = {
    authToken: jwtToken,
  };

  useEffect(() => {
    let editposts = JSON.parse(localStorage.getItem("editposts"));
    console.log(editposts);
    let flag = false;
    if (editposts !== null) {
      for (let index = 0; index < editposts.length; index++) {
        if (editposts[index].id == postId) {
          setTitle(editposts[index].title);
          setTopic(editposts[index].topic);
          setText(editposts[index].text);
          setImageFile(editposts[index].featured_image);
          setAuthor(editposts[index].author_id);
          flag = true;
        }
      }
    }
    if (!flag) {
      axios
        .get(`http://127.0.0.1:3000/get/post/${postId}`)
        .then((response) => {
          setTitle(response.data.title);
          setTopic(response.data.topic);
          setText(response.data.text);
          setImageFile(response.data.image);
          setAuthor(response.data.author_id);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file, "filename.jpg", { charset: "utf-8" });

    axios
      .post("http://127.0.0.1:3000/upload", formData, { headers })
      .then((response) => {
        console.log(response.data);
        setImageFile(response.data.file_url);
      })
      .catch((error) => {
        console.log("hello");
        console.error(error);
      });
  };

  const handleSave = () => {
    const postData = {
      title: title,
      topic: topic,
      text: text,
      author_id: author,
      featured_image: imageFile,
    };

    let editposts = [];
    editposts = JSON.parse(localStorage.getItem("editposts"));
    let revise = JSON.parse(localStorage.getItem("revisionhistory"));
    console.log(editposts);
    if (editposts !== null) {
      let flag = false;
      for (let index = 0; index < editposts.length; index++) {
        if (editposts[index].id == postId) {
          flag = true;
          editposts[index] = postData;
          editposts[index].id = postId;
          revise.push(editposts[index]);
          localStorage.setItem("revisionhistory", JSON.stringify(revise));
          console.log("it happens", editposts);
        }
      }
      if (!flag) {
        postData.id = postId;
        console.log(postData);
        editposts.push(postData);
        revise.push(postData);
        console.log(revise);
        localStorage.setItem("revisionhistory", JSON.stringify(revise));
      }
    } else {
      console.log(postData);
      editposts = [];
      postData.id = postId;
      editposts.push(postData);
      revise.push(editposts[0]);
      localStorage.setItem("revisionhistory", JSON.stringify(revise));
      console.log("it happens", editposts);
    }
    localStorage.setItem("editposts", JSON.stringify(editposts));
    console.log();
    axios
      .put(`http://127.0.0.1:3000/edit/post/${postId}`, postData, { headers })
      .then((response) => {
        console.log("Post saved!", response.data);
         
      })
      .catch((error) => {
        console.error("Error saving post:", error);
        // Implement error handling logic here
      });
       navigate("/");
  };

  return (
    <div className="editcontainer">
      <label for="fname">title</label>
      <input
        className="editinput"
        id="fname"
        name="firstname"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>

      <label for="lname">Topic</label>
      <input
        className="editinput"
        id="lname"
        name="lastname"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      ></input>

      <label for="lname" type>
        Featured Image
      </label>
      <input
        type="file"
        className="editinput"
        accept="image/*"
        onChange={handleImageChange}
      />

      <label>Text</label>
      <textarea
        className="editinput"
        name="subject"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ height: "200px" }}
      ></textarea>

      <button className="editbutton" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default EditPost;
