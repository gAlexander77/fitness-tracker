import React, { useState } from 'react';
import { BsMoonStars, BsSun } from 'react-icons/bs';


import { useParams } from 'react-router-dom';
import Nav from '../../components/Nav';
import Background from '../../components/Background';
import Footer from '../../components/Footer';
import Slideshow from './components/Slideshow';
import '../../styles/pages/Workout/Workout.css';

import workoutsData from '../../test-data/workoutsRequest.json';

function Workout() {
    const [light, setLight] = useState(false);

    const { name } = useParams();

    const workoutName = name.replace(/-/g, " ");
    let index = workoutsData.findIndex((workout) => workout.workoutName.replace(/-/g, " ").toLowerCase() === workoutName.toLowerCase());
    
    if(index === -1) {
        index = 0;
    }
    
    console.log(index);
    const data = workoutsData[index];
    console.log(workoutName);

    const [diagramVisible, setDiagramVisible] = useState(true);
    const handleDiagramError = () => {
        setDiagramVisible(false);
    };
    
    console.log(data.muscles);
    
    return (
        <>
            <Nav/>
            <div className="workout-page">
                <div className={`workout-content-container ${light ? 'light' : ''}`}>
                    <div className="workout-title-container">
                        <h1 id="workout-name-title">{data.workoutName}</h1>
                        <Toggle light={light} setLight={setLight}/>
                    </div>
                    
                    <p id={`workout-description ${light ? 'light' : ''}`}>{data.description}</p>
                    <div className="workout-info-container">
                        {diagramVisible ? 
                            <img 
                                id="diagram-image" 
                                onError={handleDiagramError} 
                                src={data.diagram}
                            />:''
                        }
                        <div id="info-text">
                            {data.muscle === undefined ? '' : <p>Muscles: {data.muscle}</p>}
                            {data.equipment === undefined ? '' : <p>Equipment: {data.equipment}</p>}
                        </div>
                    </div>
                    <Slideshow images={data.images}/>
                    {false ? <div className="workout-images-container">
                        {data.videos.map((video, index)=>{
                            return(
                                <video key={index} width="320" height="240" autoplay>
                                    <source src={video}/>
                                </video>
                            );
                        })}
                        
                    </div>:''}
                </div>
                <Background/>
            </div>
            <Footer/>
        </>
    );
}

function Toggle({light, setLight}) {

    const toggleLight = () => {
        setLight(!light);
    }

    return light ? (
        <button className="toggle-light-btn light-btn" onClick={toggleLight}>
            <p>Toggle Dark Mode</p>
            <BsMoonStars/>
        </button>
    ) :
    (
        <button className="toggle-light-btn dark-btn" onClick={toggleLight}>
            <p>Toggle Light Mode</p>
            <BsSun/>
        </button>
    );
}

export default Workout;