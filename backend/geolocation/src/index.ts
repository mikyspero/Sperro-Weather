// Load environment variables from a .env file into process.env
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
// Import the Express framework
import express from "express";
// Import CORS for enabling Cross-Origin Resource Sharing
import cors from "cors";
import { cityRouter } from "./routes/city_routes";
import { errorHandler } from "./middlewares/error_handling";
import { dailyRateLimit, minuteRateLimit } from "./middlewares/limiters";
import { PORT as port} from "./configs/imported_variables";
// Define the port number to listen on, using the PORT environment variable if available,
// or default to 3000
//console.log(process.env); // Check all loaded environment variables
const app = express();
//Middleware to disable the "X-Powered-By" header
app.disable("x-powered-by");
// Middleware to parse JSON request bodies
app.use(express.json());
//block every non GET request
app.use(cors({ methods: ["GET"] }));
// Middleware to limit the requests from the same ip
app.use(minuteRateLimit);
app.use(dailyRateLimit);
app.use("/city", cityRouter);
//middleware to Send an appropriate error response to the client
app.use(errorHandler);
// Start the Express server and listen for incoming requests on the specified port
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
