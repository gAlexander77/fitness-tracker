import React, {useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/pages/Home/Home.css';

function HomeMenuOptions(props){
    return(
        <div className="home-menu-options-container">
            <div>
                {options(props.isUser).map((option, index)=> {
                    return(
                        <MenuLink
                            key={index}
                            option={option}
                        />
                    );
                })}
            </div>
        </div>
    );
}

function MenuLink(props){
    
    const option = props.option;
    const link = "/"+option.toLowerCase().replace(/\s+/g, "-");

    let navigate = useRef(useNavigate());

    const goToLink = () => {
        navigate.current(link);
    };

    return(
        <button id="link-button" onClick={goToLink}>
            {option}
        </button>
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