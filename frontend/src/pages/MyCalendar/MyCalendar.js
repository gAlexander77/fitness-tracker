import React, {useState} from 'react';
import Nav from '../../components/Nav';
import Background from '../../components/Background';
import Footer from '../../components/Footer';
import Split from './components/Split';
import Calendar from './components/Calendar';
import CreateAWorkoutGroup from './components/CreateAWorkoutGroup';
import '../../styles/pages/MyCalendar/MyCalendar.css';

import calendarRequestData from '../../test-data/calendarRequest.json';
import journalRequestData from '../../test-data/journalRequest.json';

function WorkoutCalendar(){
    const [createAWorkoutGroup, setCreateAWorkoutGroup] = useState(false);
    return(
        <>
            <Nav/>
            <div className="my-calendar-page">
                <div className="my-calendar-content">
                    <h1 id="page-header">MY CALENDAR</h1>
                    <Split 
                        data={calendarRequestData}
                        setCreateAWorkoutGroup={setCreateAWorkoutGroup}
                    />
                    <Calendar 
                        data={calendarRequestData}
                        data2={journalRequestData}
                    />
                    <CreateAWorkoutGroup 
                        trigger={createAWorkoutGroup} 
                        setTrigger={setCreateAWorkoutGroup}
                    />                    
                </div>
                <Background/>
            </div>
            <Footer/>
        </>
    );
}

export default WorkoutCalendar;