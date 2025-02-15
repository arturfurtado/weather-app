'use client';
import { useState, useEffect } from "react";
import { fetchWeatherData, reverseGeocode } from "./lib/weather";
import WeatherCard from "@/components/layout/weather-card";
import Header from "@/components/layout/header";
import ForecastChart from "@/components/layout/forecast-chart";
import FamousCitiesCarousel from "@/components/layout/famous-cities-carousel";
import AstronomicalInfo from "@/components/layout/astro-info";

export default function Home() {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function searchWeather(query) {
    try {
      setLoading(true);
      const weather = await fetchWeatherData(query);
      setWeatherData(weather);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      searchWeather(`${lat},${lon}`);
      const userCityData = await reverseGeocode(lat, lon);
      const userCity = userCityData?.address?.city || userCityData?.display_name || "";
      setCity(userCity);
    });
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <Header query={query} setQuery={setQuery} searchWeather={searchWeather} />
      {loading && <p>Loading...</p>}
      {city && (
        <div className="flex w-full justify-around">
          <WeatherCard  
            name={weatherData?.location?.name}
            country={weatherData?.location?.country}
            temp={weatherData?.current?.temp_c}
            humidity={weatherData?.current?.humidity}
            feelsLike={weatherData?.current?.feelslike_c}
          />
          {weatherData?.forecast && weatherData.forecast.forecastday && (
            <ForecastChart forecastData={weatherData.forecast.forecastday} />
          )}
          <AstronomicalInfo forecastData={weatherData?.forecast?.forecastday} />
        </div>
      )}
      <FamousCitiesCarousel />
    </div>
  );
}
