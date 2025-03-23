import { Router } from 'express';
import { StockController } from "../controller/stock.controller";
import { StockService } from '../services/stock.service';
import { StockRepository } from '../repositories/stock.repository';
import { AuthMiddleware } from '../../../middlewares/auth.middleware';

export class StockRouter {
    private router: Router;
    private stockController: StockController;

    constructor() {
        this.router = Router();
        const stockRepository = new StockRepository();
        const stockService = new StockService(stockRepository);
        // @ts-ignore
        this.stockController = new StockController(stockService);
        this.initializeRoutes()
    }

    private initializeRoutes() : void {
        this.router.get('/',
                AuthMiddleware.authenticate,
                this.stockController.getAllStock.bind(this.stockController)
            );

        this.router.get('/:id',
            AuthMiddleware.authenticate,
            this.stockController.getStockById.bind(this.stockController)
            );

        this.router.get('/product/:productId',
                AuthMiddleware.authenticate,
                this.stockController.getStockByProductId.bind(this.stockController)
            );

        this.router.post('/',
                AuthMiddleware.authenticate,
                AuthMiddleware.authorize(['admin', 'inventory-manager']),
                this.stockController.createStock.bind(this.stockController)
            );

        this.router.put('/:id',
                AuthMiddleware.authenticate,
                AuthMiddleware.authorize(['admin', 'inventory-manager']),
                this.stockController.updateStock.bind(this.stockController)
            );

        this.router.patch('/:id/quantity',
                AuthMiddleware.authenticate,
                AuthMiddleware.authorize(['admin', 'inventory-manager']),
                this.stockController.updateStockQuantity.bind(this.stockController)
            );

        this.router.delete('/:id',
                AuthMiddleware.authenticate,
                AuthMiddleware.authorize(['admin', 'inventory-manager']),
                this.stockController.deleteStock.bind(this.stockController)
            );
    }

    public getRouter(): Router {
        return this.router;
    }
}