import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import productRoutes from './routes/product.route.js';
import cors from 'cors';


dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000; 

app.use(express.json()); //allows us to accept json data in requests body

app.use(cors()); //allows cross-origin requests

app.use('/api/products/', productRoutes)

app.listen(5000, () => {
    connectDB();
    console.log('server started at http://localhost:' + PORT);
});