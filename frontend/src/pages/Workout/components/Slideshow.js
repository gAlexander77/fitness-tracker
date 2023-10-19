import React, { useState, useEffect } from 'react';
import { BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';
import '../../../styles/pages/Workout/componets/Slideshow.css';

function Slideshow({images}) {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
  
    const nextImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
  
    const prevImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
  
    useEffect(() => {
      if (!isHovered) {
        const timer = setInterval(() => {
          nextImage();
        }, 10000);
        return () => clearInterval(timer);
      }
    }, [isHovered, currentImageIndex]);

    console.log(images)
    
    return (
        <div className="workout-slideshow-component-container">
            <div className="workout-slideshow-component" onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} >
                {images.length===0 ? "": 
                    <button id="left-btn" onClick={prevImage}>
                        <BsCaretLeftFill/>
                    </button>
                }
                <img id="displayed-image" src={images[currentImageIndex]} />
                <img id="blurred-background" src={images[currentImageIndex]} />
                {images.length===0 ? "": 
                    <button id="right-btn" onClick={nextImage}>
                        <BsCaretRightFill/>
                    </button>
                }
            </div>
        </div>
    );

}

export default Slideshow;