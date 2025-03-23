import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { UserRepository } from "../repositiories/user.repository";

export class AuthRouter {
    public router: Router = Router();
    private authController: AuthController;

    constructor() {
        this.router = Router();
        const userRepository = new UserRepository();
        const authService = new AuthService(userRepository);
        this.authController = new AuthController(authService);
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/register', this.authController.register.bind(this.authController));
        this.router.post('/login', this.authController.login.bind(this.authController));
    }

    public getRouter(): Router {
        return this.router;
    }
}