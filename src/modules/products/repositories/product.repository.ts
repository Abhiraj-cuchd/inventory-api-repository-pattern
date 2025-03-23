import { IProduct } from "../../../core/entities/product.entity";
import { BaseRepositoryImpl } from "../../../infrastructure/repositories/base.repository";
import { ProductModel } from "../../../infrastructure/database/models/product.model";
import {ProductRepositoryInterface} from "../interfaces/product.repository.interface";

export class ProductRepository extends BaseRepositoryImpl<IProduct> implements ProductRepositoryInterface {
    constructor() {
        super(ProductModel);
    }

    async findBySku(sku: string): Promise<IProduct | null> {
        return this.model.findOne({ sku }).exec();
    }
}