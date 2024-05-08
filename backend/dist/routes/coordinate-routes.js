"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weatherRouter = void 0;
const express_1 = require("express");
const weatherController_1 = require("../controllers/weatherController");
const typechecking_1 = require("../middlewares/typechecking");
const weatherRouter = (0, express_1.Router)();
exports.weatherRouter = weatherRouter;
//mount middleware for coordinates validation
weatherRouter.use(typechecking_1.checkCoordinates);
// Route for current weather
weatherRouter.get("/current", weatherController_1.getCurrentWeatherHandler);
// Route for hourly weather
weatherRouter.get("/hourly", weatherController_1.getHourlyWeatherHandler);
// Route for daily weather
weatherRouter.get("/daily", weatherController_1.getDailyWeatherHandler);
weatherRouter.get("/ass/:weather", weatherController_1.getWeatherByParam);
