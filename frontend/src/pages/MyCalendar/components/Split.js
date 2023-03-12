import React, { useState } from 'react';

function Split(props){
    // Test Data
    let data = props.data.calendarRequestData
    
    const [selectedMenu, setSelectedMenu] = useState("current-split")

    const selectMenuHandler = (evt) => {
        setSelectedMenu(evt.target.id);
    }

    return (
        <div className="my-calendar-split-component">
            <h1>SPLIT</h1>
            <div className="my-calendar-split-container">
                <div className="my-calendar-split-menu-container">
                    <button 
                        id="current-split" 
                        onClick={selectMenuHandler} 
                        style={{ color: selectedMenu === "current-split" ? '#2DEDF3' : '' }}
                    >   
                        CURRENT SPLIT
                    </button>
                    <button 
                        id="create-a-split" 
                        onClick={selectMenuHandler}
                        style={{ color: selectedMenu === "create-a-split" ? '#2DEDF3' : '' }}
                    >
                        CREATE A SPLIT
                    </button>
                    <button 
                        id="view-workout-groups" 
                        onClick={selectMenuHandler}
                        style={{ color: selectedMenu === "view-workout-groups" ? '#2DEDF3' : '' }}
                    >
                        VIEW WORKOUT GROUPS
                    </button>
                    <button 
                        id="create-a-workout-group" 
                        onClick={selectMenuHandler}
                        style={{ color: selectedMenu === "create-a-workout-group" ? '#2DEDF3' : '' }}
                    >
                        CREATE A WORKOUT GROUP
                    </button>
                </div>
                <div className="my-calendar-split-selected-container">
                    {selectedMenu === "current-split" ? <CurrentSplit data={data}/> : ''}
                    {selectedMenu === "create-a-split" ? <CreateASplit data={data}/> : ''}
                    {selectedMenu === "view-workout-groups" ? <ViewWorkoutGroups data={data}/> : ''}
                    {selectedMenu === "create-a-workout-group" ? <CreateAWorkoutGroup data={data}/> : ''}
                </div>
            </div>
        </div>
    );
}

function CurrentSplit(props){
    
    const split = props.data.workoutSplit;
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    
    const Day = (props) => {

        const style = {
            backgroundColor: `${props.workoutGroup.toLowerCase() === "rest" ? '#414141' : '#2DEDF3'}`,
            color: `${props.workoutGroup.toLowerCase() === "rest" ? 'white' : 'black'}`
        }

        return(
            <div className="my-calendar-split-current-split-day-container">
                <p id="day">{props.day}</p>
                <div id="workout-group" style={style}>{props.workoutGroup}</div>
            </div>
        )
    }
    
    return (
        <div className="my-calendar-split-current-split-container">
            {split.map((workoutGroup, index)=>{
                return(
                    <Day
                        key={index}
                        day={days[index]}
                        workoutGroup={workoutGroup}
                    />
                );
            })}
        </div>
    );
}

function CreateASplit() {
    
    const [split, setSplit] = useState([
        {
            day: "Sunday",
            workoutGroup: "",
        },
        {
            day: "Monday",
            workoutGroup: "",
        },
        {
            day: "Tuesday",
            workoutGroup: "",
        },
        {
            day: "Wednsday",
            workoutGroup: "",
        },
        {
            day: "Thursday",
            workoutGroup: "",
        },
        {
            day: "Friday",
            workoutGroup: "",
        },
        {
            day: "Saturday",
            workoutGroup: "",
        },
    ])

    const Day = (props) => {
        
        const OptionsMenu = () => {
            return (
                <div>
                    <button>Option 1</button>
                </div>
            );
        }
        
        return (
            <div>
                <h1>{props.day}</h1>
                <button>{props.selection}</button>
                <OptionsMenu/>
            </div>
        );
    }
    
    return (
        <div className="my-calendar-split-create-a-split-container">
            {split.map((split, index)=>{
                return(
                    <Day
                        key={index}
                        day={split.day}
                        workoutGroup={split.workoutGroup}
                        setSplit={setSplit}
                    />
                );
            })}
        </div>
    );
}

function ViewWorkoutGroups() {
    return (
        <div className="my-calendar-split-view-workout-groups">
            View Workout Groups
        </div>
    );
}

function CreateAWorkoutGroup() {
    return(
        <div className="my-calendar-split-create-a-workout-group">
            Create A Workout Group
        </div>
    );
}

export default Split;