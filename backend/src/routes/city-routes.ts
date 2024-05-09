import { Router } from "express";
import { realCityController } from "../controllers/city-handler";
import { checkCity } from "../middlewares/typechecking";

const cityRouter = Router();
//mount middleware for coordinates validation
cityRouter.use(checkCity);
//more will come...
cityRouter.get("/:weatherRoute", realCityController);

export { cityRouter };
