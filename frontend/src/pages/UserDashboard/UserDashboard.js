import React, { useState } from 'react';
import Nav from '../../components/Nav';
import DonutChart  from './DonutChart';
import LineGraph from './LineGraph';
import '../../styles/pages/UserDashboard/UserDashboard.css';

/*
    the dailyIntake and dailyTotal hardcoded data needs to be replaced with the api call for the user's correponding data
*/


function UserDashboard(){

    const [selection, setSelection] = useState("overview")

    return(
        <>
            <div className="user-dashboard-page">
                <Nav/>
                <h1 id="page-header">Dashboard</h1>
                <DashboardMenu selection={selection} setSelection={setSelection}/>
                <DashboardDisplay selection={selection} setSelection={setSelection}/>
            </div>
            <div className='Activity-Ring'>
                    <DonutChart id="User-Calorie-Intake" dailyIntake={2.5} dailyTotal={10}></DonutChart>
                    <DonutChart id="User-Protein-Intake" dailyIntake={ 6.5} dailyTotal={10}></DonutChart>
                    <DonutChart id="User-Carbs-Intake" dailyIntake={ 6.5} dailyTotal={10}></DonutChart>
            </div>
            <LineGraph/>
        </>
    );
}

function DashboardMenu(props){
    
    const selectionHandler = (evt) => {
        props.setSelection(evt.target.id);
    }

    const buttonStyle = (id) => {
        return props.selection === id ? { color: 'white' } : {};
    }

    return(
        <div className="user-dashboard-dashboard-menu">
            <button id="overview" onClick={selectionHandler} style={buttonStyle('overview')}>Overview</button>
            <button id="journal-data" onClick={selectionHandler} style={buttonStyle('journal-data')}>Journal Data</button>
            <button id="settings" onClick={selectionHandler} style={buttonStyle('settings')}>Settings</button>
        </div>
    )
}


function DashboardDisplay(props){
    return(
        <div>{props.selection}</div>
    )
}

export default UserDashboard;
