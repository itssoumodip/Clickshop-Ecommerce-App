import express from 'express'
import dotenv  from 'dotenv';
import './mongo.connect.js';
import cors from 'cors';
import userApi from './route/userRoute.js';
import productApi from './route/productRoute.js';
import adminApi from './route/adminRoute.js';
import bodyParser from 'body-parser';
import cartApi from './route/cartRoute.js';


dotenv.config()
const Port = process.env.PORT || 4000

const app = express();
app.use(bodyParser.json())
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
  credentials: true
}))


app.use('/user',userApi)
app.use('/product',productApi)
app.use('/admin', adminApi)
app.use('/cart',cartApi)


app.listen(Port, () => { console.log(`app is running at http://127.0.0.1:${Port}`) })