import React from 'react';
import Nav from '../../components/Nav'
import Calendar from './componets/Calendar';
import '../../styles/pages/MyCalendar/MyCalendar.css';

function WorkoutCalendar(){
    return(
        <div className="my-calendar-page">
            <Nav/>
            <Calendar/>
        </div>
    );
}

export default WorkoutCalendar;