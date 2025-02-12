'use client';
import { useState, useEffect } from "react";
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { Input } from '@/components/ui/input';
import { fetchSuggestions, fetchWeatherData, reverseGeocode } from "./lib/weather";
import { TodayDate } from "./lib/utils";
import { TempToggle } from "@/components/layout/temperature-toggle";
import 'leaflet/dist/leaflet.css';
import CityMap from "@/components/layout/city-map";


export default function Home() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState({ lat: null, lon: null })
  const [city, setCity] = useState('')

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      setCoords({ lat, lon })
      searchWeather(`${lat},${lon}`);
      const userCityData = await reverseGeocode(lat, lon);
      const userCity = userCityData?.address?.city || userCityData?.display_name || "";
      setCity(userCity)
    });
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    const delayDebounceFn = setTimeout(async () => {
      const data = await fetchSuggestions(query);
      setSuggestions(data);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const searchWeather = async (query) => {
    try {
      setLoading(true);
      const weather = await fetchWeatherData(query);
      setWeatherData(weather);
      if (weather?.location) {
        setCoords({ lat: weather.location.lat, lon: weather.location.lon });
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      await searchWeather(query);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = async (cityName) => {
    setQuery(cityName);
    setSuggestions([]);
    await searchWeather(cityName);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <div className="flex justify-between w-full max-w-2xl">
        <TodayDate />
        <div className="flex space-x-3">
          <ThemeToggle />
          <TempToggle />
        </div>
      </div>
      <div className="relative w-full max-w-2xl">
        <Input
          type="text"
          placeholder="Enter city name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full py-4 border border-gray-700 rounded-md focus:outline-none focus:ring-2"
        />
        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 right-0 mt-1 shadow rounded z-10">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="cursor-pointer px-4 py-2 border dark:hover:bg-gray-900 hover:bg-gray-200"
                onClick={() => handleSuggestionClick(suggestion.name)}
              >
                {suggestion.name}, {suggestion.region}, {suggestion.country}
              </li>
            ))}
          </ul>
        )}
      </div>

      {loading && <p>Loading...</p>}

      {weatherData && (
        <div className="flex w-full">

          <div className="mt-4 p-4 border border-gray-300 rounded w-full max-w-2xl">
            <div className="flex justify-between h-full">
              <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold">{weatherData.location.name}</h2>
                <span className="text-lg">{weatherData.location.country}</span>
              </div>
              <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold">{weatherData.current.temp_c}°C</h2>
                <span className="text-lg">Temperature</span>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-2xl font-bold">{weatherData.current.humidity}%</p>
                <span className="text-lg">Humidity</span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src={weatherData.current.condition.icon}
                  className="w-16 h-16"
                  alt="Weather Icon"
                />
              </div>
            </div>
          </div>
        </div>

      )}

      {city && (
        <div>
          <CityMap lat={coords.lat} lon={coords.lon} city={city} />
        </div>

      )}

    </div>
  );
}
