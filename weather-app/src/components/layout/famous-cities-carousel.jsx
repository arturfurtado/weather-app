'use client';
import { useState, useEffect } from 'react';
import { fetchWeatherData } from '@/app/lib/weather';
import { FamousCities } from '@/app/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export default function FamousCitiesCarousel() {
  const [citiesWeather, setCitiesWeather] = useState([]);

  useEffect(() => {
    async function fetchAllCitiesWeather() {
      try {
        const results = await Promise.all(
          FamousCities.map(async (city) => {
            try {
              const data = await fetchWeatherData(city);
              return { city, data };
            } catch (err) {
              console.error(`Error fetching weather for ${city}:`, err);
              return { city, data: null };
            }
          })
        );
        setCitiesWeather(results);
      } catch (err) {
        console.error('Error fetching weather data for famous cities:', err);
      }
    }
    fetchAllCitiesWeather();
  }, []);

  return (
    <div className="py-4 w-full max-w-screen mt-24">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Famous Cities Weather
      </h2>
      <ScrollArea className="max-w-screen">
        <div className="flex space-x-4">
          {citiesWeather.map(({ city, data }, idx) => (
            <Card key={idx} className="min-w-[12rem]">
              <CardHeader>
                <CardTitle>{city}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                {data && data.current ? (
                  <>
                    <p className="text-lg font-bold">
                      {data.current.temp_c}°C
                    </p>
                    <img
                      src={data.current.condition.icon}
                      alt={data.current.condition.text}
                      className="w-12 h-12 my-2"
                    />
                    <CardDescription>
                      {data.current.condition.text}
                    </CardDescription>
                  </>
                ) : (
                  <p className="text-sm">Loading...</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
