import { BaseRepository } from "../../../core/interfaces/repositories/base.repository.interface";
import { IInvoice } from "../../../core/entities/invoice.entity";

export interface InvoiceRepositoryInterface extends BaseRepository<IInvoice> {
    findByInvoiceNumber(invoiceNumber: string): Promise<IInvoice | null>;
    findByCustomerId(customerId: string): Promise<IInvoice[]>;
    updateStatus(id:string, status:string): Promise<IInvoice | null>;
}

