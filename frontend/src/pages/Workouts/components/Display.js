import React from 'react';

function Display() {
    return (
        <div className='workouts-display-component'>
            <div className="workouts-display-workouts-container ">
                <Workout/>
                <Workout/>
                <Workout/>
                <Workout/>
                <Workout/>
                <Workout/>
                <Workout/>
                <Workout/>
                <Workout/>
                <Workout/>
                <Workout/>
                <Workout/>
            </div>
            <div>1.2.3.4.5</div>
        </div>
    );
}

function Workout() {
    return(
        <div className="workouts-display-workout-container">
            <div className="workouts-display-workout">
        
            </div>
        </div>
    );
}

export default Display;