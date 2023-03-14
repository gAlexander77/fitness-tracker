import React, { useState, useEffect, useRef } from 'react';
import { BsFillCaretLeftFill, BsFillCaretRightFill, BsXLg } from 'react-icons/bs';
import '../../../styles/pages/MyCalendar/MyCalendar.css';

function Calendar(props){
    // Test Data
    const data = props.data.calendarRequestData;
    const journalData = props.data2.journalRequestData;
    console.log(journalData.journalEntries)

    const [dates, setDates] = useState([]);    
    const [weeksFromNow, setWeeksFromNow] = useState(0);

    useEffect(() => {
        setDates(setTheWeekDates(weeksFromNow));
        console.log(dates)
    },[weeksFromNow])

    const back = () => {
        setWeeksFromNow(weeksFromNow-1)
    }

    const forward = () => {
        setWeeksFromNow(weeksFromNow+1)
    }

    return(
        <div className="my-calendar-calendar-component">
            <h1>CALENDAR</h1>
            <div className="my-calendar-calendar-container">
                <button onClick={back}><BsFillCaretLeftFill/></button>
                <div className="my-calendar-calendar-calendar">
                    {dates.map((date, index)=>{
                        return(
                            <CalendarDay
                                key={index}
                                day={date.day}
                                date={date.month+" "+date.date}
                                dayOfWeek={date.dayOfWeek}
                                split= {data.workoutSplit[date.day]}
                                dateValue = {date.dateValue}
                                data={data.workoutGroups}
                                journalData={journalData.journalEntries}
                            />
                        )
                    })}
                </div>
                <button onClick={forward}><BsFillCaretRightFill/></button>
            </div>
        </div>
    );
}

function CalendarDay(props){
    const journalEntry = props.journalData.map(obj => obj.journalEntry);

    const [viewWorkouts, setViewWorkouts] = useState(false);

    const currentDate =  americanDateFormat();
    const calendarDate = americanDateFormat(props.dateValue);
    
    const hasJournalEntry = journalEntry.includes(calendarDate);
    
    const day = {
        borderRight: `${props.day !== 6 ? '1px solid white' : ''}`
    }
    
    const split = {
        backgroundColor: `${props.split.toLowerCase() === "rest" ? '#414141' : '#2DEDF3'}`,
        color: `${props.split.toLowerCase() === "rest" ? 'white' : 'black'}`
    }
    
    const backgroundColor = {
        backgroundColor: `${currentDate === calendarDate ? '#353535' : '#2B2B2B'}`,
    }

    const currentDateTab = {
        width: '100%',
        height: '10px',
        backgroundColor: `${currentDate === calendarDate ? '#2DEDF3' : '#2B2B2B'}`,
    }

    // Filter workouts by the groupName    
    const pullWorkouts = props.data.filter(group => group.groupName === props.split);
    const pullWorkoutNames = pullWorkouts.flatMap(group => {
        return group.workouts.map(workout => workout.workoutName);
    });

    const viewWorkoutsHandler = () => {
        if(props.split !== "Rest"){
            setViewWorkouts(true);
        }
        console.log(props.data)
        console.log(pullWorkoutNames)
    }

    // Setup to open journal page
    const viewJournalEntryHandler = () => {
        console.log(calendarDate);
    }

    return(
        <div className="my-calendar-calendar-day" style={day}>
            <div className="my-calendar-calendar-day-display-date" style={backgroundColor}>
                    <p>{props.date}</p>
                    <p>{props.dayOfWeek}</p>
            </div>
            <div className="my-calendar-calendar-day-content" style={backgroundColor}>
                {currentDate === calendarDate ? <div style={currentDateTab}/> : <div style={currentDateTab}/>}
                <div className="my-calendar-calendar-split" style={split} onClick={viewWorkoutsHandler}>
                    {props.split}
                </div>
                <div id="journal-entry-wrapper">
                {hasJournalEntry ? 
                    <button id="journal-entry-btn" onClick={viewJournalEntryHandler}>
                        Journal Entry
                    </button>
                :''}
                </div>
            </div>
            <WorkoutDetails 
                trigger={viewWorkouts} 
                setTrigger={setViewWorkouts}
                workouts={pullWorkoutNames}
                split={props.split}
            />
        </div>
    );
}

function WorkoutDetails(props) {
    const [workouts, setWorkouts] = useState(props.workouts);
   
    const innerRef = useRef();
    
    useEffect(() => {
        if(props.trigger){
            let outsideClickHandler = (evt) => {
                if(!innerRef.current.contains(evt.target)) {
                    props.setTrigger(false);
                }
            }
            document.addEventListener("mousedown", outsideClickHandler)
            return() => {
                document.removeEventListener("mousedown", outsideClickHandler);
            }
        }
    }, [props.trigger]);
    
    const exitHandler = () => {
        props.setTrigger(false);
    }

    const Workout = (props) => {
        return(
            <p>{props.workoutName}</p>
        );
    }
    
    return(props.trigger) ? (
        <div className="my-calendar-calendar-workout-details-outter" >
             <div className="my-calendar-calendar-workout-details-inner" ref={innerRef}>
                <h1>{props.split} Workouts</h1>
                {workouts.map((workout, index)=>{
                    return(
                        <Workout
                            key={index}
                            workoutName={workout}
                        />
                    );
                })}
                <button onClick={exitHandler}>
                    <BsXLg id="icon"/>
                </button>
             </div>
        </div>) : '';
}

const getTheDate = (x) => {
    if (x== undefined || x === null) {
        x = 0;
    }
    return (new Date(Date.now() + x * 24 * 60 * 60 * 1000));
}

const setTheWeekDates = (weekFromNow) => {
    
    const daysOfTheWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
    let dates = [];
    
    const daysfromNow = weekFromNow * 7;
    let today = getTheDate(daysfromNow).getDay();
    let j = today * -1;  
    for(let i = 0; i < 7; i++){
        let currentDate = getTheDate(j+i+daysfromNow);
        dates.push({
            day: i,
            month: months[currentDate.getMonth()],
            date: currentDate.getDate(),
            dayOfWeek: daysOfTheWeek[i],
            dateValue: currentDate,
        });
    }
    console.log(dates);
    return(dates)
}


const americanDateFormat = (x) => {
    if (x === undefined || x === null){
        x = getTheDate();
    }
    return(`${x.getMonth()+1}-${x.getDate()}-${x.getFullYear()}`)
}

export default Calendar;