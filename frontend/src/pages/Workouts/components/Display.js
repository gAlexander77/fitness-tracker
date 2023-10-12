import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import Search from './Search';
import '../../../styles/pages/Workouts/components/Display.css';

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

    const [imageIndex, setImageIndex] = useState(0);
    const [hover, setHover] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        if (hover) {
        const interval = setInterval(() => {
            setImageIndex((prevIndex) => (prevIndex + 1) % props.images.length);
        }, 1000);
        return () => clearInterval(interval);
        }
    }, [hover]);

    useEffect(() => {
        setImageLoaded(false);
    }, [props.images]);

    const handleMouseEnter = () => {
        setHover(true);
    }

    const handleMouseLeave = () => {
        setHover(false);
        setImageIndex(0);
    }

    const handleImageLoad = () => {
        setImageLoaded(true);
    }

    return(
        <a className="workouts-display-workout-container" onClick={goToWorkout} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} href={link}>
            <div className="workouts-display-workout">
                {!imageLoaded && <Skeleton animation="wave" variant="rectangle" sx={{ bgcolor: 'grey.900', borderRadius: '10px',}} width="100%" height="100%" />}
                <img id="image" src={props.images[imageIndex]} onLoad={handleImageLoad} style={{ display: imageLoaded ? 'block' : 'none' }}/>
                <h1 id="name">{props.name}</h1>
            </div>
        </a>
    );
}

export default Display;