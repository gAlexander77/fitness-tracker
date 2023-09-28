import React from 'react';
import '../../../styles/pages/Landing/components/Benefits.css';

function Benefits() {
    return (
        <section id="benefits">
            <div className="benefits-content-container">
                <h1 id="title">Benefits of Shape Shift</h1>
                <div className="timeline-container">
                    <div id="left">
                        <div id="benefit-container" className="benefit-2-container">
                            <h1 id="benefit-title">Diverse Workouts</h1>
                            <p id="benefit-desription">Never get bored. Explore and add a plethora of workouts to your routine.</p>
                        </div>
                    </div>
                    <Timeline/>
                    <div id="right">
                         <div id="benefit-container" className="benefit-1-container">
                            <h1 id="benefit-title">Personalized Experience</h1>
                            <p id="benefit-desription">Understand your growth with data-driven insights tailored for you.</p>
                        </div>
                        <div id="benefit-container" className="benefit-3-container">
                            <h1 id="benefit-title">Personalized Experience</h1>
                            <p id="benefit-desription">Understand your growth with data-driven insights tailored for you.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Timeline() {
    return (
        <div id="timeline">
            <svg id="big" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                <circle cx="12.5" cy="12.5" r="12.5" fill="#D9D9D9"/>
            </svg>
            <svg id="small" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="5" fill="#D9D9D9"/>
            </svg>
            <svg id="small" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="5" fill="#D9D9D9"/>
            </svg>
            <svg id="small" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="5" fill="#D9D9D9"/>
            </svg>
            <svg id="small" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="5" fill="#D9D9D9"/>
            </svg>
            <svg id="small" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="5" fill="#D9D9D9"/>
            </svg>
            <svg id="big" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                <circle cx="12.5" cy="12.5" r="12.5" fill="#D9D9D9"/>
            </svg>
            <svg id="small" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="5" fill="#D9D9D9"/>
            </svg>
            <svg id="small" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="5" fill="#D9D9D9"/>
            </svg>
            <svg id="small" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="5" fill="#D9D9D9"/>
            </svg>
            <svg id="small" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="5" fill="#D9D9D9"/>
            </svg>
            <svg id="small" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="5" fill="#D9D9D9"/>
            </svg>
            <svg id="big" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                <circle cx="12.5" cy="12.5" r="12.5" fill="#D9D9D9"/>
            </svg>
        </div>
    );
}

export default Benefits;