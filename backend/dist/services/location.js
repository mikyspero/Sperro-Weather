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
// Define the API key for the OpenWeatherMap API
const API_KEY = "5772d8c327100a7fd94c08a3add3606e";
// Function to build the endpoint URL for city coordinates lookup
const buildCityEndpoint = (cityName, stateCode, countryCode, limit) => {
    // Construct the base endpoint URL
    let endPoint = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}`;
    // Add state code if provided
    if (typeof stateCode !== "undefined") {
        endPoint += `,${stateCode}`;
    }
    // Add country code if provided
    if (typeof countryCode !== "undefined") {
        endPoint += `,${countryCode}`;
    }
    // Add limit if provided
    if (typeof limit !== "undefined") {
        endPoint += `&limit=${limit}`;
    }
    // Add API key and units to the endpoint URL
    endPoint += `&appid=${API_KEY}&units=metric`;
    // Return the complete endpoint URL
    return endPoint;
};
// Function to fetch city coordinates from the OpenWeatherMap API
const fetchCoordinates = (cityName, stateCode, countryCode, limit) => __awaiter(void 0, void 0, void 0, function* () {
    // Construct the endpoint URL
    const response = yield fetch(buildCityEndpoint(cityName, stateCode, countryCode, limit));
    // Check if the HTTP response is successful
    if (!response.ok) {
        throw (0, webError_1.newError)("Failed to fetch location data", 500); // Throw an error if response status is not OK
    }
    // Parse the JSON response to extract coordinates
    const coordinates = yield response.json();
    // Return the extracted coordinates as a Coordinates object
    return { latitude: coordinates[0].lat, longitude: coordinates[0].lon };
});
// Function to validate the retrieved coordinates against a schema
const validateCoordinates = (toBeValidated) => {
    // Validate the coordinates against a schema
    if (!coordinates_schema_1.coordinatesSchema.safeParse(toBeValidated)) {
        throw (0, webError_1.newError)("Error fetching coordinates", 500);
    }
    // If validation is successful, return the coordinates
    return toBeValidated;
};
// Main function to get validated coordinates for a given city
const getCoordinates = (cityName, stateCode, countryCode, limit) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch coordinates for the specified city
    const coordinates = yield fetchCoordinates(cityName, stateCode, countryCode, limit);
    // Validate the retrieved coordinates
    return validateCoordinates(coordinates);
});
exports.getCoordinates = getCoordinates;
