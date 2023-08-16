import React, { useEffect, useState } from 'react';
import './Topics.css'; // Import your CSS file for styling
import axios from 'axios';
// Fake topic data
const fakeTopics = [
  { id: 1, title: 'Technology' },
  { id: 2, title: 'react' },
  { id: 3, title: 'finance' },
  { id: 4, title: 'biology' },
  { id: 5, title: 'songs' },
  { id: 6, title: 'ruby' },
  { id: 7, title: 'next' },

];


function Topics() {
  const [topics,setTopics]=useState([]);
  const [refresh,setRefresh]=useState(0);
  useEffect(()=>{
     axios.get("http://127.0.0.1:3000/topic/showAll")
      .then((response) => {
        setTopics(response.data)
        console.log("Post saved!", response.data);
      })
      .catch((error) => {
        console.error("Error saving post:", error);
        // Implement error handling logic here
      });
  },[refresh])
  return (
    <div className="topic-list">
      {fakeTopics.map(topic => (
        <div key={topic.id} className="topic-item">
          {topic.title}
        </div>
      ))}
    </div>
  );
}

export default Topics;
