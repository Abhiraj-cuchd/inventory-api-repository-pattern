import { Document, Model } from "mongoose";
import { BaseRepository } from "../../core/interfaces/repositories/base.repository.interface";

export abstract class BaseRepositoryImpl<T extends Document> implements BaseRepository<T> {
    protected model: Model<T>;
    constructor(model: Model<T>) {
        this.model = model;
    }

    async findAll(): Promise<T[]> {
        return await this.model.find().exec()
    }

    async findById(id:string): Promise<T | null> {
        return await this.model.findById(id).exec()
    }

    async create(item: Partial<T>): Promise<T> {
        return await this.model.create(item);
    }

    async update(id: string, item: Partial<T>): Promise<T | null> {
        return await this.model.findByIdAndUpdate(id, item, { new: true }).exec()
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.model.findByIdAndDelete(id).exec()
        return !!result;
    }
}