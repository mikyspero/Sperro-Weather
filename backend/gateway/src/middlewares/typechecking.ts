import {validateRequestObject} from "./typechecker_template";
import { citySchema } from "../models/city_schema";
import { buildCityObject, buildPointObject } from "../utils/request_builders";
import { City } from "../types/city";
import {Point} from "../types/point";
import {pointSchema} from "../models/point_schema";

const checkCity = validateRequestObject<City>(citySchema, buildCityObject);
const checkCoordinates = validateRequestObject<Point>(pointSchema, buildPointObject);

export {checkCity };