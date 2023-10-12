import data from '../../test-data/journalRequest.json';

import React from 'react';
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

/* this function gets all the entries and returns the dates in the format required by react-chartjs-2 in an array */
function DatesReformat(Entries){

	let validDatesArr = [];

	for (var i = 0; i < Entries.length; i++){
		let validDate;
		let dateString = Entries[i].journalEntry;
		
		let sections = dateString.split('-');
		let year = parseInt(sections[2]),
			month = parseInt(sections[0]) - 1,
			day = parseInt(sections[1]);
		validDate = new Date(year, month, day).toLocaleDateString('en-CA'); // validDate = "YYYY-MM-dd"
		validDatesArr.push(validDate)
	}	
	
	return validDatesArr;
}

const LineGraph = () => {
	// whenever we start pulling data from the 
	let Entries = data.journalEntries;
	
	let validDates = DatesReformat(Entries);

	let stringTemp = '2023-03-11';
	
	const config = {
		// let us use the date from the test data
	
    	labels: [validDates[0], validDates[1], validDates[2]], // so we have to send the dates as string types
      	// each data in each dataset needs to be pulled from the api
		// we might want to decide if we want to show current week info or last 7 days info
		
		datasets: [
			{
				/* 
					if we want curve or no curve. if we want curve we can specify or take it off (it will auto do curves)
					if we want no curves (straight lines), set tension to 0.0
				*/

				label: 'Carbs',
				data: [60, 120, 80, 0, 78, 68, 100],
				backgroundColor: '#2dedfe',
				borderColor: '#2dedfe',
				pointBorderColor: '#2dedfe',
				fill: "true",
				tension: 0.2 
			},
			{
				label: 'Calories',
				data: [data.journalEntries[0].macros[0].amount, data.journalEntries[1].macros[0].amount, 1100, 1450, 1500, 2400, 2200], // going to have to pull the information here
				backgroundColor: '#6AFF00',
				borderColor: '#6AFF00',
				pointBorderColor: '#6AFF00',
				displayColors: "true",

				tension: 0.2
      },
      {
				label: 'Protein',
				data: [140, 160, 80, 40, 125, 165, 180],
				backgroundColor: '#FF006A',
				borderColor: '#FF006A',
				pointBorderColor: '#FF006A',
				fill: "true",
				tension: 0.2 
			}
		],
		tooltips: {
      	backgroundColor: 'transparent',
        displayColors: false
		},
		scales: {
      xAxes: [{
        display: false,
        backgroundColor: "#"
			}]
		}

	}

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
    
    // weird behavior, i tried adding a class to the parent div to edit the size dimensions and it didnt want to work
	// it accepted the inline css. must fix

    return (
        <div>
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
		</div>

    )
}
export default LineGraph;
