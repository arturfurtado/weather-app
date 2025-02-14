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
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

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

    const svg = svgRef.current;
    if (svg) {
      svg.innerHTML = `
        <path d="${pathData}" fill="none" stroke="steelblue" stroke-width="2" />
      `;
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
