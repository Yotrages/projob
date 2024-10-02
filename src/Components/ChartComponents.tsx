import React, { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const jsonData = {
  labels: ["Consolidated", "Stable", "Local", "Industry", "Laggers"],
  datasets: [
    {
      label: "Risk Level",
      data: [6.6, 6.3, 5.8, 5.2, 4.8],
      riskDescriptions: [
        "Maturity at risk due to slow growth.",
        "Situation facing economic pressures.",
        "Competitors gaining market share.",
        "Innovation risk is moderate.",
        "Revenue is performing well.",
      ],
    },
  ],
};

const ChartComponent: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData<'bar'>>();
  const chartRef = useRef<any>(null); 

  useEffect(() => {
    
    setTimeout(() => {
      setChartData({
        labels: jsonData.labels,
        datasets: [
          {
            label: jsonData.datasets[0].label,
            data: jsonData.datasets[0].data,
            backgroundColor: [
              '#ff6b6b', 
              '#ffdd59', 
              '#34e89e',
              '#ffa500', 
              '#00bfff', 
            ],
            borderColor: [
              '#ff1a1a', '#ffaa00', '#0f3443', '#0f3443', '#0f3443',
            ],
            borderWidth: 1,
            borderRadius: 10,
            barThickness: 20,
            categoryPercentage: 0.8,
            barPercentage: 0.7,
            hoverBorderWidth: 3,
          },
        ],
      });
    }, 1000); 
  }, []);

  
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const handleHover = (event: MouseEvent) => {
      const points = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);
      const canvas = chart.canvas;

      if (points.length > 0) {
        canvas.style.cursor = 'pointer';
      } else {
        canvas.style.cursor = 'default';
      }
    };

    
    const canvas = chart.canvas;
    canvas.addEventListener('mousemove', handleHover);


    return () => {
      canvas.removeEventListener('mousemove', handleHover);
    };
  }, [chartRef]);

  if (!chartData) {
    return <p>Loading chart...</p>;
  }

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Risk Evaluation Dashboard' },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw as number;
            const index = context.dataIndex;
            const description = jsonData.datasets[0].riskDescriptions[index];
            return `Risk Level: ${value}\nDescription: ${description}`;
          },
        },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 14 } } },
      y: { beginAtZero: true, max: 7, ticks: { stepSize: 1 } },
    },
  };

  return (
    <div className="w-full max-w-6xl p-4 mx-auto">
      <div style={{ height: '500px' }}>
        <Bar ref={chartRef} data={chartData} options={options} />
      </div>

    
      <div className="flex justify-between mt-2">
        {jsonData.labels.map((label, index) => (
          <div key={index} className="text-center w-1/5">
            <span>{label}</span>
          </div>
        ))}
      </div>

      
      <div className="flex justify-center mt-4">
        <div className="ml-8 flex flex-col justify-center">
          <div className="text-lg font-bold mb-4">Risk Levels</div>
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 bg-red-400 mr-2"></div>
            <span>High Risk</span>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 bg-yellow-400 mr-2"></div>
            <span>Medium Risk</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-teal-400 mr-2"></div>
            <span>Low Risk</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;
