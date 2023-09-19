import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import '../../styles/pages/UserDashboard/UserDashboard.css';

interface DonutChartProps {
    dailyIntake: number;
    dailyTotal: number;
}

const DonutChart: React.FC<DonutChartProps> = ({ dailyIntake, dailyTotal }) => {
const svgRef = useRef<SVGSVGElement | null>(null);

useEffect(() => {
    const drawDonutChart = () => {
    // we can edit these if it seems too big or too small
    const width = 200;  
    const height = 200;
    const startChart = Math.PI;
    const twoPie = 2 * Math.PI;

    const usedPercent = dailyIntake / dailyTotal;
    const activeColor = '#2DEDF9';
    const inactiveColor = '#edecec';

    // empty background to contrast total
    const arcBackground = d3.arc()
    .innerRadius(45)
    .outerRadius(60)
    .startAngle(0)
    .endAngle(twoPie);  // This will create a full circle for the background

    // this will be the percentage that has been used
    const arcForeground = d3.arc()
        .innerRadius(45)
        .outerRadius(60)
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
        .text("Macros");

   const background = svg.append("path")
        .datum({ endAngle: twoPie })  // Full circle
        .style("fill", inactiveColor)
        .attr("d", arcBackground);

    const foreground = svg.append("path")
        .datum({ endAngle: startChart })  // Will be updated in transition
        .style("fill", activeColor)
        .attr("d", arcForeground);

    const newNum = (twoPie * usedPercent) + startChart;

    foreground.transition()
        .duration(750)
        .call(arcTween, newNum);


    function arcTween(transition: any, newAngle: number) {
        transition.attrTween("d", function(d: any) {
        const interpolate = d3.interpolate(d.endAngle, newAngle);
        return function(t: any) {
            d.endAngle = interpolate(t);
            return arcForeground(d);
        };
        });
    }
    };

    drawDonutChart();
}, [dailyIntake, dailyTotal]);

return (
    <div className="wrapper">
    <svg ref={svgRef} className="donut__graph"></svg>
    </div>
);
};

export default DonutChart;