import { InvoiceServiceInterface } from '../interfaces/invoice.service.interface';
import { InvoiceRepositoryInterface } from '../interfaces/invoice.repository.interface';
import { IInvoice } from '../../../core/entities/invoice.entity';
import { CreateInvoiceDto, UpdateInvoiceDto } from '../dtos/invoice.dto';
import { AppError } from '../../../core/errors/app.error';
import { StockServiceInterface } from '../../stocks/interfaces/stock.service.interface';

export class InvoiceService implements InvoiceServiceInterface {
    private invoiceRepository: InvoiceRepositoryInterface;
    private stockService: StockServiceInterface;
    constructor(invoiceRepository: InvoiceRepositoryInterface, stockService: StockServiceInterface) {
        this.invoiceRepository = invoiceRepository;
        this.stockService = stockService;
    }

    async getAll(): Promise<IInvoice[]> {
        return await this.invoiceRepository.findAll();
    }

    async getById(id: string): Promise<IInvoice | null> {
        return await this.invoiceRepository.findById(id);
    }

    async findByInvoiceNumber(invoiceNumber: string): Promise<IInvoice | null> {
        return await this.invoiceRepository.findByInvoiceNumber(invoiceNumber);
    }

    async findByCustomerId(customerId: string): Promise<IInvoice[]> {
        return await this.invoiceRepository.findByCustomerId(customerId);
    }

    async create(invoiceData: CreateInvoiceDto): Promise<IInvoice> {
        const existingInvoice = await this.invoiceRepository.findByInvoiceNumber(invoiceData.invoiceNumber);
        if (existingInvoice) {
            throw new AppError('Invoice with this Number already exists', 400);
        }

        for (const item of invoiceData.items) {
            const stock = await this.stockService.findByProductId(item.productId);

            if (!stock || stock.quantity < item.quantity) {
                throw new AppError(`Insufficient stock for product ${item.productId}`, 400);
            }

            await this.stockService.updateQuantity(stock._id, -item.quantity);
        }

        if (!invoiceData.status) {
            invoiceData.status = 'Pending';
        }

        if (!invoiceData.issuedDate) {
            invoiceData.issuedDate = new Date();
        }

        return await this.invoiceRepository.create(invoiceData);
    }

    async update(id: string, invoiceData: UpdateInvoiceDto): Promise<IInvoice | null> {
        return await this.invoiceRepository.update(id, invoiceData)
    }

    async updateStatus(id: string, status: string): Promise<IInvoice | null> {

        const validStatuses = ['pending', 'paid', 'cancelled', 'refunded'];

        if (!validStatuses.includes(status)) {
            throw new AppError(`Invalid status. Must be one of: ${validStatuses.join(', ')}`, 400);
        }

        const invoice = await this.invoiceRepository.findById(id);
        if (!invoice) {
            throw new AppError('Invoice not found', 404);
        }

        if (invoice.status === status) {
            throw new AppError(`Invoice is already ${status}`, 400);
        }

        if (status == 'cancelled' && invoice.status == 'pending') {
            for (const item of invoice.items) {
                const stock = await this.stockService.findByProductId(item.productId);
                if (stock) {
                    await this.stockService.updateQuantity(stock?._id, item.quantity);
                }
            }
        } else if (status == 'pending' && invoice.status == 'cancelled') {
            for (const item of invoice.items) {
                const stock = await this.stockService.findByProductId(item.productId);
                if (stock) {
                    if (stock.quantity < item.quantity) {
                      throw new AppError(
                        `Cannot reactivate invoice: Insufficient stock for product: ${item.productId}`,
                        400
                      );
                    }
                    
                    await this.stockService.updateQuantity(stock._id, -item.quantity);
                  }
            }
        }

        return await this.invoiceRepository.updateStatus(id, status);
    }

    async delete(id: string): Promise<boolean> {

        const invoice = await this.invoiceRepository.findById(id);

        if (!invoice) {
            throw new AppError('Invoice not found', 404);
        }

        if (invoice.status !== 'pending') {
            throw new AppError('Only pending invoices can be deleted', 400);
        }

        for (const item of invoice.items) {
            const stock = await this.stockService.findByProductId(item.productId);
            if (stock) {
                await this.stockService.updateQuantity(stock._id, item.quantity);
            }
        }

        return await this.invoiceRepository.delete(id);
    }

}