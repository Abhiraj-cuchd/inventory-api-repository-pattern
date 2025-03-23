import mongoose, { Schema } from 'mongoose';
import { IStock } from '../../../core/entities/stock.entity';

const StockSchema: Schema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 0 },
    location: { type: String, required: true }
}, {
    timestamps: true
});

export const StockModel = mongoose.model<IStock>('Stock', StockSchema);