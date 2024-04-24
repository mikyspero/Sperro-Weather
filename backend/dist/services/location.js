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
exports.getCoordinates = void 0;
const coordinates_schema_1 = require("../models/coordinates-schema");
const webError_1 = require("../utils/webError");
const API_KEY = process.env.API_KEY || "5772d8c327100a7fd94c08a3add3606e";
const buildCityEndpoint = (cityName, stateCode, countryCode, limit) => {
    // Construct the base endpoint
    let endPoint = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}`;
    // Add optional parameters if they exist
    if (typeof stateCode !== "undefined") {
        endPoint += `,${stateCode}`;
    }
    if (typeof countryCode !== "undefined") {
        endPoint += `,${countryCode}`;
    }
    if (typeof limit !== "undefined") {
        endPoint += `&limit=${limit}`;
    }
    // Add API key to the endpoint
    endPoint += `&appid=${API_KEY}&units=metric`;
    return endPoint;
};
const fetchCoordinates = (cityName, stateCode, countryCode, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(buildCityEndpoint(cityName, stateCode, countryCode, limit)); // Send request to Geocoding API
    if (!response.ok) {
        throw (0, webError_1.newError)("Failed to fetch location data", 500); // Throw an error if response status is not OK
    }
    const coordinates = yield response.json(); // Extract JSON data from the response
    return { latitude: coordinates[0].lat, longitude: coordinates[0].lon };
});
const validateCoordinates = (toBeValidated) => {
    if (!coordinates_schema_1.coordinatesSchema.safeParse(toBeValidated)) {
        throw (0, webError_1.newError)("error fetching coordinates", 500);
    }
    return toBeValidated;
};
const getCoordinates = (cityName, stateCode, countryCode, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const coordinates = yield fetchCoordinates(cityName, stateCode, countryCode, limit);
    return validateCoordinates(coordinates);
});
exports.getCoordinates = getCoordinates;
