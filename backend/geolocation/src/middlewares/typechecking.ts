import {validateRequestObject} from "./typechecker_template";
import { citySchema } from "../models/city_schema";
import { buildCityObject, buildPointObject } from "../utils/request_builders";
import { City } from "../types/city";

const checkCity = validateRequestObject<City>(citySchema, buildCityObject);

export {checkCity };
