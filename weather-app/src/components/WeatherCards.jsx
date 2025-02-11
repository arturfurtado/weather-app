import { fetchWeather } from "@/app/lib/weather";
import { useState, useEffect } from "react";

export default function WeatherCard({ city }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    const getWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWeather(city);
        setWeather(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getWeather();
  }, [city]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!weather) return null;

  return (
    <div className="border border-white rounded p-6 shadow-md">
      <h2 className="text-2xl mb-2">{weather.name}</h2>
      <p className="capitalize">{weather.weather[0].description}</p>
      <p className="text-xl">{weather.main.temp} °C</p>
    </div>
  );
}
