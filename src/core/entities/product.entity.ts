import { Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    sku: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}