import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Display(props) {
    
    const workoutsPerPage = 12;
    const numWorkouts = props.data.length;
    const numPages = Math.ceil(numWorkouts / workoutsPerPage);
    const startIdx = (props.currentPage - 1) * workoutsPerPage;
    const endIdx = Math.min(startIdx + workoutsPerPage, numWorkouts);
  
    const handlePageClick = (pageNum) => {
      props.setCurrentPage(pageNum);
    };
  
    const renderPaginationItems = () => {
        const items = [];
        const maxVisiblePages = 5;
        const sidePages = Math.floor(maxVisiblePages/2);
    
        items.push(
            <button
                key={1}
                onClick={() => handlePageClick(1)}
                id={1 === props.currentPage ? "active" : ""}
            >
                1
            </button>
        );
    
        if(props.currentPage > sidePages + 2) {
            items.push(<span key="ellipsis-start">...</span>);
        }
    
        for(
            let pageNum = Math.max(2, props.currentPage - sidePages);
            pageNum <= Math.min(numPages - 1, props.currentPage + sidePages);
            pageNum++
        ) {
            const isActive = pageNum === props.currentPage;
            items.push(
                <button
                    key={pageNum}
                    onClick={() => handlePageClick(pageNum)}
                    id={isActive ? "active" : ""}
                >
                    {pageNum}
                </button>
            );
        }
    
        if (props.currentPage < numPages - sidePages - 1) {
            items.push(<span key="ellipsis-end">...</span>);
        }
    
        items.push(
            <button
                key={numPages}
                onClick={() => handlePageClick(numPages)}
                id={numPages === props.currentPage ? "active" : ""}
            >
                {numPages}
            </button>
        );
    
        return items;
      };    
  
    return (
      <div className="workouts-display-component">
        <div className="workouts-display-workouts-container">
          {props.data.slice(startIdx, endIdx).map((workout, index) => {
            return (
              <Workout
                key={index}
                name={workout.workoutName}
                images={workout.images}
              />
            );
          })}
        </div>
        <div className="workouts-display-pagination">{renderPaginationItems()}</div>
      </div>
    );
  }

function Workout(props) {
    
    let navigate = useRef(useNavigate());
    const link = "/workout/"+props.name.toLowerCase().replace(/\s+/g, "-");
    
    const goToWorkout = () => {
        navigate.current(link);
    }

    return(
        <div className="workouts-display-workout-container" onClick={goToWorkout}>
            <div className="workouts-display-workout">
                <img id="image" src={props.images[0]}/>
                <h1 id="name">{props.name}</h1>
            </div>
        </div>
    );
}

export default Display;