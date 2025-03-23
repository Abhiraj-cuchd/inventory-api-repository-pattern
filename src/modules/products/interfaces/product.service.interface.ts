import { IProduct } from "../../../core/entities/product.entity";
import {BaseService} from "../../../core/interfaces/services/base.services.interface";

export interface ProductServiceInterface extends BaseService<IProduct> {
    findBySku(sku: string): Promise<IProduct | null>;
}