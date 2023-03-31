import React from 'react';
import { BsSearch } from "react-icons/bs";

function Search(props) {
    return (
        <div className="workouts-search-component">
            <input onChange={props.handleSearchChange}/>
            <button><BsSearch id="icon"/></button>
        </div>
    );
}

export default Search;