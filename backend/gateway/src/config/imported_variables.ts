const PORT: number = parseInt(process.env.PORT as string);
const API_KEY = process.env.API_KEY;
const WEATHER_PORT = parseInt(process.env.WEATHER_PORT as string);
const GEOLOCATION_PORT = parseInt(process.env.GEOLOCATION_PORT as string);
export { PORT, API_KEY,WEATHER_PORT,GEOLOCATION_PORT};
