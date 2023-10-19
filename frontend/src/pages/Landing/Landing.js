import React from 'react';
import Nav from '../../components/Nav';
import Intro from './components/Intro';
import Features from './components/Features';
import Benefits from './components/Benefits';
import Footer from '../../components/Footer';
import '../../styles/pages/Landing/Landing.css';

function Landing() {
    return(
        <>
            <Nav/>
            <div className="landing-page">
                <Intro/>
                <Features/>
                <Benefits/>
            </div>
            <Footer/>
        </>
    );
}

export default Landing;