import express from 'express';
import authenticateUser from '../middleware/authorizationMiddleware.js';
import { createProduct, deleteProduct, editProduct, getAllProducts, getSpecificProduct } from '../controller/product.js';


const router = express.Router()

router.route('/createProduct').post(authenticateUser,createProduct)
router.route('/editProduct/:id').put(authenticateUser,editProduct)
router.route('/getAllProduct').get(authenticateUser,getAllProducts)
router.route('/deleteProduct/:id').delete(authenticateUser,deleteProduct)

router.route('/getSpecificProduct/:id').get(authenticateUser,getSpecificProduct)


export const productRouter = router;