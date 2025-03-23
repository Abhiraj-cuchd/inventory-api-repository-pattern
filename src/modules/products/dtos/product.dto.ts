export interface CreateProductDto {
    name: string;
    description: string;
    sku: string;
    price: number;
}

export interface UpdateProductDto {
    name?: string;
    description?: string;
    sku?: string;
    price?: number;
}