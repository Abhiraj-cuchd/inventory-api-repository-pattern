export interface RegisterUserDto {
    username: string;
    email: string;
    password: string;
    role?: string;
}

export interface LoginUserDto {
    email: string;
    password: string;
}