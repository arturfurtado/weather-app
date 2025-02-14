'use client';
import { useEffect, useRef } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ForecastChart({ forecastData }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!forecastData || forecastData.length === 0) return;

    const data = forecastData.map(day => ({
      date: new Date(day.date),
      avgTemp: day.day.avgtemp_c,
    }));

    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 40, bottom: 40, left: 50 };

    const dates = data.map(d => d.date.getTime());
    const minDate = Math.min(...dates);
    const maxDate = Math.max(...dates);
    const temps = data.map(d => d.avgTemp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);

    const xScale = date => {
      return margin.left + ((date.getTime() - minDate) / (maxDate - minDate)) * (width - margin.left - margin.right);
    };
    const yScale = temp => {
      return height - margin.bottom - ((temp - minTemp) / (maxTemp - minTemp)) * (height - margin.top - margin.bottom);
    };

    let pathData = '';
    data.forEach((d, i) => {
      const x = xScale(d.date);
      const y = yScale(d.avgTemp);
      pathData += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
    });

    const numXTicks = 5;
    const numYTicks = 5;
    const xTicks = [];
    for (let i = 0; i <= numXTicks; i++) {
      const time = minDate + (i * (maxDate - minDate)) / numXTicks;
      xTicks.push(new Date(time));
    }
    const yTicks = [];
    for (let i = 0; i <= numYTicks; i++) {
      const temp = minTemp + (i * (maxTemp - minTemp)) / numYTicks;
      yTicks.push(temp);
    }

    let svgContent = '';

    xTicks.forEach(tick => {
      const x = xScale(tick);
      svgContent += `<line x1="${x}" y1="${height - margin.bottom}" x2="${x}" y2="${margin.top}" stroke="#e0e0e0" stroke-dasharray="4" />`;
      const dateStr = tick.toLocaleDateString();
      svgContent += `<text x="${x}" y="${height - margin.bottom + 15}" text-anchor="middle" font-size="10" fill="#555">${dateStr}</text>`;
    });

    yTicks.forEach(tick => {
      const y = yScale(tick);
      svgContent += `<line x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}" stroke="#e0e0e0" stroke-dasharray="4" />`;
      svgContent += `<text x="${margin.left - 5}" y="${y + 3}" text-anchor="end" font-size="10" fill="#555">${tick.toFixed(1)}</text>`;
    });

    svgContent += `<line x1="${margin.left}" y1="${height - margin.bottom}" x2="${width - margin.right}" y2="${height - margin.bottom}" stroke="#333" />`;
    svgContent += `<line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${height - margin.bottom}" stroke="#333" />`;

    svgContent += `<path d="${pathData}" fill="none" stroke="steelblue" stroke-width="2" />`;

    svgContent += `
      <g class="legend">
        <rect x="${width - margin.right - 100}" y="${margin.top}" width="90" height="30" fill="white" stroke="#ccc" rx="4" />
        <line x1="${width - margin.right - 90}" y1="${margin.top + 15}" x2="${width - margin.right - 70}" y2="${margin.top + 15}" stroke="steelblue" stroke-width="2" />
        <text x="${width - margin.right - 65}" y="${margin.top + 19}" font-size="10" fill="#333">Avg Temp (°C)</text>
      </g>
    `;

    const svg = svgRef.current;
    if (svg) {
      svg.innerHTML = svgContent;
    }
  }, [forecastData]);

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Forecast Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <svg ref={svgRef} width="500" height="300" className="w-full h-auto" />
      </CardContent>
    </Card>
  );
}
