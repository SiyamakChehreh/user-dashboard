export const WEATHER_API_BASE = "https://api.open-meteo.com/v1/forecast";

export const buildWeatherUrl = (coords: { lat: number; lon: number }) =>
  `${WEATHER_API_BASE}?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`;
