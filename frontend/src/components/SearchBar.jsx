import React from 'react';

function SearchBar({ searchTerm, setSearchTerm, onSearch, onShowAll }) {
    return (
        <div className="search-section">
            <input 
                type="text" 
                placeholder="Search products..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <button onClick={onSearch} className="search-btn">Search</button>
            <button onClick={onShowAll} className="all-btn">Show All</button>
        </div>
    );
}

export default SearchBar;