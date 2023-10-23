import React, { useState } from 'react';
import Nav from '../../components/Nav';
import DonutChart from './DonutChart';
import LineGraph from './LineGraph';
import MacroIDHelper from './MacroIDHelper';
import '../../styles/pages/UserDashboard/UserDashboard.css';


function UserDashboard() {
        
    var macros = [];
    macros = MacroIDHelper();

    const [selection, setSelection] = useState("overview")

    return(
        <>
            <div className="user-dashboard-page">
                <Nav/>
                <h1 id="page-header">Dashboard</h1>
                <DashboardMenu selection={selection} setSelection={setSelection}/>
                <DashboardDisplay selection={selection} setSelection={setSelection}/>
                <div className='Activity-Ring'>
                    <>
                        <DonutChart id="User-Carbs-Intake" dailyIntake={macros[2]} dailyTotal={100} macro={"g Carbs"} color={"#2DEDF9"}></DonutChart>
                        <DonutChart id="User-Calorie-Intake" dailyIntake={ macros[0] } dailyTotal={1000} macro={"Calories"} color={"#6AFF00"}></DonutChart>
                        <DonutChart id="User-Protein-Intake" dailyIntake={macros[1]} dailyTotal={100} macro={"g Protein"} color={"#FF006A"}></DonutChart>
                   
                    </>
                </div>
                <LineGraph/>
            </div>
            
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
