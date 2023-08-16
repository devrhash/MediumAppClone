import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MyProfile.css';
import axios from 'axios';
import MyPost from './Mypost/Mypost';

const MyProfile = () => {
//   const { authorId } = useParams();
  const [activeTab, setActiveTab] = useState('home');
  const [aboutText, setAboutText] = useState('');
  const [authorDetails,setAuthorDetails]=useState('');
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const jwtToken = localStorage.getItem('jwtToken');
  const headers = {
    'authToken': jwtToken
  };

  
  useEffect(()=>{
    console.log(headers);
    axios.get('http://127.0.0.1:3000/author/my/details',{headers})
      .then((response) => {
        setAuthorDetails(response.data);
        setAboutText(response.data.about)
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });


  },[])
  

  
  const handleAboutSubmit = () => {
    const val={
      about:aboutText
    }
    console.log(val);
    console.log(headers);
    axios.put('http://127.0.0.1:3000/authors/edit',{val},{headers})
      .then((response) => {
        // setAboutText('');
        console.log(response.data);

      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });


  };

  return (
    <div className="author-profile">
      <div className="author-header">
        <h2>Author Name:{authorDetails.name}</h2>
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

          <MyPost/>
        ) : (
          /* Content for About tab */
          <div>
          
            <div class="author-section">
    <h1>Number Of Followers: 3</h1>
    <h1>Email: {authorDetails.email}</h1>
    <p>{authorDetails.about || 'No Bio Added'}</p>
  </div>

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
