import React, { useState } from 'react';
import '../../../styles/pages/MyJournal/MyJournal.css';

function TodaysEntry(){
    
    const [selectedOption, setSelectedOption] = useState("Macros Tracked");

    return(
        <div className="my-journal-todays-entry-component">
            <h1>TODAY'S ENTRY</h1>
            <div className="my-journal-todays-entry-container">
                <div className="my-journal-todays-entry-container-inner">
                    <TodaysEntryMenu selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
                    <Display selectedOption={selectedOption}/>
                </div>
            </div>
        </div>
    );
}

function TodaysEntryMenu(props){
    
    const menuOptions = ["Macros Tracked","Personal Records","Measurements","Calculator Results", "Notes"];
    
    const TodaysEntryMenuOption = (props) => {
            
        const selectOption = () => {
            props.setSelectedOption(props.option)
            console.log(props.option)
        }

        const backgroundColor = {
            color: `${props.selectedOption === props.option ? 'white' : 'white'}`,
            borderColor: `${props.selectedOption === props.option ? '#2DEDF3' : ''}`,
        }

        return(
            <button style={backgroundColor} onClick={selectOption}>
                {props.option}
            </button>
        );
    }

    return(
        <div className="my-journal-todays-entry-menu-container">
            {menuOptions.map((option, index)=>{
                return(
                    <TodaysEntryMenuOption
                        key={index}
                        option={option}
                        selectedOption={props.selectedOption}
                        setSelectedOption={props.setSelectedOption}
                    />
                )
            })}
        </div>
    );
}

function Display(props) {
    return(
        <div className="my-journal-todays-entry-display">
            <p>{props.selectedOption}</p>
        </div>
    );
}


export default TodaysEntry;