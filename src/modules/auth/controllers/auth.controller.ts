import { Request, Response, NextFunction } from 'express';
import { AuthServiceInterface } from '../interfaces/auth.service.interface';
import { RegisterUserDto, LoginUserDto } from '../dtos/auth.dto';

export class AuthController {
    private authService: AuthServiceInterface;
    constructor(authService: AuthServiceInterface) {
        this.authService = authService;
    }

    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const userData:RegisterUserDto = req.body;
            const user = await this.authService.register(userData);
            res.status(201).json({
                status: 'success',
                data: {
                    user
                }
            });
        } catch (e) {
            next(e)
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const credentials:LoginUserDto = req.body;
            const user = await this.authService.login(credentials);
            res.status(200).json({
                status: 'success',
                data: {
                    user
                }
            });
        } catch (e) {
            next(e)
        }
    }
}