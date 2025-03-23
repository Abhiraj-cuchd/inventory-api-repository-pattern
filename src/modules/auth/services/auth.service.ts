import { AuthServiceInterface } from "../interfaces/auth.service.interface";
import { UserRepositoryInterface } from "../interfaces/user.repository.interface";
import { IUser } from "../../../core/entities/user.entity";
import { AppError } from "../../../core/errors/app.error";
import { RegisterUserDto, LoginUserDto } from "../dtos/auth.dto";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import config from '../../../config/config';

export class AuthService implements AuthServiceInterface {
    private userRepository: UserRepositoryInterface;
    constructor(userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository;
    }
    async register(userData: RegisterUserDto): Promise<IUser> {
        const existingUser = await this.userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new AppError('Email already exists', 400);
        }
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = await this.userRepository.create({ ...userData, password: hashedPassword });
        return user;
    }
    async login(credentials: LoginUserDto): Promise<{ user: IUser, token: string }> {
        const user = await this.validateUser(credentials.email, credentials.password);
        if (!user) {
            throw new AppError('Invalid credentials', 401);
        }
        const token = this.generateToken(user);
        return { user, token };
    }

    async validateUser(email: string, password: string): Promise<IUser | null> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            return null;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return null;
        }
        return user;
    }

    private generateToken(user: IUser): string {
        const payload = {
            id: user._id,
            email: user.email,
            role: user.role
        };

        // @ts-ignore
        return jwt.sign(payload, config.jwtSecret ?? 'default-secret-key', { expiresIn: config.jwtExpiresIn });
    }
}