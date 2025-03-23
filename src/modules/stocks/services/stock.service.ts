import { StockServiceInterface } from '../interfaces/stock.service.interface';
import { StockRepositoryInterface } from '../interfaces/stock.repository.interface';
import { IStock } from '../../../core/entities/stock.entity';
import { CreateStockDto, UpdateStockDto } from '../dtos/stock.dto';
import { AppError } from '../../../core/errors/app.error'

export class StockService implements StockServiceInterface {
    private stockRepository: StockRepositoryInterface;

    constructor(stockRepository: StockRepositoryInterface) {
        this.stockRepository = stockRepository;
    }

    async getAll(): Promise<IStock[]> {
        return await this.stockRepository.findAll();
    }

    async getById(id: string): Promise<IStock | null> {
        return await this.stockRepository.findById(id);
    }

    async create(stockData: CreateStockDto): Promise<IStock> {
        const existingStock = await this.stockRepository.findByProductId(stockData.productId);
        if (existingStock) {
            throw new AppError('Stock for this Product already exists', 400);
        }
        return await this.stockRepository.create(stockData);
    }

    async update(id: string, stockData: UpdateStockDto): Promise<IStock | null> {
        if (stockData.productId) {
            const existingStock = await this.stockRepository.findByProductId(stockData.productId);
            if (existingStock && existingStock.productId !== id.toString()) {
                throw new AppError('Stock for this Product already exists', 400);
            }
        }
        return await this.stockRepository.update(id, stockData);
    }

    async updateQuantity(id: string, quantity: number): Promise<IStock | null> {
        const stock = await this.stockRepository.findById(id);
        if (!stock) {
            throw new AppError('Stock for this Product not found', 404);
        }
        return await this.stockRepository.updateStockQuantity(id, quantity);
    }

    // @ts-ignore
    async delete(id: string): Promise<boolean> {
        return await this.stockRepository.delete(id);
    }


}
