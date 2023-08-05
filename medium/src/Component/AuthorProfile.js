import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './AuthorProfile.css';

const AuthorProfile = () => {
//   const { authorId } = useParams();
  const [activeTab, setActiveTab] = useState('home');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
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
          <div>
            Hello From Home Sectiom
          </div>
        ) : (
          /* Content for About tab */
          <div>
            Hello From About Section
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorProfile;
