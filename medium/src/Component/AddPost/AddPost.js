import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios for API calls
import "./AddPost.css";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [imageFile, setImageFile] = useState(null); // State to store the selected image file
  const [text, setText] = useState("");
  const jwtToken = localStorage.getItem("jwtToken");

  const headers = {
    authToken: jwtToken,
  };
  useEffect(() => {
    if (!jwtToken) {
      navigate("/login");
    }
  });
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file, "filename.jpg", { charset: "utf-8" });

    axios
      .post("http://127.0.0.1:3000/upload", formData, { headers })
      .then((response) => {
        setImageFile(response.data.file_url);
        console.log(response.data.file.url);
      })
      .catch((error) => {
        console.log("hello");
        console.error(error);
      });
    setImageFile(file);
  };

  const handleSave = () => {
    const postData = {
      title: title,
      topic: topic,
      text: text,
      author_id: 1,
      featured_image: imageFile,
    };

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
  };

  const handleSaveDraft = () => {
    const postData = {
      title: title,
      topic: topic,
      text: text,
      author_id: 1,
      featured_image: imageFile,
    };

    axios
      .post("http://127.0.0.1:3000/draft/create", postData, { headers })
      .then((response) => {
        console.log("Post saved!", response.data);
      })
      .catch((error) => {
        console.error("Error saving post:", error);
        // Implement error handling logic here
      });

    let drafts = JSON.parse(localStorage.getItem("drafts"));
    if (drafts != null) {
      drafts.push(postData);
    } else {
      drafts = [];
      drafts.push(postData);
    }
    localStorage.setItem("drafts", JSON.stringify(drafts));
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
      <button
        className="editbutton"
        onClick={handleSaveDraft}
        style={{ marginLeft: "10px" }}
      >
        Draft
      </button>
    </div>
  );
};

export default AddPost;
