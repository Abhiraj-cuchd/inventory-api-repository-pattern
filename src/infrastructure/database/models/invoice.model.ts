import mongoose, { Schema } from 'mongoose';
import { IInvoice } from '../../../core/entities/invoice.entity';

const InvoiceItemSchema: Schema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true }
}, {
    _id: false
});

const InvoiceSchema: Schema = new Schema({
    customerId: { type: String, required: true },
    invoiceNumber: { type: String, required: true, unique: true },
    items: [InvoiceItemSchema],
    totalAmount: { type: Number, required: true },
    status: { type: String, required: true, default: 'pending' },
    issuedDate: { type: Date, required: true, default: Date.now },
    dueDate: { type: Date }
}, {
    timestamps: true
});

export const InvoiceModel = mongoose.model<IInvoice>('Invoice', InvoiceSchema);