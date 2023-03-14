import React, { useState } from 'react';
import Nav from '../../components/Nav';
import '../../styles/pages/UserDashboard/UserDashboard.css';

function UserDashboard(){

    const [selection, setSelection] = useState("dashboard-overview")

    return(
        <div className="user-dashboard-page">
            <Nav/>
            <DashboardMenu selection={selection} setSelection={setSelection}/>
            <DashboardDisplay selection={selection} setSelection={setSelection}/>
        </div>
    );
}

function DashboardMenu(props){
    
    const selectionHandler = (evt) => {
        props.setSelection(evt.target.id);
    }

    return(
        <div className="user-dashboard-dashboard-menu">
            <button id="dashboard-overview" onClick={selectionHandler}>Dashboard Overview</button>
            <button id="settings" onClick={selectionHandler}>Settings</button>
        </div>
    )
}


function DashboardDisplay(props){
    return(
        <div>{props.selection}</div>
    )
}

export default UserDashboard;