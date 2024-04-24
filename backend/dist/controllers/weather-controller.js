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
exports.weatherFunctionHandler = void 0;
const coordinates_schema_1 = require("../models/coordinates-schema");
const weatherFunctionHandler = (req, res, next, weatherFunction) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate query parameters against the schema
        const latitude = parseFloat(req.query.latitude); // Extract latitude as a number
        const longitude = parseFloat(req.query.longitude); // Extract longitude as a number
        // Parse the extracted values using coordinatesSchema.parse
        const coord = coordinates_schema_1.coordinatesSchema.parse({ latitude, longitude });
        const weatherData = yield weatherFunction(coord.latitude, coord.longitude);
        res.status(200).json(weatherData); // Send processed weather data as JSON response
    }
    catch (error) {
        next(error); // Pass any error to the error handling middleware
    }
});
exports.weatherFunctionHandler = weatherFunctionHandler;
