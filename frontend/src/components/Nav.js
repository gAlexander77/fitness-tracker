import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import '../styles/components/Nav.css';

function Nav(){
    return(
        <div className="nav">
            <NavLogo/>
            <div className="nav-right">
                <Dashboard/>
            </div>
        </div>
    );
}

function NavLogo() {
    
    let navigate = useRef(useNavigate());

    const goToHome = () => {
        navigate.current('/');
    };

    return(
        <button className="nav-logo-link" onClick={goToHome}>
            <h1>SHAPE</h1>
            <h1>SHIFT</h1>
        </button>
    );
}

function Dashboard() {

    let navigate = useRef(useNavigate());

    const goToDashboard = () => {
        navigate.current('/dashboard');
    };

    return(
        <button className="nav-dashboard-link" onClick={goToDashboard}>
            <p>Dashboard</p>
            <FaUserCircle id="icon"/>
        </button>  
    );
}

export default Nav;