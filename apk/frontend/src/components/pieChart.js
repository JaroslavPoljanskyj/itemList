import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registering required components for chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ solvedCount, unsolvedCount }) => {
    // Pie chart data and configuration
    const data = {
        labels: ['Solved', 'Unsolved'],
        datasets: [
            {
                label: 'Items Status',
                data: [solvedCount, unsolvedCount],
                backgroundColor: ['#4CAF50', '#FF6347'], // Green for solved, Red for unsolved
                borderColor: ['#388E3C', '#D32F2F'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        return `${tooltipItem.label}: ${tooltipItem.raw}`;
                    },
                },
            },
        },
    };

    return (
        <div className="flex flex-col items-center justify-center mt-6">
            <h3 className="text-xl font-bold mb-4">Task Completion</h3>
            <div className="w-64 h-64">
                <Pie data={data} options={options} />
            </div>
        </div>
    );
};

export default PieChart;
