import React, { useEffect, useRef } from 'react';
import Chart from "chart.js";


const CalorieChart = ({ sourceData }) => {
    const ref = useRef(null);
    const keys = Object.keys(sourceData[0].nutrients);

    const getDataForChart = (sourceData) => {
        return keys.map(key => {
            return sourceData.reduce((acc, { nutrients }) => parseFloat(acc) + parseFloat(nutrients[key].$numberDecimal), 0).toFixed(2);
        });
    };

    useEffect(() => {
        const ChartRef = ref.current.getContext("2d");    
        const CalorieChart = new Chart(ChartRef, {
            type: 'doughnut',
            data: {
                labels: keys,
                datasets: [{
                    data: getDataForChart(sourceData),
                    backgroundColor: [
                        '#467302',
                        '#F29F05',
                        '#D95204',
                        '#A61103'
                    ],
                    borderWidth: 3
                }]
            },
            options: {
                legend: {
                    labels: {
                        fontColor: "black",
                        fontSize: 14,
                    },
                    position: "bottom",
                },
                title: {
                    display: true,
                    fontColor: "black",
                    fontSize: 20,
                    text: "Total daily nutrients",
                    lineHeight: 4
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });

        // Remove old chart before re-render, old chart does not get deleted, the new one just overlaps it - this fixes the issue
        return () => {
            CalorieChart.destroy();
        }
    }, [sourceData, ref]);

    return (
        <div className="chart-wrapper">
            <canvas id="myChart" ref={ref}></canvas>
        </div>
    );
};

export default CalorieChart;