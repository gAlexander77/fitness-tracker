import React from 'react';

function HomeMenuOptions(props){
    return(
        <div className="home-menu-options-container">
            <ul>
            {options(props.isUser).map((option, index)=> {
                return(
                    <li key={index}>{option}</li>
                );
            })}
            </ul>
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