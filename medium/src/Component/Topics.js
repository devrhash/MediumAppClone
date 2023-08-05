import React from 'react';
import './Topics.css'; // Import your CSS file for styling

// Fake topic data
const fakeTopics = [
  { id: 1, title: 'Self Improvement' },
  { id: 2, title: 'Politics & Currrent' },
  { id: 3, title: 'International Relations' },
  { id: 4, title: 'Programming and software' },
  { id: 5, title: 'Current Affairs' },
  { id: 6, title: 'Cinema' },

];

function Topics() {
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
