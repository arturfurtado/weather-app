
export async function fetchCurrentWeather(city) {
    const API_KEY = process.env.NEXT_PUBLIC_WEATHERAPI_KEY;
    const res = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch current weather data");
    }
    return res.json();
  }
  
  export async function fetchOneCallData(lat, lon) {
    const API_KEY = process.env.NEXT_PUBLIC_WEATHERAPI_KEY;
    const res = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
    );
    if (!res.ok) {
      console.log(res)
      throw new Error("Failed to fetch forecast data");
    }
    return res.json();
  }
  
