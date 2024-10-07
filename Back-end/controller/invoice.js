import Invoice from "../model/invoice.js";
import Product from "../model/product.js";

import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const createInvoice = async (req, res) => {
    try {
        const { invoiceNumber, customer, items } = req.body;

        // Check if invoiceNumber already exists
        const existingInvoice = await Invoice.findOne({ invoiceNumber });
        if (existingInvoice) {
            return res.status(400).json({ message: 'Invoice number already exists' });
        }

        // Calculate total amount
        let totalAmount = 0;
        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
            }
            item.price = product.price; // Ensure price is taken from product details
            totalAmount += item.price * item.quantity;
        }

        const newInvoice = new Invoice({ 
            invoiceNumber, 
            customer, 
            items, 
            totalAmount 
        });

        const savedInvoice = await newInvoice.save();
        res.status(201).json(savedInvoice);
    } catch (error) {
        res.status(500).json({ message: 'Error creating invoice', error: error.message });
    }
};



export const getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find().populate('items.productId', 'name');
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving invoices', error: error.message });
    }
};


export const downloadInvoicePDF = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await Invoice.findById(id).populate('items.productId');

        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        const doc = new PDFDocument();
        const filePath = path.resolve(`./invoices/invoice-${invoice.invoiceNumber}.pdf`);
        doc.pipe(fs.createWriteStream(filePath));

        // Add invoice details
        doc.fontSize(25).text(`Invoice: ${invoice.invoiceNumber}`, { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Date: ${invoice.date}`);
        doc.text(`Customer: ${invoice.customer.name}`);
        doc.text(`Email: ${invoice.customer.email}`);
        doc.text(`Address: ${invoice.customer.address}`);
        doc.moveDown();

        // Add table header
        doc.fontSize(14).text('Items:', { underline: true });
        doc.moveDown();
        doc.fontSize(12).text('Product Name', 100, 200);
        doc.text('Quantity', 200, 200);
        doc.text('Price', 300, 200);
        doc.text('Total', 400, 200);
        doc.moveDown();

        // Add table rows
        invoice.items.forEach(item => {
            doc.text(item.productName, 100);
            doc.text(item.quantity, 200);
            doc.text(item.price, 300);
            doc.text(item.price * item.quantity, 400);
            doc.moveDown();
        });

        // Add total amount
        doc.moveDown();
        doc.fontSize(14).text(`Total Amount: ${invoice.totalAmount}`, { align: 'right' });

        doc.end();

        // Send the PDF file as a response
        doc.on('end', () => {
            res.download(filePath, `invoice-${invoice.invoiceNumber}.pdf`, err => {
                if (err) {
                    res.status(500).json({ message: 'Error downloading invoice', error: err.message });
                } else {
                    fs.unlinkSync(filePath); // Remove the file after sending
                }
            });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error generating PDF', error: error.message });
    }
};
