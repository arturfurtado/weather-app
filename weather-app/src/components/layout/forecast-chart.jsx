'use client';
import { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ForecastChart({ forecastData }) {
  const svgRef = useRef(null);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, value: null, date: '' });

  if (!forecastData || forecastData.length === 0) return null;

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

  const xScale = (date) =>
    margin.left +
    ((date.getTime() - minDate) / (maxDate - minDate)) *
      (width - margin.left - margin.right);
  const yScale = (temp) =>
    height - margin.bottom -
    ((temp - minTemp) / (maxTemp - minTemp)) *
      (height - margin.top - margin.bottom);

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

  const handleMouseEnter = (event, d) => {
    const svgRect = svgRef.current.getBoundingClientRect();
    setTooltip({
      visible: true,
      x: event.clientX - svgRect.left,
      y: event.clientY - svgRect.top,
      value: d.avgTemp,
      date: d.date.toLocaleDateString(),
    });
  };

  const handleMouseLeave = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  return (
    <Card className="w-full max-w-lg relative">
      <CardHeader>
        <CardTitle>Forecast Chart</CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <div className="relative">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-auto"
          >
            {xTicks.map((tick, index) => {
              const x = xScale(tick);
              return (
                <g key={`x-tick-${index}`}>
                  <line
                    x1={x}
                    y1={height - margin.bottom}
                    x2={x}
                    y2={margin.top}
                    stroke="#e0e0e0"
                    strokeDasharray="4"
                  />
                  <text
                    x={x}
                    y={height - margin.bottom + 15}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#555"
                  >
                    {tick.toLocaleDateString()}
                  </text>
                </g>
              );
            })}

            {yTicks.map((tick, index) => {
              const y = yScale(tick);
              return (
                <g key={`y-tick-${index}`}>
                  <line
                    x1={margin.left}
                    y1={y}
                    x2={width - margin.right}
                    y2={y}
                    stroke="#e0e0e0"
                    strokeDasharray="4"
                  />
                  <text
                    x={margin.left - 5}
                    y={y + 3}
                    textAnchor="end"
                    fontSize="10"
                    fill="#555"
                  >
                    {tick.toFixed(1)}
                  </text>
                </g>
              );
            })}

            <line
              x1={margin.left}
              y1={height - margin.bottom}
              x2={width - margin.right}
              y2={height - margin.bottom}
              stroke="#333"
            />
            <line
              x1={margin.left}
              y1={margin.top}
              x2={margin.left}
              y2={height - margin.bottom}
              stroke="#333"
            />

            <path d={pathData} fill="none" stroke="steelblue" strokeWidth="2" />

            {data.map((d, index) => {
              const x = xScale(d.date);
              const y = yScale(d.avgTemp);
              return (
                <circle
                  key={`data-point-${index}`}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="steelblue"
                  stroke="white"
                  strokeWidth="1"
                  onMouseEnter={(e) => handleMouseEnter(e, d)}
                  onMouseLeave={handleMouseLeave}
                />
              );
            })}

            <g className="legend">
              <rect
                x={width - margin.right - 100}
                y={margin.top}
                width="90"
                height="30"
                fill="white"
                stroke="#ccc"
                rx="4"
              />
              <line
                x1={width - margin.right - 90}
                y1={margin.top + 15}
                x2={width - margin.right - 70}
                y2={margin.top + 15}
                stroke="steelblue"
                strokeWidth="2"
              />
              <text
                x={width - margin.right - 65}
                y={margin.top + 19}
                fontSize="10"
                fill="#333"
              >
                Avg Temp (°C)
              </text>
            </g>
          </svg>
          {tooltip.visible && (
            <div
              className="absolute bg-white border border-gray-300 text-xs p-1 rounded shadow"
              style={{ left: tooltip.x, top: tooltip.y - 40 }}
            >
              <div>{tooltip.date}</div>
              <div>{tooltip.value} °C</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
