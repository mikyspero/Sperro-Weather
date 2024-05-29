import { Router } from "express";
import { cityController } from "../controllers/city_handler";
import { checkCity } from "../middlewares/typechecking";

const cityRouter = Router();
//mount middleware for coordinates validation
cityRouter.use(checkCity);
//more will come...
cityRouter.get("/:weatherRoute", cityController);

export { cityRouter };
