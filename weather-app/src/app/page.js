'use client';
import { useState, useEffect, use } from "react";
import { fetchWeatherData, reverseGeocode } from "./lib/weather";
import CityMap from "@/components/layout/city-map";
import WeatherCard from "@/components/layout/weather-card";
import Header from "@/components/layout/header";
import ForecastChart from "@/components/layout/forecast-chart";
import FamousCitiesCarousel from "@/components/layout/famous-cities-carousel";

export default function Home() {
  const [query, setQuery] = useState('')
  const [coords, setCoords] = useState({ lat: null, lon: null })
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function searchWeather(query) {
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

  console.log(weatherData)

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <Header query={query} setQuery={setQuery} searchWeather={searchWeather} />
      {loading && <p>Loading...</p>}
      {city && (
        <div className="flex w-full items-start">
          <WeatherCard
            name={weatherData?.location?.name}
            country={weatherData?.location?.country}
            temp={weatherData?.current?.temp_c}
            humidity={weatherData?.current?.humidity}
            feelsLike={weatherData.current.feelslike_c}
          />
          {/* <CityMap lat={coords.lat} lon={coords.lon} city={city} /> */}
        </div>
      )}
      {weatherData?.forecast && weatherData.forecast.forecastday && (
          <ForecastChart forecastData={weatherData.forecast.forecastday} />
      )}
      <FamousCitiesCarousel />
    </div>
  );
}
