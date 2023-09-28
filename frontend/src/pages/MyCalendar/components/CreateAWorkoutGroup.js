import React, { useState} from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { BsXLg, BsPlusLg, BsDashLg, BsFillEyeFill, BsSearch } from 'react-icons/bs';
import '../../../styles/pages/MyCalendar/Components/CreateAWorkoutGroup.css';

import workoutData from '../../../test-data/workoutsRequest.json';

function CreateAWorkoutGroup(props){

    const data = workoutData;
    console.log(data);

    const [searchQuery, setSearchQuery] = useState("");
    const filteredWorkouts = data.filter((workout) =>
        workout.workoutName.toLowerCase().replace(/-/g, " ").includes(searchQuery.toLowerCase().replace(/-/g, " "))
    );
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const [selectedWorkouts, setSelectedWorkouts] = useState([]);
    const [workoutGroupName, setWorkoutGroupName] = useState("");

    const exitPopupHandler = () => {
        props.setTrigger(false);
    }

    return(props.trigger) ? ReactDOM.createPortal(
        <div className="my-calendar-create-a-workout-group-outer">
            <div className="my-calendar-create-a-workout-group-inner">
                <button id="exit-button" onClick={exitPopupHandler}>
                    <BsXLg id="icon"/>
                </button>
                <div className="my-calendar-create-a-workout-group-header">
                    <h1>Create A Workout Group</h1>
                    <div className="my-calendar-create-a-workout-group-name-container">
                        <p>Group Name</p>
                        <input/>
                    </div>
                </div>
                <div className="my-calendar-create-a-workout-group-body">
                    <div className="my-calendar-create-a-workout-group-selected" id="left-container">
                        <h1>Selected Workouts</h1>
                        <DisplaySelectedWorkouts
                            selectedWorkouts={selectedWorkouts}
                            setSelectedWorkouts={setSelectedWorkouts}
                        />
                        <button>Create Workout Group</button>
                    </div>
                    <div className="my-calendar-create-a-workout-group-add-workouts" id="right-container">
                        <div className="my-calendar-create-a-workout-group-workout-search-container" id="workout-search-container">
                            <h1>Add Workouts</h1>
                            <SearchWorkouts handleSearchChange={handleSearchChange}/>
                            <DisplaySearchedWorkouts 
                                workouts={filteredWorkouts}
                                setSelectedWorkouts={setSelectedWorkouts}
                                selectedWorkouts={selectedWorkouts}                        
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>,document.getElementById('navbar')
    ):'';
}

function DisplaySelectedWorkouts(props){
    return(
        <div className="my-calendar-create-a-workout-group-selected-workouts-container">
            {props.selectedWorkouts.map((workout, index) => (
                <IndividualSelectedWorkout
                    key={index}
                    workout={workout}
                    selectedWorkouts={props.selectedWorkouts}
                    setSelectedWorkouts={props.setSelectedWorkouts}
                />
            ))}
        </div>
    );
}

function IndividualSelectedWorkout(props){

    const removeWorkout = () => {
        const updatedWorkouts = props.selectedWorkouts.filter(
            (workout) => workout.workoutName !== props.workout.workoutName
        );
        props.setSelectedWorkouts(updatedWorkouts);
    };

    return(
        <div className="my-calendar-create-a-workout-group-selected-workouts-individual-workout">
            <p id="workout-name">{props.workout.workoutName}</p>
            <button onClick={removeWorkout}>
                <BsDashLg id="icon"/>
            </button>
        </div>
    );
}

function SearchWorkouts(props){
    return(
        <div className="create-a-workout-search-workout-container" id="workout-search">
            <input onChange={props.handleSearchChange}/>
            <BsSearch id="icon"/>
        </div>
    );
}

function DisplaySearchedWorkouts(props){
    return(
        <div className="my-calendar-create-a-workout-group-workout-search-body">
            {props.workouts.map((workout, index)=>{
                return(
                    <IndividualSearchedWorkout
                        key={index}
                        index={index}
                        workout={workout}
                        setSelectedWorkouts={props.setSelectedWorkouts}
                        selectedWorkouts={props.selectedWorkouts}
                    />
                );
            })}
        </div>
    );
}

function IndividualSearchedWorkout(props){
    
    const workoutUrl = `/workout/${props.workout.workoutName.replace(/\s+/g, "-")}`;

    const addWorkout = () => {
        props.setSelectedWorkouts([...props.selectedWorkouts, props.workout]);
    };
    
    return(
        <div className="my-calendar-create-a-workout-group-workout-search-individual-workout">
            <p id="workout-name">
                {props.workout.workoutName}
            </p>
            <div className="individual-searched-workout-right-container">
                <Link
                    to={workoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                >
                    <button id="view-btn">
                        <BsFillEyeFill id="icon"/>
                        <p>View</p>
                    </button>
                </Link>
                <button id="add-btn" onClick={addWorkout}>
                    <BsPlusLg id="icon"/>
                </button>
            </div>
        </div>
    );
}

export default CreateAWorkoutGroup;