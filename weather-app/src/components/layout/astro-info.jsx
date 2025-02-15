'use client';

import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Moon, SunMoon, Sunrise, Sunset } from 'lucide-react';

export default function AstronomicalInfo({ forecastData }) {
  if (!forecastData || forecastData.length === 0) return null;

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Astronomical Info</CardTitle>
      </CardHeader>
      <CardContent className='h-[300px] overflow-y-auto'>
        <div className="space-y-4">
          {forecastData.map(day => (
            <div
              key={day.date}
              className="flex flex-col sm:flex-row items-center justify-between border p-4 rounded shadow-sm"
            >
              <div className="font-bold text-lg">
                {new Date(day.date).toLocaleDateString()}
              </div>
              <div className="flex flex-wrap gap-6 mt-2 sm:mt-0">
                <div className="flex items-center gap-2">
                  <Sunrise size={28} className="text-yellow-500" />
                  <div>
                    <div className="text-xs text-gray-500">Sunrise</div>
                    <div className="font-medium">{day.astro.sunrise}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Sunset size={28} className="text-orange-500" />
                  <div>
                    <div className="text-xs text-gray-500">Sunset</div>
                    <div className="font-medium">{day.astro.sunset}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Moon size={28} className="text-purple-500" />
                  <div>
                    <div className="text-xs text-gray-500">Moonrise</div>
                    <div className="font-medium">{day.astro.moonrise}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <SunMoon size={28} className="text-indigo-500" />
                  <div>
                    <div className="text-xs text-gray-500">Moonset</div>
                    <div className="font-medium">{day.astro.moonset}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
