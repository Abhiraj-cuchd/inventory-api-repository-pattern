import { StockRepositoryInterface } from '../interfaces/stock.repository.interface';
import { IStock } from '../../../core/entities/stock.entity';
import { BaseRepositoryImpl } from '../../../infrastructure/repositories/base.repository';
import { StockModel } from '../../../infrastructure/database/models/stock.model';

export class StockRepository extends BaseRepositoryImpl<IStock> implements StockRepositoryInterface {
    constructor() {
        super(StockModel);
    }

    async findByProductId(productId: string): Promise<IStock | null> {
        return await this.model.findOne({ productId }).exec();
    }

    async updateStockQuantity(id: string, quantity: number): Promise<IStock | null> {
        return await this.model.findByIdAndUpdate(id, { $inc: { quantity } }, { new: true }).exec();
    }
}