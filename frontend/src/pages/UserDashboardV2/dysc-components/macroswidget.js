import React from 'react';
import DonutChart from './DonutChart';
import MacrosIDHelper from './MacroIDHelper';
import LineGraph from './LineGraph';

import '../../../styles/pages/UserDashboardV2/dysc-components/MacrosWidget.css';
import data from '../../../test-data/journalRequest.json';


function MacrosWidget() {
    var macros = [];
    macros = MacrosIDHelper(data.journalEntries);

    return (
        <div>
            <div className='Activity-Ring'>
                <DonutChart id="User-Carbs-Intake" dailyIntake={macros[2]} dailyTotal={100} macro={"g Carbs"} color={"#2DEDF9"}></DonutChart>
                <DonutChart id="User-Calorie-Intake" dailyIntake={ macros[0] } dailyTotal={1000} macro={"Calories"} color={"#6AFF00"}></DonutChart>
                <DonutChart id="User-Protein-Intake" dailyIntake={macros[1]} dailyTotal={100} macro={"g Protein"} color={"#FF006A"}></DonutChart>
            </div>
            <LineGraph Entries={data.journalEntries}/>
        </div>
    );
}

export default MacrosWidget;