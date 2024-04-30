"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const coordinate_routes_1 = require("./routes/coordinate-routes");
const city_routes_1 = require("./routes/city-routes");
const error_handling_1 = require("./middlewares/error-handling");
const limiters_1 = require("./middlewares/limiters");
const dotenv_1 = __importDefault(require("dotenv")); // Import dotenv
dotenv_1.default.config({ path: __dirname + "/.env" });
// Load environment variables from .env file
const port = 3000 || process.env.PORT; // Use the PORT environment variable
//console.log(process.env); // Check all loaded environment variables
const app = (0, express_1.default)();
app.disable("x-powered-by");
app.use(express_1.default.json());
app.use((0, cors_1.default)({ methods: ["GET"] }));
app.use(limiters_1.minuteRateLimit);
app.use(limiters_1.dailyRateLimit);
app.use("/weather", coordinate_routes_1.weatherRouter);
app.use("/", city_routes_1.cityRouter);
app.use(error_handling_1.errorHandler);
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
