"use client";
import { fetchWeatherData } from "@/app/lib/weather";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function WeatherDashboard({ defaultCity = "London" }) {
    const [city, setCity] = useState(defaultCity);
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const result = await fetchWeatherData(city);
            setData(result);
            setError("");
        } catch (err) {
            setError(err.message);
            setData(null);
        }
        setLoading(false);
    };
    console.log(data)

    return (
        <div className="mx-auto p-4 rounded ">
            <div className="flex items-center space-x-5">
                <Input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSearch();
                    }}
                    className="flex w-[24rem] py-4 border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 "
                />

                <Button onClick={handleSearch}>
                    Search
                </Button>
            </div>
            {loading && <p className="text-center text-gray-300">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {data && (
                <div className="text-center">
                    <h2 className="text-2xl">
                        {data.location.name}, {data.location.country}
                    </h2>
                    <div className="flex items-center justify-center space-x-4">
                        <img
                            src={data.current.condition.icon}
                            alt={data.current.condition.text}
                            className="w-16 h-16"
                        />
                        <div>
                            <p className="text-xl">
                                {data.current.temp_c} °C - {data.current.condition.text}
                            </p>
                            <p className="text-sm text-gray-400">
                                Last updated: {data.current.last_updated}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
