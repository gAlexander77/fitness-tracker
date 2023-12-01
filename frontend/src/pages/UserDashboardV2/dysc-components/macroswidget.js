import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import DonutChart from './DonutChart';
import MacrosIDHelper from './MacroIDHelper';
import LineGraph from './LineGraph';

import axios from 'axios';

import '../../../styles/pages/UserDashboardV2/dysc-components/MacrosWidget.css';

function MacrosWidget() {

    const [entries, setEntries] = useState(undefined);
    const [macros, setMacros] = useState(undefined);
    const navigate = useNavigate('/');

    useEffect(() => {
        if (macros === undefined) {
            axios.get(`${process.env.REACT_APP_API_URL}/journal`, {withCredentials: true})
                .then(response => {
                    setEntries(response.data);
                    const [cals, protein, carbs] = MacrosIDHelper(response.data).map(result => parseFloat(result));
                    setMacros({cals, protein, carbs});
                })
                .catch(() => navigate('/'));
        }

        console.log(macros);

    }, [macros]);
    

    return (
        <div>
            <div className='Activity-Ring'>
                <DonutChart id="User-Carbs-Intake" dailyIntake={macros?.carbs} dailyTotal={100} macro={"g Carbs"} color={"#2DEDF9"}></DonutChart>
                <DonutChart id="User-Calorie-Intake" dailyIntake={macros?.cals} dailyTotal={1000} macro={"Calories"} color={"#6AFF00"}></DonutChart>
                <DonutChart id="User-Protein-Intake" dailyIntake={macros?.protein} dailyTotal={100} macro={"g Protein"} color={"#FF006A"}></DonutChart>
            </div>
            <LineGraph Entries={entries || []}/>
        </div>
    );
}

export default MacrosWidget;