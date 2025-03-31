import { BaseService } from "../../../core/interfaces/services/base.services.interface";
import { IInvoice } from "../../../core/entities/invoice.entity";

export interface InvoiceServiceInterface extends BaseService<IInvoice> {
    findByInvoiceNumber(invoiceNumber: string): Promise<IInvoice | null>;
    findByCustomerId(customerId: string): Promise<IInvoice[]>;
    updateStatus(id: string, status: string): Promise<IInvoice | null>;
}