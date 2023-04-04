import React, { useState } from 'react';
import Nav from '../../components/Nav';
import Search from './components/Search';
import Display from './components/Display';
import '../../styles/pages/Workouts/Workouts.css';

import workoutData from '../../test-data/workoutsRequest.json';

function Workouts(){
    let data = [];
    if(localStorage.getItem("workoutData")){
        data = JSON.parse(localStorage.getItem("workoutData"));
        console.log("Got localSorage Data")
    }
    else {
        data = workoutData;
        localStorage.setItem("workoutData", JSON.stringify(data));
        console.log("Set Request Data")
    }

    const [currentPage, setCurrentPage] = useState(1);

    const [searchQuery, setSearchQuery] = useState("");
    
    const filteredWorkouts = data.filter((workout) =>
        workout.workoutName.toLowerCase().replace(/-/g, " ").includes(searchQuery.toLowerCase().replace(/-/g, " "))
    );
    
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    console.log(data);

    return(
        <div className="workouts-page">
            <Nav/>
            <h1 id="page-title">WORKOUTS</h1>
            <Search handleSearchChange={handleSearchChange}/>
            <Display 
                data={filteredWorkouts}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
}

export default Workouts;