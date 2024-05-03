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
const geolocation_api_1 = require("../api/geolocation_api");
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
    const coordinates = yield (0, geolocation_api_1.fetchCoordinates)(cityName, stateCode, countryCode, limit);
    // Validate the retrieved coordinates
    return validateCoordinates(coordinates);
});
exports.getCoordinates = getCoordinates;
