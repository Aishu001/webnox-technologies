import express from 'express';
import cors from 'cors';
import bodyParser  from 'body-parser';
import 'dotenv/config';
import { dataBaseConnection } from './dataBaseConnection.js';
import { userRouter } from './route/user.js';
import { productRouter } from './route/product.js';
import { invoiceRouter } from './route/invoice.js';


const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json())
app.use(cors());

dataBaseConnection()
app.use('/user',userRouter)
app.use('/product',productRouter)
app.use('/invoice',invoiceRouter)
  
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
