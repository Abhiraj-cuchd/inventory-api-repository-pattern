import { Request, Response, NextFunction } from "express";
import { AppError } from "../core/errors/app.error";
import logger from "../config/logger";

export class ErrorMiddleware {
    static handleErrors(err: Error, req: Request, res: Response, next: NextFunction) {
        if(err instanceof AppError) {
            return res.status(err.statusCode).json({
                status: 'error',
                message: err.message
            });
        }
        logger.error(`Unhandled Error: ${err.message}`);
        return res.status(500).json(
            {
                status: 'error',
                message: 'Internal server error'
            }
        )
    }
}