'use client'
import { useState } from 'react';
import WeatherDashboard from '../components/WeatherDashboard';
import LocationWeather from '../components/LocationWeather';

export default function Home() {
  const [useLocation, setUseLocation] = useState(false);

  return (
    <div>
      <div className="flex justify-center p-4">
        <button
          className={`px-4 py-2 mr-2 rounded ${!useLocation ? 'bg-blue-500' : 'bg-gray-700'}`}
          onClick={() => setUseLocation(false)}
        >
          Search City
        </button>
        <button
          className={`px-4 py-2 rounded ${useLocation ? 'bg-blue-500' : 'bg-gray-700'}`}
          onClick={() => setUseLocation(true)}
        >
          Use My Location
        </button>
      </div>
      {useLocation ? (
        <LocationWeather />
      ) : (
        <WeatherDashboard initialCity="London" />
      )}
    </div>
  );
}
