import { Request as ExpressRequest, Response, NextFunction } from 'express';

interface Request extends ExpressRequest {
    user?: any;
}
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { AppError } from "../core/errors/app.error";

export class AuthMiddleware {
    static authenticate(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                throw new AppError('Authentication Token not Provided', 401);
            }

            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, config.jwtSecret!) as any;
            req.user = decoded;
            next();
        } catch (e: Error | any) {
            if (e.name === 'TokenExpiredError') {
                next(new AppError('Authentication Token Expired', 401));
            } else if (e.name === 'JsonWebTokenError') {
                next(new AppError('Invalid Authentication Token', 401));
            } else {
                next(e);
            }
        }
    }

    static authorize(roles: string[]) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                if(!req.user) {
                    throw new AppError('Unauthorized', 401);
                }

                if(!roles.includes(req.user.role)) {
                    throw new AppError('Unauthorized access', 403);
                }
                next();
            } catch (e: Error | any) {
                next(e)
            }
        }
    }
}

