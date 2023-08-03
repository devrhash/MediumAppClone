import './App.css';
import Navbar from './Component/Navbar';
import Banner from './Component/Banner';
import MainComponent from './Component/MainComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='app'>
        <Navbar />
        <Banner />
        <div className="content">
          <Routes>
            <Route path="/" element={<MainComponent />} />
            {/* Add other routes here if needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
