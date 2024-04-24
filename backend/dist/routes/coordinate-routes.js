"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.weatherRouter = void 0;
const express_1 = require("express");
const weatherFunctions_1 = require("../services/weatherFunctions"); // Import your weather functions
const weather_controller_1 = require("../controllers/weather-controller"); // Import the generic weather function handler
const weatherRouter = (0, express_1.Router)();
exports.weatherRouter = weatherRouter;
// Route for current weather
weatherRouter.get("/current", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, weather_controller_1.weatherFunctionHandler)(req, res, next, weatherFunctions_1.getCurrentWeather);
}));
// Route for hourly weather
weatherRouter.get("/hourly", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, weather_controller_1.weatherFunctionHandler)(req, res, next, weatherFunctions_1.getHourlyWeather);
}));
// Route for daily weather
weatherRouter.get("/daily", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, weather_controller_1.weatherFunctionHandler)(req, res, next, weatherFunctions_1.getDailyWeather);
}));
