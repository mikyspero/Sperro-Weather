import { rateLimit } from 'express-rate-limit'

// Apply rate limiter middleware for total requests per day
const dailyRateLimit = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    max: 1000, // Limit to 1000 requests per day
    message: 'Daily request limit exceeded, please try again tomorrow.'
});

// Apply rate limiter middleware for requests from the same IP
const minuteRateLimit = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // Max requests per minute
    message: 'Too many requests from this IP, please try again later.'
})

export { dailyRateLimit, minuteRateLimit}