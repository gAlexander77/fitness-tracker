import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../../components/Nav';
import '../../styles/pages/Workout/Workout.css';

import workoutsDataRequest from '../../test-data/workoutsRequest.json';

function Workout() {
    
    let workoutsData = [];
    if(localStorage.getItem("workoutData")){
        workoutsData = JSON.parse(localStorage.getItem("workoutData"));
        console.log("Got localSorage Data")
    }
    else {
        workoutsData = workoutsDataRequest;
        localStorage.setItem("workoutData", JSON.stringify(workoutsData));
        console.log("Set Request Data")
    }
    
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
        <div className="workout-page">
            <Nav/>
            <div className="workout-content-container">
                <h1 id="workout-name-title">{data.workoutName}</h1>
                <p id="workout-description">{data.description}</p>
                <div className="workout-info-container">
                    {diagramVisible ? 
                        <img 
                            id="diagram-image" 
                            onError={handleDiagramError} 
                            src={data.diagram}
                        />:''
                    }
                    <div id="info-text">
                        {data.muscles === undefined ? '' : <p>Muscles: {data.muscles}</p>}
                        {data.equipment === undefined ? '' : <p>Equipment: {data.equipment}</p>}
                    </div>
                </div>
                <div className="workout-images-container">
                    {data.images.map((image, index)=>{
                        return(
                            <img key={index} src={image}/>
                        );
                    })}
                </div>
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
        </div>
    );
}

export default Workout;