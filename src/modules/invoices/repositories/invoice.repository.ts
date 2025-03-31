import { InvoiceRepositoryInterface } from "../interfaces/invoice.repository.interface";
import { IInvoice } from "../../../core/entities/invoice.entity";
import { BaseRepositoryImpl } from "../../../infrastructure/repositories/base.repository";
import { InvoiceModel } from "../../../infrastructure/database/models/invoice.model";

export class InvoiceRepository
  extends BaseRepositoryImpl<IInvoice>
  implements InvoiceRepositoryInterface
{
  constructor() {
    super(InvoiceModel);
  }

  async findByInvoiceNumber(invoiceNumber: string): Promise<IInvoice | null> {
    return await this.model.findOne({ invoiceNumber }).exec();
  }

  async findByCustomerId(customerId: string): Promise<IInvoice[]> {
    return await this.model.find({ customerId }).exec();
  }

  async updateStatus(id: string, status: string): Promise<IInvoice | null> {
    return this.model.findByIdAndUpdate(id, { status }, { new: true }).exec();
  }
}
