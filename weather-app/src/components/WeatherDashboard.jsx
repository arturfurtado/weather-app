import React, { useState, useEffect } from 'react';
import HourlyChart from './HourlyChart';
import DailyForecast from './DailyForecast';
import { fetchFullWeatherData } from '@/app/lib/weather';

export default function WeatherDashboard({ initialCity }) {
  const [city, setCity] = useState(initialCity);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!city) return;
    setLoading(true);
    setError(null);
    fetchFullWeatherData(city)
      .then((data) => setWeatherData(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [city]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-4xl mb-4">Weather Dashboard</h1>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 rounded text-black"
        />
      </div>
      {loading && <p>Loading weather data...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {weatherData && (
        <>
          <div className="mb-8 text-center">
            <h2 className="text-2xl mb-2">
              {weatherData.current.name || city}
            </h2>
            <p className="text-xl">{weatherData.current.main.temp} °C</p>
            <p className="capitalize">
              {weatherData.current.weather[0].description}
            </p>
          </div>
          <div className="mb-8">
            <HourlyChart hourlyData={weatherData.hourly} />
          </div>
          <div>
            <DailyForecast dailyData={weatherData.daily} />
          </div>
        </>
      )}
    </div>
  );
}
