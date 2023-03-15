import React from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../../components/Nav';
import '../../styles/pages/Workout/Workout.css';

import workoutsData from './testData/testData';

function Workout() {
    const { name } = useParams();

    const workoutName = name.replace(/-/g, " ");
    let index = workoutsData.findIndex((workout) => workout.workoutName.replace(/-/g, " ").toLowerCase() === workoutName.toLowerCase());
    
    if(index === -1) {
        index = 0;
    }
    
    console.log(index);
    const data = workoutsData[index];
    console.log(workoutName);

    return (
        <div className="workout-page">
            <Nav/>
            <div className="workout-content-container">
                <h1 id="workout-name-title">{data.workoutName}</h1>
                <p id="workout-description">{data.description}</p>
                <div className="workout-info-container">
                    <img id="diagram-image" src={data.diagram}/>
                    <div id="info-text">
                        <p>Muscles: {data.muscles}</p>
                        <p>Equipment: {data.equipment}</p>
                    </div>
                </div>
                <div className="workout-images-container">
                    {data.images.map((image, index)=>{
                        return(
                            <img key={index} src={image}/>
                        );
                    })}
                </div>
            </div>  
        </div>
    );
}

export default Workout;