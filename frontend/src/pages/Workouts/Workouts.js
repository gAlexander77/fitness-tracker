import React, { useEffect, useState } from 'react';
import Nav from '../../components/Nav';
import Background from '../../components/Background';
import Footer from '../../components/Footer';
import Search from './components/Search';
import Display from './components/Display';
import '../../styles/pages/Workouts/Workouts.css';

import axios from 'axios';

function Workouts(){

    const [data, setData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);

    const [searchQuery, setSearchQuery] = useState("");
    
    const filteredWorkouts = data.filter((workout) =>
        workout.workoutName.toLowerCase().replace(/-/g, " ").includes(searchQuery.toLowerCase().replace(/-/g, " "))
    );
    
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const getWorkoutList = () => {
        axios.get(`http://localhost:3001/api/workouts?limit=200`)
            .then(response => setData(response.data))
    };

    useEffect(() => {
        if (data.length === 0)
            getWorkoutList();
    }, [data]);

    return(
        <>
            <Nav/>
            <div className="workouts-page">
                <div className="content">
                    <Search 
                        handleSearchChange={handleSearchChange}
                    />
                    <Display 
                        handleSearchChange={handleSearchChange}
                        data={filteredWorkouts}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <Background/>
            </div>
            <Footer/>
        </>
    );
}

export default Workouts;