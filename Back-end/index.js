import express from 'express';
import cors from 'cors';
import bodyParser  from 'body-parser';
import 'dotenv/config';
import { dataBaseConnection } from './dataBaseConnection.js';


const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json())
app.use(cors());

dataBaseConnection()
  
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
