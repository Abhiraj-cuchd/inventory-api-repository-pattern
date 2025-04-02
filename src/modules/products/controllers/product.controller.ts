import { Request, Response, NextFunction } from "express";
import { ProductServiceInterface } from "../interfaces/product.service.interface";
import { CreateProductDto, UpdateProductDto } from "../dtos/product.dto";
import logger from "../../../config/logger";

export class ProductController {
    private productService: ProductServiceInterface;
    constructor(productService: ProductServiceInterface) {
        this.productService = productService;
    }

    async getAllProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const products = await this.productService.getAll();
            res.status(200).json({
                status: 'success',
                products
            });
        } catch (error) {
            next(error);
        }
    }

    async getProductById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const productId = req.params.id;
            const product = await this.productService.getById(productId);
            res.status(200).json({
                status: 'success',
                data: {
                    product
                }
            });
        } catch (error) {
            next(error);
        }
    }

    async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        logger.info('createProduct')
        try {
            const productData: CreateProductDto = req.body;
            const product = await this.productService.create(productData);
            res.status(201).json({
                status: 'success',
                data: {
                    product
                }
            })
        } catch (error) {
            next(error);
        }
    }

    async updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const productId = req.params.id;
            const productData: UpdateProductDto = req.body;
            const product = await this.productService.update(productId, productData);
            res.status(200).json({
                status: 'success',
                data: {}
            })
        } catch (error) {
            next(error);
        }
    }

    async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const productId = req.params.id;
            const product = await this.productService.delete(productId);
            res.status(200).json({
                status: 'success',
                data: {}
            });
        } catch (error) {
            next(error);
        }
    }
}