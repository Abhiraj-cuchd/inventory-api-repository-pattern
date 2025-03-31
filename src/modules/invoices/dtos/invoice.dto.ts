import { IInvoiceItem } from '../../../core/entities/invoice.entity';

export interface CreateInvoiceDto {
  customerId: string;
  invoiceNumber: string;
  items: IInvoiceItem[];
  totalAmount: number;
  status?: string;
  issuedDate?: Date;
  dueDate: Date;
}

export interface UpdateInvoiceDto {
  customerId?: string;
  status?: string;
  dueDate?: Date;
}

export interface InvoiceStatusDto {
  status: string;
}