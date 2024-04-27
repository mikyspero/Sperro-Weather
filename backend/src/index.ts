import express, { Request, Response,NextFunction } from "express";
import { weatherRouter } from "./routes/coordinate-routes";
import { errorHandler } from "./middlewares/error-handling";
import { dailyRateLimit, minuteRateLimit } from "./middlewares/limiters";
//import { checkCoordinates } from "./middlewares/typechecking";
import { newError } from "./utils/webError";
import { coordinatesSchema } from "./models/coordinates-schema";
import { Coordinates } from "./types/coordinates";
import { checkCoordinates } from "./middlewares/typechecking";



const app = express();
const port = 3000;

app.use(express.json());
app.use(minuteRateLimit);
app.use(dailyRateLimit);
app.use(checkCoordinates);
app.use("/weather", weatherRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
