
export async function fetchCurrentWeather(city) {
    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch current weather data");
    }
    return res.json();
  }
  
  export async function fetchOneCallData(lat, lon) {
    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${API_KEY}&units=metric`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch forecast data");
    }
    return res.json();
  }
  
  export async function fetchFullWeatherData(city) {
    const currentData = await fetchCurrentWeather(city);
    const { coord: { lat, lon } } = currentData;
    const forecastData = await fetchOneCallData(lat, lon);
    return {
      current: currentData,
      hourly: forecastData.hourly,
      daily: forecastData.daily,
    };
  }
  
  export async function fetchWeatherByCoordinates(lat, lon) {
    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
    // Get current weather by coordinates
    const resCurrent = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    if (!resCurrent.ok) {
      throw new Error("Failed to fetch current weather data");
    }
    const currentData = await resCurrent.json();
  
    // Get forecast data
    const forecastData = await fetchOneCallData(lat, lon);
    
    return {
      current: currentData,
      hourly: forecastData.hourly,
      daily: forecastData.daily,
    };
  }
  