import React, { useState } from 'react';

function Display(props) {
    
    const [currentPage, setCurrentPage] = useState(1);
    const workoutsPerPage = 12;
    const numWorkouts = props.data.length;
    const numPages = Math.ceil(numWorkouts / workoutsPerPage);
    const startIdx = (currentPage - 1) * workoutsPerPage;
    const endIdx = Math.min(startIdx + workoutsPerPage, numWorkouts);

    const handlePageClick = (pageNum) => {
        setCurrentPage(pageNum);
    }

    return (
        <div className='workouts-display-component'>
            <div className="workouts-display-workouts-container ">
                {props.data.slice(startIdx, endIdx).map((workout, index)=>{
                    return(
                        <Workout
                            key={index}
                            name={workout.workoutName}
                            images={workout.images}
                        />
                    );
                })}
            </div>
            <div className="workouts-display-pagination">
                {Array.from({length: numPages}, (_, i) => i + 1).map(pageNum => {
                    const isActive = pageNum === currentPage;
                    return (
                        <button key={pageNum} onClick={() => handlePageClick(pageNum)}
                            id={isActive ? 'active' : ''}>{pageNum}</button>
                    );
                })}
            </div>
        </div>
    );
}

function Workout(props) {
    
    const image = props.images[0];
    
    return(
        <div className="workouts-display-workout-container">
            <div className="workouts-display-workout">
                <img id="image" src={image}/>
                <h1 id="name">{props.name}</h1>
            </div>
        </div>
    );
}

export default Display;