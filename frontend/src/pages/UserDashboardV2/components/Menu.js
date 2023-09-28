import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/pages/UserDashboardV2/componets/Menu.css';

function Menu() {
    return(
        <div className="user-dashboard-menu">
            <TodayWidget/>
            <MyCalendarBtn/>
            <MyJournalBtn/>
            <CalculatorsBtn/>
            <WorkoutsBtn/>
            <SettingsBtn/>
            <LogoutBtn/>
        </div>
    );
}

// Display Currents day and the workouts planned for the day
function TodayWidget() {
    return(
        <div className="today-widget">
            <h1 id="today">Today</h1>
            <div id="date">
                <h1>Aug</h1>
                <h1>23</h1>
            </div>
            <h1 id="group">Legs</h1>
            <div className="background-container">
                <span id="background"/>
            </div>
        </div>
    );
}

// Navigates to "/calendar"
function MyCalendarBtn() {
    const link = '/my-calendar';
    const navigate = useRef(useNavigate());

    const goToMyCalendar = () => {
	    navigate.current(link);
    };

    return(
        <button className="my-calendar-btn" id="menu-btn" onClick={goToMyCalendar}>
            <>My Calendar</>
        </button>
    );
}

// Navigates to "/journal"
function MyJournalBtn() {

    const navigate = useRef(useNavigate());

    const goToMyJournal = () => {
	    navigate.current('/my-journal');
    };

    return(
        <button className="my-journal-btn" id="menu-btn" onClick={goToMyJournal}>
            <>My Journal</>
        </button>
    );
}

// Navigates to "/calculators"
function CalculatorsBtn() {

    const navigate = useRef(useNavigate());

    const goToCalculators = () => {
	    navigate.current('/calculators');
    };

    return(
        <button className="calculators-btn" id="menu-btn" onClick={goToCalculators}>
            <>Calculators</>
        </button>
    );
}

// Navigates to "/workouts"
function WorkoutsBtn() {

    const navigate = useRef(useNavigate());

    const goToMyWorkouts = () => {
	    navigate.current('/workouts');
    };

    return(
        <button className="workouts-btn" id="menu-btn" onClick={goToMyWorkouts}>
            <>Workouts</>
        </button>
    );
}

// Pops up a setting modual
function SettingsBtn() {
    return(
        <button className="settings-btn" id="menu-btn">
            <>Settings</>
        </button>
    );
}

// Pops up a confirming if the user would like to logout
// Then redirects to "/"
function LogoutBtn() {
    return(
        <button className="logout-btn" id="menu-btn">
            <>Logout</>
        </button>
    );
}

export default Menu;