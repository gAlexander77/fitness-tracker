import React from 'react';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	LineElement, // whatever element you are trying to install, if you want a arcchart you would type ArcElement
	CategoryScale,
	LinearScale, // y axis
	PointElement,
	Legend,
	Tooltip
} from 'chart.js';

ChartJS.register(
	LineElement,
	CategoryScale, 
	LinearScale, 
	PointElement,
	Legend,
	Tooltip
)

const LineGraph = () => {
    const config = {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
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
				data: [1500, 1200, 1100, 1450, 1500, 2400, 2200], // going to have to pull the information here
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
			y:{
				min: 0,
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
				/>
			</div>
		</div>

    )
}
export default LineGraph;
