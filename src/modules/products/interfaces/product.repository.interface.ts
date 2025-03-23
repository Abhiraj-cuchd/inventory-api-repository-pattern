import { BaseRepository } from '../../../core/interfaces/repositories/base.repository.interface';
import { IProduct } from '../../../core/entities/product.entity';

export interface ProductRepositoryInterface extends BaseRepository<IProduct> {
    findBySku(sku: string): Promise<IProduct | null>;
}