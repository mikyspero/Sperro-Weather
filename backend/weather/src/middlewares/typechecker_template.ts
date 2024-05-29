import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { validate } from "../validation/validate_schema";

const validateRequestObject = <T>(
    schema: z.Schema<T>,
    buildObject: (req: Request) => T
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const obj = buildObject(req);
            const validatedObj = validate(schema)(obj);
            next();
        } catch (error) {
            next(error);
        }
    };
};


export {validateRequestObject}