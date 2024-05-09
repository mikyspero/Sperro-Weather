"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weatherRouter = void 0;
const express_1 = require("express");
const weatherController_1 = require("../controllers/weatherController");
const weatherRouter = (0, express_1.Router)();
exports.weatherRouter = weatherRouter;
//mount middleware for coordinates validation
//weatherRouter.use(checkCoordinates);
// Route for current weather
//weatherRouter.get("/current", getCurrentWeatherHandler);
// Route for hourly weather
//weatherRouter.get("/hourly", getHourlyWeatherHandler);
// Route for daily weather
//weatherRouter.get("/daily", getDailyWeatherHandler);
// a single route now handles every weather case using parameter parsing
weatherRouter.get("/:weather", weatherController_1.getWeatherByParam);
