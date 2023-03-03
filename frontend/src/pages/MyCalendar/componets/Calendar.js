import React, { useState, useEffect } from 'react';
import '../../../styles/pages/MyCalendar/MyCalendar.css';

function Calendar(props){
    // Test Data
    const data = props.data.calendarRequestData;
    
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
                <button onClick={back}>-</button>
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
                            />
                        )
                    })}
                </div>
                <button onClick={forward}>+</button>
            </div>
        </div>
    );
}

function CalendarDay(props){
    
    const currentDate =  americanDateFormat();
    const calendarDate = americanDateFormat(props.dateValue);
    
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

    return(
        <div className="my-calendar-calendar-day" style={day}>
            <div className="my-calendar-calendar-day-display-date" style={backgroundColor}>
                    <p>{props.date}</p>
                    <p>{props.dayOfWeek}</p>
            </div>
            <div className="my-calendar-calendar-day-content" style={backgroundColor}>
                {currentDate === calendarDate ? <div style={currentDateTab}/> : <div style={currentDateTab}/>}
                <div className="my-calendar-calendar-split" style={split}>
                    {props.split}
                </div>
            </div>
        </div>
    );
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