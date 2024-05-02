"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLeapYear = exports.getMonth = exports.getMonthOffset = void 0;
const webError_1 = require("./webError");
const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};
exports.isLeapYear = isLeapYear;
const getMonth = (monthCode) => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    if (monthCode >= 0 && monthCode <= 11) {
        return months[monthCode];
    }
    else {
        throw (0, webError_1.newError)("invalid month coding", 500); // Throw an error for invalid month code
    }
};
exports.getMonth = getMonth;
const getMonthOffset = (date) => {
    const monthLengthArray = [
        31,
        isLeapYear(date.getFullYear()) ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
    ];
    return monthLengthArray[date.getMonth()];
};
exports.getMonthOffset = getMonthOffset;
const day = 1000 * 3600 * 24;
