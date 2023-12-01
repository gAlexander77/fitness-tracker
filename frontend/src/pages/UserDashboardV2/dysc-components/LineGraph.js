import data from '../../../test-data/journalRequest.json';
import MacroDA from './MacroDA';
// import '../../../styles/pages/UserDashboardV2/dysc-components/MacrosWidget.css';

import React, { useState } from 'react';
import {
	Chart as ChartJS,
	LineElement, // whatever element you are trying to install, if you want a arcchart you would type ArcElement
	TimeScale, // for X axis, needs to be converted to Time scale
	LinearScale, // y axis
	PointElement,
	Legend,
	Tooltip
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';


ChartJS.register(
	LineElement,
	TimeScale, 
	LinearScale, 
	PointElement,
	Legend,
	Tooltip
)

function MacrosDivi(Entries) {

	let macrosArray = [];

	for (let i = 0; i < Entries.length; i++){
		macrosArray.push(Entries[i].macros);
	}
	return macrosArray;
}

/* this function gets all the entries and returns the dates in the format required by react-chartjs-2 in an array */
function DatesReformat(Entries){

	let validDatesArr = [];

	for (let i = 0; i < Entries.length; i++){
		let validDate;
		let dateString = Entries[i].date;
		
		let sections = dateString.split('-');
		let year = parseInt(sections[2]),
			month = parseInt(sections[0]) - 1,
			day = parseInt(sections[1]);
		validDate = new Date(year, month, day).toLocaleDateString('en-CA'); // validDate = "YYYY-MM-dd"
		validDatesArr.push(validDate)
	}	
	
	return validDatesArr;
}

const LineGraph = ({Entries}) => {
	const [activeButton, setActiveButton] = useState(14);

	const [daysToShow, setDaysToShow] = useState(14); // 3 is the initial number of days visible

	var Macros = MacrosDivi(Entries);
	var validDates = DatesReformat(Entries);
	var calories = [], protein = [], carbs = [];

	carbs = MacroDA(Macros, 'carbs');
	calories = MacroDA(Macros, 'calories');
	protein = MacroDA(Macros, 'protein');

	const updateData = (numDays) => {
		const updatedLabels = validDates.slice(0, numDays);
		const updatedCarbsData = carbs.slice(0, numDays);
		const updatedCaloriesData = calories.slice(0, numDays);
		const updatedProteinData = protein.slice(0, numDays);

		const updatedConfig = {
			labels: updatedLabels,
			datasets: [
				{
					label: 'Carbs',
					data: updatedCarbsData,
					backgroundColor: '#2dedfe',
					borderColor: '#2dedfe',
					pointBorderColor: '#2dedfe',
					fill: "true",
					tension: 0.2
				},
				{
					label: 'Calories',
					data: updatedCaloriesData,
					backgroundColor: '#6AFF00',
					borderColor: '#6AFF00',
					pointBorderColor: '#6AFF00',
					displayColors: "true",
					tension: 0.2
				},
				{
					label: 'Protein',
					data: updatedProteinData,
					backgroundColor: '#FF006A',
					borderColor: '#FF006A',
					pointBorderColor: '#FF006A',
					fill: "true",
					tension: 0.2
				},
			],
			tooltips: {
				backgroundColor: 'transparent',
				displayColors: false
			},
			scales: {
				xAxes: [{
					display: false,
				}]
			},

		};
		return updatedConfig;
	};

	const handleExpandClick = (numDays) => {
		setDaysToShow(numDays);
		setActiveButton(numDays);
	};

	const config = updateData(daysToShow);

	const options = {
		plugins: {
			legend: true
		},
		scales: {
			x: { 
				type: 'time',
				time: {
					unit: 'day'
				}
			},
			y:{
				beginAtZero: true,
			},
		}
    }
    
	/* the handleExpandClick(2) and ...(3) is only to demo functionality, not enough test data to try with 7 yet. */

     return (
    <div className="graph-container">
      <div style={{
        width: "40rem",
        margin: 'auto',
        backgroundColor: '#1b1b1b'
      }}> 
        <Line
          data={config}
          options={options}
        >
        </Line>
      </div>

      <div className="button-row">
        <button onClick={() => handleExpandClick(3)} className={activeButton === 3 ? "active" : ""}>3 days </button>
        <button onClick={() => handleExpandClick(7)} className={activeButton === 7 ? "active" : ""}>7 days </button>
        <button onClick={() => handleExpandClick(14)} className={activeButton === 14 ? "active" : ""}>14 days </button>
      </div>
    </div>
  );
}
export default LineGraph;