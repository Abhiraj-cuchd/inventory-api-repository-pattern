import { BaseRepository } from "../../../core/interfaces/repositories/base.repository.interface";
import { IStock } from "../../../core/entities/stock.entity";

export interface StockRepositoryInterface extends BaseRepository<IStock> {
    findByProductId(productId: string): Promise<IStock | null>;
    updateStockQuantity(id: string, quantity: number): Promise<IStock | null>;
}
