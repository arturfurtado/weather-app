'use client'

import WeatherCard from "@/components/WeatherCards";
import { useState } from "react";

export default function Home() {
  const [city, setCity] = useState("London");

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl mb-4">Weather App</h1>
      <div className="mb-6">
        <input
          type="text"
          className="p-2 rounded text-black"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <WeatherCard city={city} />
    </div>
  );
}
