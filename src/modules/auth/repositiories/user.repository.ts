import { UserRepositoryInterface } from "../interfaces/user.repository.interface";
import { IUser } from "../../../core/entities/user.entity";
import { BaseRepositoryImpl } from "../../../infrastructure/repositories/base.repository";
import { UserModel } from "../../../infrastructure/database/models/user.model";

export class UserRepository extends BaseRepositoryImpl<IUser> implements UserRepositoryInterface {
    constructor() {
        super(UserModel);
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return this.model.findOne({ email }).exec();
    }

}