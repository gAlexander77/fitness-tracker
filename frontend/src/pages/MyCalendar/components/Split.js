import React, { useState, useRef, useEffect } from 'react';

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

function CreateASplit(props) {
    
    console.log(props.data.workoutGroups);
    const groupNames = props.data.workoutGroups.map(obj => obj.groupName);
    groupNames.push("Rest");
    console.log(groupNames);
 
    const [split, setSplit] = useState([
        {day: "Sunday",workoutGroup: "Select",},
        {day: "Monday",workoutGroup: "Select",},
        {day: "Tuesday",workoutGroup: "Select",},
        {day: "Wednesday",workoutGroup: "Select",},
        {day: "Thursday",workoutGroup: "Select",},
        {day: "Friday",workoutGroup: "Select",},
        {day: "Saturday",workoutGroup: "Select",},
    ])

    const updateWorkoutGroup = (index, groupName) => {
        setSplit((prevSplit) => {
          const updatedSplit = [...prevSplit];
          updatedSplit[index].workoutGroup = groupName;
          return updatedSplit;
        });
    };

    function Day(props) {
        
        const dropDownRef = useRef();
        
        const [dropDown, setDropDown] = useState(false);

        const SelectionMenuButton = (props) => {            
    
            useEffect(() => {
                if(props.trigger){
                    let outsideClickHandler = (evt) => {
                        if(!dropDownRef.current.contains(evt.target)) {
                            props.setTrigger(false);
                        }
                    }
                    document.addEventListener("mousedown", outsideClickHandler)
                    return() => {
                        document.removeEventListener("mousedown", outsideClickHandler);
                    }
                }
            }, [props.trigger]);

            const menuHandler = () => {
                props.setTrigger(!props.trigger)
            }
            
            let style;
            switch (props.workoutGroup) {
                case "Select":
                    style = {backgroundColor: "white",color: "black"};
                    break;
                case "Rest":
                    style = {backgroundColor: "#414141",color: "white"};
                    break;
                default:
                    style = {backgroundColor: "#2DEDF3",color: "black"};
            }

            return (
                <button id="drop-down-btn" ref={dropDownRef} onClick={menuHandler} style={style}>{props.workoutGroup}</button>
            );
        }

        const SelectionDropDown = (props) => {
            
            const Selection = (props) => {
                const setWorkoutGroupHandler = () => {
                    updateWorkoutGroup(props.splitIndex, props.name)
                }

                return (
                    <button id="option-selection-btn" onClick={setWorkoutGroupHandler}>{props.name}</button>
                );
            }

            return (props.trigger) ? (
                <div className="my-calendar-split-create-a-split-menu" ref={dropDownRef}>
                    {props.groupNames.map((name, index)=>{
                        return(
                            <Selection key={index} name={name} splitIndex={props.splitIndex}/>
                        );
                    })}
                </div>  
            ):'';
        }
        
        return (
            <div className="my-calendar-split-create-a-split-day-container">
                <h1>{props.day}</h1>
                <SelectionMenuButton 
                    trigger={dropDown} 
                    setTrigger={setDropDown} 
                    workoutGroup={props.workoutGroup}
                />
                <SelectionDropDown 
                    trigger={dropDown} 
                    setTrigger={setDropDown} 
                    groupNames={props.groupNames} 
                    splitIndex={props.index}
                />
            </div>
        );
    }
    
    const setCurrentSplitHandler = (evt) => {
        console.log('set Current Split')
    }

    return (
        <div className="my-calendar-split-create-a-split-container">
            <div className="my-calendar-split-create-a-split-days-container">
                {split.map((split, index)=>{
                    return(
                        <Day
                            key={index}
                            index={index}
                            day={split.day}
                            workoutGroup={split.workoutGroup}
                            setSplit={setSplit}
                            groupNames={groupNames}
                        />
                    );
                })}
            </div>
            <button id="set-split-btn" onClick={setCurrentSplitHandler}>Set</button>
        </div>
    );


}

function ViewWorkoutGroups(props) {
    
    const workoutGroups = props.data.workoutGroups;
    console.log(workoutGroups);
    
    const WorkoutGroup = (props) => {
        console.log(props.groupName)
        return (
            <button id="group-name-btn">{props.groupName}</button>
        );
    }
    
    return (
        <div className="my-calendar-split-view-workout-groups">
            {workoutGroups.map((workoutGroup, index)=>{
                return(
                    <WorkoutGroup
                        key={index}
                        groupName={workoutGroup.groupName}
                    />     
                );
            })}
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