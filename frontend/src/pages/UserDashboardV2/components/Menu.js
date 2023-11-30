import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/pages/UserDashboardV2/componets/Menu.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/store';

function Menu({ currentSplit }) {
    return(
        <div className="user-dashboard-menu">
            <TodayWidget currentSplit={currentSplit}/>
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
function TodayWidget({ currentSplit }) {
    const date = new Date();
    return(
        <div className="today-widget">
            <h1 id="today">Today</h1>
            <div id="date">
                <h1>{date.toLocaleString('default', { month: 'short' })}</h1>
                <h1>{date.toLocaleString('default', { day: '2-digit' })}</h1>
            </div>
            <h1 id="group">{ currentSplit || "Rest" }</h1>
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

    const navigate = useRef(useNavigate());
    const dispatch = useDispatch();

    const handleLogout = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/sign-out`, {}, {withCredentials: true})
            .finally(() => {
                dispatch(logout());
                navigate.current('/');
            })
    };

    return(
        <button className="logout-btn" id="menu-btn" onClick={handleLogout}>
            Logout
        </button>
    );
}

export default Menu;