import React from 'react';
import { BsSearch } from "react-icons/bs";

function Search() {
    return (
        <div className="workouts-search-component">
            <input/>
            <button><BsSearch id="icon"/></button>
        </div>
    );
}

export default Search;