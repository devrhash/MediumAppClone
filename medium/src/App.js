import './App.css';
import Navbar from './Component/Navbar';

import AddPost from './Component/AddPost/AddPost';
import EditPost from './Component/EditPost/EditPost';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Component/Signup/Signup';
import Login from './Component/login/Login';
import MyPost from './Component/Mypost/Mypost';

import MyProfile from './Component/MyProfile';
import SavedPost from './Component/SavedPost/SavedPost';
import Drafts from './Component/Drafts/Drafts';
import Followers from './Component/Followers';
import Payment from './Component/Payment';
import Posts from './Component/posts/Post';
import Profile from './Component/Profile/Profile';
import TopPost from './Component/TopPost/TopPost';
import RevisionHistory from './Component/RevisionHistory.js/RevisionHistory';
function App() {
  return (
    <Router>
      <div className='app'>
        <Navbar />
    
        <div className="content">
          <Routes>
            <Route path="/" element={<Posts/>} />
            <Route path="/add" element={<AddPost />} />
            <Route path="/post/:postId/edit" element={<EditPost />} />
              <Route path="/revise/:postId" element={<RevisionHistory />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mypost" element={<MyPost />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/savedpost" element={<SavedPost />} />
            <Route path="/draft" element={<Drafts />} />
            <Route path="/followers" element={<Followers />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/author/:authorId" element={<Profile />} />
            <Route path="/topposts" element={<TopPost />} />
          
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
