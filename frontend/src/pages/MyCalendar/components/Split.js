import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Split(props){
    // Test Data
    let data = props.data;

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
                    {selectedMenu === "create-a-workout-group" ? <CreateAWorkoutGroup data={data} setCreateAWorkoutGroup={props.setCreateAWorkoutGroup}/> : ''}
                </div>
            </div>
        </div>
    );
}

function CurrentSplit(props){

    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     if (data.length === 0) {
    //         axios.get('http://localhost:3001/api/split', {withCredentials: true})
    //             .then(response => setData(response.data))
    //             .catch(() => navigate('/'));
    //     }
    // }, [data]);
    
    const data = props.data.workoutSplit;
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
            {data.map((workoutGroup, index)=>{
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
    
    const navigate = useNavigate();
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     if (data.length === 0) {
    //         axios.get('http://localhost:3001/api/split/workouts', {withCredentials: true})
    //             .then(response => setData(response.data))
    //             .catch(() => navigate('/'));
    //     }
    // }, [data]);
    
    const groupNames = props.data.workoutGroups.map(obj => obj.groupName);
 
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
                
        const btnRef = useRef(null);
        const [dropDown, setDropDown] = useState(false);

        const SelectionMenuButton = (props) => {            
    
            useEffect(() => {
                if(props.trigger){
                    let outsideClickHandler = (evt) => {
                        if(!btnRef.current.contains(evt.target)) {
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
                <button id="drop-down-btn" ref={btnRef} onClick={menuHandler} style={style}>{props.workoutGroup}</button>
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
                <div className="my-calendar-split-create-a-split-menu" ref={btnRef}>
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
    
    const [errors, setErrors] = useState('');

    const setCurrentSplitHandler = () => {

        const currentErrors = [];

        split.forEach(weekDay => {
            if (weekDay.workoutGroup == "Select")
                currentErrors.push(weekDay.day);
        })

        if (currentErrors.length > 0) {
            const n = currentErrors.length - 1;
            setErrors(currentErrors.length === 1
                ? currentErrors[0]
                : currentErrors.slice(0, n).join(', ') + ' and ' + currentErrors[n]);
        } else {
            axios.post(`${process.env.REACT_APP_API_URL}/split`, 
                { workoutSplit: split.map(weekDay => weekDay.workoutGroup) },
                { withCredentials: true })
                .then(() => navigate(0))
                .catch(() => navigate('/'));
        }
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
            <p>{ errors ? `You still need to set ${errors}` : '' }</p>
            <button id="set-split-btn" onClick={setCurrentSplitHandler}>Set</button>
        </div>
    );


}

function ViewWorkoutGroups(props) {
    
    const workoutGroups = props.data.workoutGroups;
    // const [workoutGroups, setWorkoutGroups] = useState([]);

    // useEffect(() => {
    //     if (workoutGroups.length === 0) {
    //         axios.get('http://localhost:3001/api/split/workouts', {withCredentials: true})
    //             .then(response => setWorkoutGroups(response.data))
    //             .catch(() => navigate('/'));
    //     }
    // }, [workoutGroups]);
    
    const WorkoutGroup = (props) => {
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

function CreateAWorkoutGroup(props) {

    const activatePopupHandler = () => {
        props.setCreateAWorkoutGroup(true);
    }

    return(
        <div className="my-calendar-split-create-a-workout-group">
            <button onClick={activatePopupHandler}>Create A Workout Group</button>
        </div>
    );
}

export default Split;