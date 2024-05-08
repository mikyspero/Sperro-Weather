"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Load environment variables from a .env file into process.env
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from .env file
// Import the Express framework
const express_1 = __importDefault(require("express"));
// Import CORS for enabling Cross-Origin Resource Sharing
const cors_1 = __importDefault(require("cors"));
const coordinate_routes_1 = require("./routes/coordinate-routes");
const city_routes_1 = require("./routes/city-routes");
const error_handling_1 = require("./middlewares/error-handling");
const limiters_1 = require("./middlewares/limiters");
const imported_variables_1 = require("./configs/imported_variables");
// Define the port number to listen on, using the PORT environment variable if available,
// or default to 3000
//console.log(process.env); // Check all loaded environment variables
const app = (0, express_1.default)();
//Middleware to disable the "X-Powered-By" header
app.disable("x-powered-by");
// Middleware to parse JSON request bodies
app.use(express_1.default.json());
//block every non GET request
app.use((0, cors_1.default)({ methods: ["GET"] }));
// Middleware to limit the requests from the same ip
app.use(limiters_1.minuteRateLimit);
app.use(limiters_1.dailyRateLimit);
app.use("/weather", coordinate_routes_1.weatherRouter);
app.use("/city", city_routes_1.cityRouter);
//middleware to Send an appropriate error response to the client
app.use(error_handling_1.errorHandler);
// Start the Express server and listen for incoming requests on the specified port
app.listen(imported_variables_1.PORT, () => {
    console.log(`listening on port ${imported_variables_1.PORT}`);
});
