"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newError = exports.WebError = void 0;
class WebError extends Error {
    constructor(errorMessage, errorCode) {
        super(errorMessage);
        this.status = errorCode;
    }
}
exports.WebError = WebError;
const newError = (errorMessage, errorCode) => new WebError(errorMessage, errorCode);
exports.newError = newError;
