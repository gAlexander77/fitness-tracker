import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/pages/Landing/components/Intro.css';

function Intro() {

    const navigate = useRef(useNavigate());

    const goToSignup = () => {
	    navigate.current('/user#signup');
    };

    return(
        <section id="intro">
            <div className="content-container">
                <div className="text-container">
                    <h1 id="row-1">Track your fitness journey with</h1>
                    <h1 id="row-2">Shape Shift</h1>
                </div>
                <button className="get-started-btn" onClick={goToSignup}>Get Started</button>
            </div>
            <Background/>
        </section>
    );
}

function Background() {
    return(
        <div className="background-container">
            <span className="circle-1"/>
            <span className="circle-2"/>
            <span className="screen"/>
        </div>
    );
}

export default Intro;