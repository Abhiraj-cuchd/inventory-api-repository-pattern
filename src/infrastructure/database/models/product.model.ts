import mongoose , { Schema } from "mongoose";
import { IProduct } from "../../../core/entities/product.entity";

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    price: { type: Number, required: true }
}, { timestamps: true });

export const ProductModel = mongoose.model<IProduct>('Product', ProductSchema)