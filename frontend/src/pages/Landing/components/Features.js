import React from 'react';
import image from '../../../assets/image1.png';
import '../../../styles/pages/Landing/components/Features.css';

function Features(){
    return(
        <section id="features">
            <div className="content-container">
                <h1 id="title">Take advantage of our exclusive features</h1>    
                <div className="feature-1-container">
                    <h1 id="feature-title">My Journal</h1>
                    <p id="feature-description">Monitor your macros, note personal records, store calculator results, and visualize your progress through interactive charts.</p>
                </div>
                <div className="feature-2-container">
                    <h1 id="feature-title">My Calendar</h1>
                    <p id="feature-description">Craft your weekly routine and uncover fresh workouts to diversify your regime.</p>
                </div>
            </div>
            <Background/>       
        </section>
    );
}

function Background() {
    return(
        <div className="features-background">
            <img id="image" src={image}/>
            <span id="screen"/>
        </div>
    );
}

export default Features;