import { BaseService } from "../../../core/interfaces/services/base.services.interface";
import { IStock } from "../../../core/entities/stock.entity";

export interface StockServiceInterface extends BaseService<IStock> {
    findByProductId(productId: string): Promise<IStock | null>;
    updateQuantity(id: string, quantity: number): Promise<IStock | null>;
}