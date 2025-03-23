import { Request, Response, NextFunction } from 'express';
import { StockServiceInterface } from "../interfaces/stock.service.interface";
import { CreateStockDto, UpdateStockDto } from "../dtos/stock.dto";
import {AppError} from "../../../core/errors/app.error";

export class StockController {
    private stockService: StockServiceInterface;
    constructor(stockService: StockServiceInterface) {
        this.stockService = stockService;
    }

    async getAllStock(req: Request, res: Response, next: NextFunction) {
        try {
            const stocks = await this.stockService.getAll();
            res.status(200).json({
                status: 'success',
                data: { stocks },
            });
        } catch (error) {
            next(error);
        }
    }

    async getStockById(req: Request, res: Response, next: NextFunction) {
        try {
           const stock = await this.stockService.getById(req.params.id);
           res.status(200).json({
               status: 'success',
               data: { stock },
           })
        } catch (e) {
            next(e)
        }
    }

    async getStockByProductId(req: Request, res: Response, next: NextFunction) {
        try {
            const stock = await this.stockService.findByProductId(req.params.id);
            if (!stock) {
                throw new AppError('Stock Not Found', 404);
            }
            res.status(200).json({
                status: 'success',
                data: { stock },
            });
        } catch (e) {
            next(e)
        }
    }

    async createStock(req: Request, res: Response, next: NextFunction) {
        try {
            const stockData: CreateStockDto = req.body;
            const stocks = await this.stockService.create(stockData);
            res.status(200).json({
                status: 'success',
                data: { stocks },
            })
        } catch (e) {
            next(e)
        }
    }

    async updateStock(req: Request, res: Response, next: NextFunction) {
        try {
            const stock = await this.stockService.update(req.params.id, req.body);
            res.status(200).json({
                status: 'success',
                data: { stock },
            });
        } catch (e) {
            next(e)
        }
    }

    async updateStockQuantity(req: Request, res: Response, next: NextFunction) {
        try {
          const stockId = req.params.id;
          const { quantity } = req.body;
          if (typeof quantity !== 'number') {
              throw new AppError('Quantity must be a Number', 404);
          }
          const stock = await this.stockService.updateQuantity(stockId, quantity);
          return res.status(200).json({
              status: 'success',
              data: { stock },
          })

        } catch (e) {
            next(e)
        }
    }

    async deleteStock(req: Request, res:Response, next: NextFunction) {
        try {
            const stockId = req.params.id;
            const isDeleted = await this.stockService.delete(stockId);

            if (!isDeleted) {
                throw new AppError('Stock not found', 404);
            }

            res.status(204).json({
                status: 'success'
            });
        } catch (e) {
            next(e)
        }
    }


}
