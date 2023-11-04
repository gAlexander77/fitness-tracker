import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom'
import Nav from '../../components/Nav';
import Background from '../../components/Background';
import Footer from '../../components/Footer';
import Split from './components/Split';
import Calendar from './components/Calendar';
import CreateAWorkoutGroup from './components/CreateAWorkoutGroup';
import '../../styles/pages/MyCalendar/MyCalendar.css';

import axios from 'axios';

const defaultRequestData = {
    calendar: { workoutGroups: [], workoutSplit: new Array(7).fill("Rest") },
    journal: []
};

function WorkoutCalendar(){
    const [createAWorkoutGroup, setCreateAWorkoutGroup] = useState(false);
    const [requestData, setRequestData] = useState(defaultRequestData);
    const navigate = useNavigate();

    useEffect(() => {
        if (requestData === defaultRequestData) {
            axios.get(`${process.env.REACT_APP_API_URL}/calendar`, {withCredentials: true})
                .then(response => setRequestData(response.data))
                .catch(() => navigate('/'));
        }
    }, [requestData]);

    return(
        <>
            <Nav/>
            <div className="my-calendar-page">
                <div className="my-calendar-content">
                    <h1 id="page-header">MY CALENDAR</h1>
                    <Split 
                        data={requestData.calendar}
                        setCreateAWorkoutGroup={setCreateAWorkoutGroup}
                    />
                    <Calendar 
                        data={requestData.calendar}
                        data2={requestData.journal}
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