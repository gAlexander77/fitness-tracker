import React, { useState, useEffect } from 'react';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"
import '../../../../styles/pages/MyJournalV2/components/journal-view-components/ViewMacrosBarChart.css';

export default function ViewMacrosBarChart({macrosData}) {

    //console.log(macrosData)
    const [showChart, setShowChart] = useState(false);
    const [chartData, setChartData] = useState({
        labels: [],  
        datasets: [{
            data: []
        }],
    });

    useEffect(() => {
        // Check if macrosData is available and is an array
        if (Array.isArray(macrosData) && macrosData.length > 0 && macrosData !== null) {
            const sortedMacrosData = [...macrosData].sort((a, b) => b.amount - a.amount); // Sort in descending order
    
            const labels = [];
            const data = [];
            const backgroundColor = 'rgba(45, 237, 254, 0.6)';
            const borderColor = '#2DEDFE';

            sortedMacrosData.forEach(macro => {
                labels.push(macro.type);
                data.push(macro.amount);
            });
    
            setChartData({
                labels: labels,
                datasets: [{
                    label: "grams",
                    data: data,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    borderWidth: 1,
                    borderRadius: 10,
                }]
            });
            setShowChart(true);
        }
        else {
            setShowChart(false);
        }
    }, [macrosData]);

    const options = {
        scales: {
            x: {  // No need to specify 'type' for x-axis. It's inferred as 'category'.
                beginAtZero: true,
                ticks: {
                    font: {
                        size: 20
                    }
                }
            },
            y: {
                type: 'linear',
                beginAtZero: true,
                ticks: {
                    font: {
                        size: 20
                    }
                }
            }
        }
    };

    return(showChart) ? (
        <div className='container'>
            <div style={{ width: '600px', height: '400px'}}>
                <Bar data={chartData}  options={options}/>
            </div>
        </div>
        
    ): '';
}
