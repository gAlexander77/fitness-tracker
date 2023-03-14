import React from 'react';
import Nav from '../../components/Nav';
import Split from './components/Split';
import Calendar from './components/Calendar';
import '../../styles/pages/MyCalendar/MyCalendar.css';

import calendarRequestData from './testData/testData';
import journalRequestData from './testData/testData2';

function WorkoutCalendar(){
    return(
        <div className="my-calendar-page">
            <Nav/>
            <h1 id="page-header">MY CALENDAR</h1>
            <Split data={calendarRequestData}/>
            <Calendar data={calendarRequestData} data2={journalRequestData}/>
        </div>
    );
}

export default WorkoutCalendar;