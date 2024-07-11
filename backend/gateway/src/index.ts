// Load environment variables from a .env file into process.env
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file
// Import the Express framework
import express from "express";
// Import CORS for enabling Cross-Origin Resource Sharing
import cors from "cors";
import {errorHandler} from "./middlewares/error_handling";
import {dailyRateLimit, minuteRateLimit} from "./middlewares/limiters";
import { ParsedQs } from 'qs';
import {PORT as port} from "./config/imported_variables";
import qs from "qs";

const CITY_SERVICE_URL = `http://localhost:3001/city`; // URL of the city microservice
const WEATHER_SERVICE_URL = 'http://localhost:3000/weather'; // URL of the weather microservice


// Define the port number to listen on, using the PORT environment variable if available,
// or default to 3000
//console.log(process.env); // Check all loaded environment variables
const app = express();
//Middleware to disable the "X-Powered-By" header
app.disable("x-powered-by");
// Middleware to parse JSON request bodies
app.use(express.json());
//block every non GET request
app.use(cors({methods: ["GET"]}));
// Middleware to limit the requests from the same ip
app.use(minuteRateLimit);
app.use(dailyRateLimit);


app.get('/city/:weatherRoute', async (req, res, next) => {
    try {
        const q = req.query;
        const queryString = qs.stringify(q);
        const url = `${CITY_SERVICE_URL}/${req.params.weatherRoute}?${queryString}`;
        console.log(url);

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        next(error);
    }
});


// Endpoint to fetch data from the weather microservice
app.get('/weather/:weather', async (req, res, next) => {
try {
    const q = req.query;
    const queryString = qs.stringify(q);
    const response = await fetch(`${WEATHER_SERVICE_URL}/${req.params.weather}?${queryString}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json(); // Use response.json() if the response is in JSON format
    res.send(data);
} catch (error) {
    next(error);
}
});
//middleware to Send an appropriate error response to the client
app.use(errorHandler);
// Start the Express server and listen for incoming requests on the specified port
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});