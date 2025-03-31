import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { MongoDBConnection } from "./infrastructure/database/mongodb.connection";
import { ErrorMiddleware } from "./middlewares/error.middleware";
import { AuthRouter } from "./modules/auth/routes/auth.route";
import { ProductRouter } from "./modules/products/routes/product.route";
import { StockRouter } from "./modules/stocks/routes/stock.route";
import { InvoiceRouter } from './modules/invoices/routes/invoice.routes';
import logger from "./config/logger";
import HealthCheckRouter from "./config/healthcheck.router";

export class App {
    private app: Application;

    constructor() {
        this.app = express();
        this.configureMiddlewares();
        this.configureRoutes();
        this.configureErrorHandling()
    }

    private configureMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    private configureRoutes(): void {
        const authRoutes = new AuthRouter();
        const productRoutes = new ProductRouter();
        const stockRoutes = new StockRouter();
        const invoiceRoutes = new InvoiceRouter();
        const healthCheckRoute = new HealthCheckRouter();

        this.app.use('/api/v1/health-check', healthCheckRoute.getRouter())
        this.app.use('/api/v1/auth', authRoutes.getRouter());
        this.app.use('/api/v1/products', productRoutes.getRouter());
        this.app.use('/api/v1/stocks', stockRoutes.getRouter());
        this.app.use('/api/v1/invoices', invoiceRoutes.getRouter());
    }

    private configureErrorHandling(): void {
        this.app.use(ErrorMiddleware.handleErrors)
    }

    public async start(port: number): Promise<void> {
        try{
            const dbConnection =  MongoDBConnection.getInstance();
            await dbConnection.connect();
            this.app.listen(port, () => {
                logger.info(`Server is running on port ${port}`);
            });
        } catch (e: any) {
            logger.error(e);
            process.exit(1);
        }
    }
}