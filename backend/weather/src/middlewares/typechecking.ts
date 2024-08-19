import { pointSchema } from "../models/point_schema";
import {buildPointObject } from "../utils/request_builders";
import { Point } from "../types/point";
import {validateRequestObject} from "./typechecker_template";

const checkCoordinates = validateRequestObject<Point>(pointSchema, buildPointObject);

export { checkCoordinates};
