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
const geolocation_api_1 = require("../api/geolocation_api");
const point_validation_1 = require("../validation/point-validation");
// Main function to get validated coordinates for a given city
const getCoordinates = (city) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch coordinates for the specified city
    const coordinates = yield (0, geolocation_api_1.fetchCoordinates)(city);
    // Validate the retrieved coordinates
    return (0, point_validation_1.validateCoordinates)(coordinates);
});
exports.getCoordinates = getCoordinates;
