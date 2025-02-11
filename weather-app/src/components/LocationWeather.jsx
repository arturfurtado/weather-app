import React, { useState, useEffect } from 'react';
import HourlyChart from './HourlyChart';
import DailyForecast from './DailyForecast';
import { fetchWeatherByCoordinates } from '@/app/lib/weather';

export default function LocationWeather() {
  const [locationData, setLocationData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const data = await fetchWeatherByCoordinates(latitude, longitude);
          setLocationData(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Unable to retrieve your location");
        setLoading(false);
      }
    );
  }, []);

  if (loading) return <p>Loading your location's weather...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!locationData) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="mb-8 text-center">
        <h2 className="text-2xl mb-2">
          {locationData.current.name || 'Your Location'}
        </h2>
        <p className="text-xl">{locationData.current.main.temp} °C</p>
        <p className="capitalize">
          {locationData.current.weather[0].description}
        </p>
      </div>
      <div className="mb-8">
        <HourlyChart hourlyData={locationData.hourly} />
      </div>
      <div>
        <DailyForecast dailyData={locationData.daily} />
      </div>
    </div>
  );
}
