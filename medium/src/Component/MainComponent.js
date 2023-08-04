import React,{useState} from 'react';
import PostList from './PostList';
import './MainComponent.css';

const MainComponent = () => {
  const [filters, setFilters] = useState({
    author: '',
    date: '',
    likes: '',
    comments: '',
    search:''
  });
  
 

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  const authors = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Michael Johnson' },
    // Add more authors as needed
  ];
  


  return (

    <div className="main-container">
      <div className="left-container">
        <PostList />
      </div>
      <div className="right-container">
        <div className="filters-search">
       <div className='filter1'>
        {/* Dropdown list for Author */}
        <select
          name="author"
          value={filters.author}
          onChange={handleFilterChange}
        >
          <option value="">Filter by Author</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
        {/* Date input */}
        <input
          type="date"
          name="date"
          placeholder="Filter by Date"
          value={filters.date}
          onChange={handleFilterChange}
        />
        </div>
        {/* Likes input */}
        <div className='filter2'>
        <input
          type="number"
          name="likes"
          placeholder="Filter by Likes"
          value={filters.likes}
          onChange={handleFilterChange}
        />
        {/* Comments input */}
        <input
          type="number"
          name="comments"
          placeholder="Filter by Comments"
          value={filters.comments}
          onChange={handleFilterChange}
        />
        </div>

      </div>
      <div className='search'>
          <input className="search-bar" type="text" name="search" placeholder="Search Posts" value={filters.search} onChange={handleFilterChange} />
        </div>
       
      </div>
    </div>
  );
};

export default MainComponent;
