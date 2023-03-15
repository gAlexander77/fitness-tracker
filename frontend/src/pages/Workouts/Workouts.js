import React from 'react';
import Nav from '../../components/Nav';
import Search from './components/Search';
import Display from './components/Display';
import '../../styles/pages/Workouts/Workouts.css';

function Workouts(){
    return(
        <div className="workouts-page">
            <Nav/>
            <h1 id="page-title">WORKOUTS</h1>
            <Search/>
            <Display/>
        </div>
    );
}

export default Workouts;