import React from 'react';
import './search-input.css';

function SearchInput({searchText, onSearchButtonClicked, onSearchTextChanged}) {
  return (
    <div className="search-input">
      <label htmlFor="search-input-text"> Search: </label>
      <input type="text" name="search-input-text" value= {searchText} onChange = {onSearchTextChanged}/>
      <button onClick={onSearchButtonClicked}>
        Search
      </button>
    </div>
  );
}

export default SearchInput;
