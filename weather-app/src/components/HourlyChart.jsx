import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function HourlyChart({ hourlyData }) {
  if (!hourlyData) return null;

  const data24 = hourlyData.slice(0, 24);

  const labels = data24.map((hour) => {
    const date = new Date(hour.dt * 1000);
    return `${date.getHours()}:00`;
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: data24.map((hour) => hour.temp),
        fill: false,
        borderColor: '#60A5FA',
        backgroundColor: '#60A5FA',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Hourly Temperature' },
    },
  };

  return <Line data={data} options={options} />;
}
