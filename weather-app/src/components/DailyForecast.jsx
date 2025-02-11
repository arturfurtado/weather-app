import React from 'react';

export default function DailyForecast({ dailyData }) {
  if (!dailyData) return null;

  const days = dailyData.slice(0, 7);

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {days.map((day, index) => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString(undefined, { weekday: 'short' });
        return (
          <div key={index} className="bg-gray-800 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{dayName}</h3>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
              className="w-16 h-16"
            />
            <p>
              {Math.round(day.temp.max)}°C / {Math.round(day.temp.min)}°C
            </p>
          </div>
        );
      })}
    </div>
  );
}
