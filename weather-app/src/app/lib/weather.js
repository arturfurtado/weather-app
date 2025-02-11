export async function fetchWeather(city){
    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather/?q=${city}&appid=${API_KEY}&units=metric`
    );
    if(!response.ok) {
        throw new Error("Failed to fetch weather data");
    }
    return response.json();
}