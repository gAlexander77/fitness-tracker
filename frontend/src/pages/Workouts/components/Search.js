import React from 'react';
import { BsSearch } from "react-icons/bs";
import '../../../styles/pages/Workouts/components/Search.css';

function Search(props) {
    return (
        <div className="search-component-container">
            <h1>Workouts</h1>
            <div className="workouts-search-component">
                <input onChange={props.handleSearchChange}/>
                <button><BsSearch id="icon"/></button>
            </div>
        </div>
    );
}

export default Search;