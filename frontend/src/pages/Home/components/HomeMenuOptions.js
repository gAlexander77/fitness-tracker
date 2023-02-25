import React from 'react';
import '../../../styles/pages/Home/Home.css';

function HomeMenuOptions(props){
    return(
        <div className="home-menu-options-container">
            <div>
                {options(props.isUser).map((option, index)=> {
                    return(
                        <p key={index}>{option}</p>
                    );
                })}
            </div>
        </div>
    );
}

function options(isUser) {
    let menuTitles = [];
    
    if(isUser === true){
        menuTitles = ["MY JOURNAL", "MY CALENDAR", "WORKOUTS", "WARM-UPS", "CALCULATORS"];
    }
    else{
        menuTitles = ["WORKOUTS", "WARM-UPS", "CALCULATORS"];
    }
    
    return menuTitles;
}

export default HomeMenuOptions;