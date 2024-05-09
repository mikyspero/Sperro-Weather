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
// a single route now handles every weather case using parameter parsing
weatherRouter.get("/:weather", weatherController_1.getWeatherByParam);
