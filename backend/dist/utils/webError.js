"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromZodToWeb = exports.newError = exports.WebError = void 0;
const http_status_1 = require("./http_status");
class WebError extends Error {
    constructor(errorMessage, errorCode) {
        super(errorMessage);
        this.status = errorCode;
    }
}
exports.WebError = WebError;
const newError = (errorMessage, errorCode) => new WebError(errorMessage, errorCode);
exports.newError = newError;
const fromZodToWeb = (error) => {
    const errorMessage = error.errors
        .map((error) => error.message)
        .join(", ");
    return (0, exports.newError)(errorMessage, http_status_1.HttpStatusCodes.INTERNAL_SERVER_ERROR);
};
exports.fromZodToWeb = fromZodToWeb;
