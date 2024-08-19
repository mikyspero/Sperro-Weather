const PORT: number = parseInt(process.env.PORT as string)||3002;
const WEATHER_PORT = parseInt(process.env.WEATHER_PORT as string)||3000;
const GEOLOCATION_PORT = parseInt(process.env.GEOLOCATION_PORT as string)||3001;
export { PORT,WEATHER_PORT,GEOLOCATION_PORT};
