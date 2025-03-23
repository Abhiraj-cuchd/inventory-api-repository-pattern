import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { ProductService } from '../services/product.service';
import { ProductRepository } from '../repositories/product.repository';
import { AuthMiddleware } from '../../../middlewares/auth.middleware';

export class ProductRouter {
    public router: Router = Router();
    private productController: ProductController;

    constructor() {
        this.router = Router();
        const productRepository = new ProductRepository();
        const productService = new ProductService(productRepository);
        // @ts-ignore
        this.productController = new ProductController(productService);
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get('/', this.productController.getAllProducts.bind(this.productController));
        this.router.get('/:id', this.productController.getProductById.bind(this.productController));
        this.router.post('/', AuthMiddleware.authenticate, AuthMiddleware.authorize(['admin']), this.productController.createProduct.bind(this.productController));
        this.router.put('/:id', AuthMiddleware.authenticate, AuthMiddleware.authorize(['admin']), this.productController.updateProduct.bind(this.productController));
    }

    public getRouter() : Router {
        return this.router;
    }
}