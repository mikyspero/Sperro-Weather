import { WebError, newError } from "./webError";
const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const getMonth = (monthCode: number) => {
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
  } else {
    throw newError("invalid month coding", 500); // Throw an error for invalid month code
  }
};

const getMonthOffset = (date: Date) => {
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

const day: number = 1000 * 3600 * 24;

export { getMonthOffset, getMonth, isLeapYear };
