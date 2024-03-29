import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const DonutChart = ({ dailyIntake, dailyTotal, macro, color}) => {
const svgRef = useRef(null);

useEffect(() => {
    const drawDonutChart = () => {
    // we can edit these if it seems too big or too small
    const width = 200;  
    const height = 200;
    const startChart = Math.PI;
    const wholePie = 2 * Math.PI;

    const usedPercent = dailyIntake / dailyTotal;
    const activeColor = color;

    // this will be the percentage that has been used
    const arcForeground = d3.arc()
        .innerRadius(60)
        .outerRadius(75)
        .startAngle(startChart);  
        
        /* need to add something in case the user overlaps their rings */
        
    const svg = d3.select(svgRef.current)
        .attr("width", width)
        .attr("height", height)
        .selectAll("g")
        .data([null]) // Bind data to a single element to ensure only one group is created
        .enter()
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    svg.append("text")
        .attr("text-anchor", "middle")  // This will center the text
        .attr('dy', '5')  // This will position the text vertically in the center
        .attr("fill", "#edecec")
        .text(`${dailyIntake} ${macro}`);

    // const background = svg.append("path")
    //         .datum({ endAngle: wholePie })  // Full circle
    //         .style("fill", inactiveColor)
    //         .attr("d", arcBackground.toString());

    const foreground = svg.append("path")
        .datum({ endAngle: startChart })  // Will be updated in transition
        .style("fill", activeColor)
        .attr("d", arcForeground({ endAngle : startChart}));

    const newNum = (wholePie * usedPercent) + startChart;

    foreground.transition()
        .duration(750)
        .call(arcTween, newNum);


    function arcTween(transition, newAngle) {
        transition.attrTween("d", function(d) {
        const interpolate = d3.interpolate(d.endAngle, newAngle);
        return function(t) {
            d.endAngle = interpolate(t);
            return arcForeground(d);
        };
        });
    }
    };

    drawDonutChart();
}, [dailyIntake, dailyTotal, macro, color]);

return (
    <div className="wrapper">
    <svg ref={svgRef} ></svg>
    </div>
);
};

export default DonutChart;
