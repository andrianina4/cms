import { Request, Response, NextFunction } from "express";
import { ZodTypeAny, ZodError } from "zod";
import { sendError } from "../utils/response";

export const validate = (schema: ZodTypeAny) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.body);
            return next();
        } catch (error) {
            if (error instanceof ZodError) {
                const zodErr = error as any;
                const errors = zodErr.errors.map((err: any) => ({
                    path: err.path.join("."),
                    message: err.message,
                }));
                return sendError(res, "Validation failed", 400, { errors });
            }
            return sendError(res, "Internal server error during validation", 500);
        }
    };
};

export const validateArray = (schema: ZodTypeAny) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!Array.isArray(req.body)) {
                return sendError(res, "Expected an array of items", 400);
            }

            // Valider chaque item de l'array
            for (const item of req.body) {
                await schema.parseAsync(item);
            }

            return next();
        } catch (error) {
            if (error instanceof ZodError) {
                const zodErr = error as any;
                const errors = zodErr.errors.map((err: any) => ({
                    path: err.path.join("."),
                    message: err.message,
                }));
                return sendError(res, "Validation failed in array", 400, { errors });
            }
            return sendError(res, "Internal server error during validation", 500);
        }
    };
};
