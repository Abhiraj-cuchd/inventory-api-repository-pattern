import { Router } from 'express';
import { InvoiceController } from '../controllers/invoice.controller';
import { InvoiceService } from '../services/invoice.service';
import { InvoiceRepository } from '../repositories/invoice.repository';
import { StockService } from '../../stocks/services/stock.service';
import { StockRepository } from '../../stocks/repositories/stock.repository';
import { AuthMiddleware } from '../../../middlewares/auth.middleware';

export class InvoiceRouter {
    private router: Router;
    private invoiceController: InvoiceController;

    constructor() {
        this.router = Router();
        const invoiceRepository = new InvoiceRepository();
        const stockRepository = new StockRepository();
        const stockService = new StockService(stockRepository);
        const invoiceService = new InvoiceService(invoiceRepository, stockService);
        // @ts-ignore
        this.invoiceController = new InvoiceController(invoiceService);
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get('/',
                AuthMiddleware.authenticate,
                this.invoiceController.getAllInvoices.bind(this.invoiceController)
            );

        this.router.get('/:id',
            AuthMiddleware.authenticate,
            this.invoiceController.getInvoiceById.bind(this.invoiceController)
        );

        this.router.get('/invoice-number/:invoiceNumber',
            AuthMiddleware.authenticate,
            this.invoiceController.getInvoiceByInvoiceNumber.bind(this.invoiceController)
        );

        this.router.get('/customer/:customerId',
            AuthMiddleware.authenticate,
            this.invoiceController.getInvoicesByCustomerId.bind(this.invoiceController)
        );

        this.router.post('/',
            AuthMiddleware.authenticate,
            AuthMiddleware.authorize(['admin', 'sales']),
            this.invoiceController.createInvoice.bind(this.invoiceController)
        );

        this.router.put('/:id', 
            AuthMiddleware.authenticate,
            AuthMiddleware.authorize(['admin', 'sales']),
            this.invoiceController.updateInvoice.bind(this.invoiceController)
          );
          
          this.router.patch('/:id/status', 
            AuthMiddleware.authenticate,
            AuthMiddleware.authorize(['admin', 'sales']),
            this.invoiceController.updateInvoiceStatus.bind(this.invoiceController)
          );
          
          this.router.delete('/:id', 
            AuthMiddleware.authenticate,
            AuthMiddleware.authorize(['admin']),
            this.invoiceController.deleteInvoice.bind(this.invoiceController)
          );
    }

    public getRouter() : Router {
        return this.router;
    }
}