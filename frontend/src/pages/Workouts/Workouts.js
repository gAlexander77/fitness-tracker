import React from 'react';
import Nav from '../../components/Nav';
import Search from './components/Search';
import Display from './components/Display';
import '../../styles/pages/Workouts/Workouts.css';

import workoutData from '../../test-data/workoutsRequest.json';

function Workouts(){
    
    const data = workoutData;
    console.log(data);

    return(
        <div className="workouts-page">
            <Nav/>
            <h1 id="page-title">WORKOUTS</h1>
            <Search/>
            <Display data={data}/>
        </div>
    );
}

export default Workouts;