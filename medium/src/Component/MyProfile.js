import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './MyProfile.css';
import MyPost from './MyPost';

const MyProfile = () => {
//   const { authorId } = useParams();
  const [activeTab, setActiveTab] = useState('home');
  const [aboutText, setAboutText] = useState('');
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const handleAboutSubmit = () => {
    // Update the author's about information
    console.log('About updated:');
  };

  return (
    <div className="author-profile">
      <div className="author-header">
        <h2>Author Name</h2>
        <div className="author-tabs">
          <button
            className={activeTab === 'home' ? 'active' : ''}
            onClick={() => handleTabChange('home')}
          >
            Home
          </button>
          <button
            className={activeTab === 'about' ? 'active' : ''}
            onClick={() => handleTabChange('about')}
          >
            About
          </button>
        </div>
      </div>
      <div className="author-content">
        {activeTab === 'home' ? (
          /* Content for Home tab */
          <MyPost/>
        ) : (
          /* Content for About tab */
          <div>
            Hello From About Section

            <div>
            <textarea
              value={aboutText}
              onChange={(e) => setAboutText(e.target.value)}
              placeholder="Update About..."
            />
            <button onClick={handleAboutSubmit}>Update About</button>
          </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
