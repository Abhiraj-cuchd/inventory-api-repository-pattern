import { Request, Response, NextFunction } from "express";
import { InvoiceServiceInterface } from "../interfaces/invoice.service.interface";
import {
  CreateInvoiceDto,
  UpdateInvoiceDto,
  InvoiceStatusDto,
} from "../dtos/invoice.dto";

export class InvoiceController {
  private invoiceService: InvoiceServiceInterface;
  constructor(invoiceService: InvoiceServiceInterface) {
    this.invoiceService = invoiceService;
  }

  async getAllInvoices(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const invoices = await this.invoiceService.getAll();
      res.status(200).json({
        status: "success",
        data: { invoices },
      });
    } catch (error) {
      next(error);
    }
  }

  async getInvoiceById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const invoiceId = req.params.id;
      const invoice = await this.invoiceService.getById(invoiceId);
      if (invoice) {
        res.status(200).json({
          status: "success",
          data: { invoice },
        });
      } else {
        res.status(404).json({
          status: "error",
          message: "Invoice not found",
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async getInvoiceByInvoiceNumber(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const invoiceNumber = req.params.invoiceNumber;
      const invoice = await this.invoiceService.findByInvoiceNumber(
        invoiceNumber
      );
      if (invoice) {
        res.status(200).json({
          status: "success",
          data: { invoice },
        });
      } else {
        res.status(404).json({
          status: "error",
          message: "Invoice not found",
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async getInvoicesByCustomerId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const customerId = req.params.customerId;
      const invoices = await this.invoiceService.findByCustomerId(customerId);
      res.status(200).json({
        status: "success",
        data: { invoices },
      });
    } catch (error) {
      next(error);
    }
  }

  async createInvoice(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const invoiceData: CreateInvoiceDto = req.body;
      const invoice = await this.invoiceService.create(invoiceData);
      res.status(201).json({
        status: "success",
        data: { invoice },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateInvoice(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const invoiceId: string = req.params.id;
      const invoiceData: UpdateInvoiceDto = req.body;
      const invoice = await this.invoiceService.update(invoiceId, invoiceData);
      if (invoice) {
        res.status(200).json({
          status: "success",
          data: { invoice },
        });
      } else {
        res.status(404).json({
          status: "error",
          message: "Invoice not found",
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async updateInvoiceStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const invoiceId: string = req.params.id;
      const statusDto: InvoiceStatusDto = req.body;
      const invoice = await this.invoiceService.updateStatus(
        invoiceId,
        statusDto.status
      );
      if (invoice) {
        res.status(200).json({
          status: "success",
          data: { invoice },
        });
      } else {
        res.status(404).json({
          status: "error",
          message: "Invoice not found",
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async deleteInvoice(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const invoiceId: string = req.params.id;
      const invoice = await this.invoiceService.delete(invoiceId);
      if (invoice) {
        res.status(204).json({
          status: "success",
          message: "Invoice deleted successfully",
        });
      } else {
        res.status(404).json({
          status: "error",
          message: "Invoice not found",
        });
      }
    } catch (error) {
      next(error);
    }
  }
}
