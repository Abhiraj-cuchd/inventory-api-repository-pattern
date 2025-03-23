import { BaseRepository } from "../../../core/interfaces/repositories/base.repository.interface";
import { IUser } from "../../../core/entities/user.entity";

export interface UserRepositoryInterface extends BaseRepository<IUser> {
    findByEmail(email: string): Promise<IUser | null>;
}
