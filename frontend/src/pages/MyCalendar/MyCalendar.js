import React from 'react';
import Nav from '../../components/Nav'
import Calendar from './componets/Calendar';
import '../../styles/pages/MyCalendar/MyCalendar.css';

import calendarRequestData from './testData/testData';

function WorkoutCalendar(){
    return(
        <div className="my-calendar-page">
            <Nav/>
            <Calendar data={calendarRequestData}/>
        </div>
    );
}

export default WorkoutCalendar;