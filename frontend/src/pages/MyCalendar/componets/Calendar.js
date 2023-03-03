import React from 'react';
import '../../../styles/pages/MyCalendar/MyCalendar.css';

function Calendar(){
    return(
        <div className="my-calendar-calendar-component">
            <h1>CALENDAR</h1>
            <div className="my-calendar-calendar-container">
                <div className="my-calendar-calendar-calendar">
                    <CalendarDay day={0} date={"FEB 19"} split={"Push"}/>
                    <CalendarDay day={1} date={"FEB 18"} split={"Pull"}/>
                    <CalendarDay day={2} date={"FEB 20"} split={"Rest"}/>
                    <CalendarDay day={3} date={"FEB 21"} split={"Legs"}/>
                    <CalendarDay day={4} date={"FEB 22"} split={"Push"}/>
                    <CalendarDay day={5} date={"FEB 23"} split={"Pull"}/>
                    <CalendarDay day={6} date={"FEB 24"} split={"Rest"}/>
                </div>
            </div>
        </div>
    );
}

function CalendarDay(props){

    const dayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
    
    const day = {
        borderRight: `${props.day != 6 ? '1px solid white' : ''}`
    }
    
    const split = {
        backgroundColor: `${props.split.toLowerCase() === "rest" ? '#414141' : '#2DEDF3'}`,
        color: `${props.split.toLowerCase() === "rest" ? 'white' : 'black'}`
    }

    return(
        <div className="my-calendar-calendar-day" style={day}>
            <div className="my-calendar-calendar-day-display-date">
                    <p>{props.date}</p>
                    <p>{dayOfWeek[props.day]}</p>
            </div>
            <div className="my-calendar-calendar-day-content">
                <div className="my-calendar-calendar-split" style={split}>
                    {props.split}
                </div>
            </div>
        </div>
    );
}
export default Calendar;