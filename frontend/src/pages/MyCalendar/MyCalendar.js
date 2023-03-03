import React from 'react';
import Calendar from './componets/Calendar';
import '../../styles/pages/MyCalendar/MyCalendar.css';

function WorkoutCalendar(){
    return(
        <div className="my-calendar-page">
            <Calendar/>
        </div>
    );
}

export default WorkoutCalendar;