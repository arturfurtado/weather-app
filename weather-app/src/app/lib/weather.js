export async function fetchWeatherData(city) {
  const API_KEY = process.env.NEXT_PUBLIC_WEATHERAPI_KEY;
  const res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=no`
  );
  if (!res.ok) {
    const errorData = await res.json();
    console.error("API Error:", errorData);
    throw new Error(errorData.error?.message || "Failed to fetch weather data");
  }
  return res.json();
}

export async function fetchSuggestions(q) {
  const API_KEY = process.env.NEXT_PUBLIC_WEATHERAPI_KEY;
  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${q}`
    );
    const data = await res.json();
    return data; 
  } catch (error) {
    console.error("Error fetching suggestions: ", error);
    return [];
  }
}

export async function reverseGeocode(lat, lon){
  const API_LOCATION = process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY;
  try {
    const res =  await fetch(
      `https://us1.locationiq.com/v1/reverse?key=${API_LOCATION}&lat=${lat}&lon=${lon}&format=json`
    );
    const data = await res.json();
    return data;
  }
  catch (error) {
    console.error("Error while Reverse Geocoding", error)
    return [];
  }
}