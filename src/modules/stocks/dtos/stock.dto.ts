export interface CreateStockDto {
    productId: string;
    quantity: number;
    location: string;
}

export interface UpdateStockDto {
    productId?: string;
    quantity?: number;
    location?: string;
}