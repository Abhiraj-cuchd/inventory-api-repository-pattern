import { Document } from 'mongoose';

export interface IInvoiceItem {
    productId: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

export interface IInvoice extends Document {
    customerId: string;
    invoiceNumber: string;
    items: IInvoiceItem[];
    totalAmount: number;
    status: string;
    issuedDate: Date;
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
}