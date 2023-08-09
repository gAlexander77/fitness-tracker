import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import '../../styles/pages/Workout/Workout.css';

import workoutsData from '../../test-data/workoutsRequest.json';

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

    const [diagramVisible, setDiagramVisible] = useState(true);
    const handleDiagramError = () => {
        setDiagramVisible(false);
    };
    
    console.log(data.muscles);


    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
  
    const nextImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % data.images.length);
    };
  
    const prevImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + data.images.length) % data.images.length);
    };
  
    useEffect(() => {
      if (!isHovered) {
        const timer = setInterval(() => {
          nextImage();
        }, 4000);
        return () => clearInterval(timer);
      }
    }, [isHovered, currentImageIndex]);
    
    return (
        <>
            <Nav/>
            <div className="workout-page">
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
                    <div className="workout-images-container" onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} >
                        <button onClick={prevImage}>&lt;</button>
                        <img src={data.images[currentImageIndex]} />
                        <button onClick={nextImage}>&gt;</button>
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
            <Footer/>
        </>
    );
}

export default Workout;