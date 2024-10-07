import express from 'express';
import { createInvoice, downloadInvoicePDF, getAllInvoices } from '../controller/invoice.js';

const router = express.Router()

router.post('/createInvoice', createInvoice);
// router.get('/downloadinvoice/:id', downloadInvoicePDF);
router.get('/getAllInvoices', getAllInvoices);


export const invoiceRouter = router;