import express from "express";
import cors  from "cors";
import { weatherRouter } from "./routes/coordinate-routes";
import { errorHandler } from "./middlewares/error-handling";
import { dailyRateLimit, minuteRateLimit } from "./middlewares/limiters";
import { checkCoordinates } from "./middlewares/typechecking";

import dotenv from "dotenv"; // Import dotenv
dotenv.config({ path: __dirname + "/.env" });
// Load environment variables from .env file
const port = process.env.PORT; // Use the PORT environment variable
//console.log(process.env); // Check all loaded environment variables

const app = express();
app.disable('x-powered-by')
app.use(express.json());
app.use(cors({ methods: ["GET"] }));

app.use(minuteRateLimit);
app.use(dailyRateLimit);
app.use(checkCoordinates);
app.use("/weather", weatherRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
