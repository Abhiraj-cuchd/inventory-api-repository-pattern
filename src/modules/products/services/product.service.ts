import { ProductServiceInterface } from "../interfaces/product.service.interface";
import { ProductRepositoryInterface } from "../interfaces/product.repository.interface";
import { IProduct } from "../../../core/entities/product.entity";
import { CreateProductDto, UpdateProductDto } from "../dtos/product.dto";
import { AppError } from "../../../core/errors/app.error";

export class ProductService implements ProductServiceInterface {
    private productRepository: ProductRepositoryInterface;
    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async getAll(): Promise<IProduct[]> {
        return this.productRepository.findAll();
    }

    async findBySku(sku: string): Promise<IProduct | null> {
        return this.productRepository.findBySku(sku);
    }

    async getById(id: string): Promise<IProduct | null> {
        return this.productRepository.findById(id);
    }

    async create(product: CreateProductDto): Promise<IProduct> {
        return this.productRepository.create(product);
    }

    async update(id: string, productData: UpdateProductDto): Promise<IProduct | null> {
        if(productData.sku) {
            const existingProduct = await this.productRepository.findBySku(productData.sku);
            if (existingProduct && existingProduct.id.toString() !== id) {
                throw new AppError('Product with this SKU already exists', 400);
            }
        }
        return await this.productRepository.update(id, productData);
    }

    // @ts-ignore
    async delete(id: string): Promise<boolean> {
        const result = await this.productRepository.delete(id);
        return !!result;
    }

}