import { IUser } from "../../../core/entities/user.entity";

export interface AuthServiceInterface {
    register(userData: Partial<IUser>): Promise<IUser>;
    login(credentials: { email: string, password: string }): Promise<{ user: IUser, token: string }>;
    validateUser(email: string, password: string): Promise<IUser | null>;
}