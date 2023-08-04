import './App.css';
import Navbar from './Component/Navbar';
import Banner from './Component/Banner';
import MainComponent from './Component/MainComponent';
import PostDetail from './Component/PostDetail';
import AddPost from './AddPost';
import EditPost from './EditPost';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Component/SignUp';
import Login from './Component/Login';
import MyPost from './Component/MyPost';

function App() {
  return (
    <Router>
      <div className='app'>
        <Navbar />
        <Banner />
        <div className="content">
          <Routes>
            <Route path="/" element={<MainComponent />} />
            <Route path="/post/:postId" element={<PostDetail />} />
            <Route path="/add" element={<AddPost />} />
            <Route path="/post/:postId/edit" element={<EditPost />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mypost" element={<MyPost />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
