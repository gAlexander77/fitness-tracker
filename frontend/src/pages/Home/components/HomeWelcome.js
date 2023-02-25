import React from 'react';
import { Link } from "react-router-dom";
import '../../../styles/pages/Home/Home.css';

function HomeWelcome(props){
    
    const NoAccount = () => {
        const message = "Login to take advantage of our workout planner and other features.";
        return(
            <>
                <div className="home-welcome-title-no-account">
                    <h1>SHAPE</h1>
                    <h1>SHIFT</h1>
                </div>
                <p className="home-welcome-message">{message}</p>
                <div className="home-welcome-button-container">
                    <Link to="/signup">
                        <button>SIGNUP</button>
                    </Link>
                    <Link to="/login">
                        <button id="login">LOGIN</button>
                    </Link>
                </div>
            </>
        );
    };

    const HasAccount = () => {
        return(
            <>
                <div className="home-welcome-title">
                    <h1>SHAPE</h1>
                    <h1>SHIFT</h1>
                </div>
            </>
        );
    };

    return(
        <div className="home-welcome-container">
            {props.isUser ? <HasAccount/> : <NoAccount/>}
        </div>
    );
}

export default HomeWelcome;