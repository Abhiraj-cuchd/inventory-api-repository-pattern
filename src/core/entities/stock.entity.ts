import { Document } from 'mongoose';

export interface IStock extends Document {
    productId: string;
    quantity: number;
    location: string;
    createdAt: Date;
    updatedAt: Date;
}