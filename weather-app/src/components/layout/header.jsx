import { TodayDate } from "@/app/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { TempToggle } from "./temperature-toggle";
import { useState, useEffect } from "react";
import { fetchSuggestions } from "@/app/lib/weather";
import { Input } from "../ui/input";

export default function Header({ query, setQuery, searchWeather }) {
  const [suggestions, setSuggestions] = useState([]);

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

  return (
    <>
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
    </>
  );
}
