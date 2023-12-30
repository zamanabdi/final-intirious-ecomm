import path from 'path';
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import products from './data/product.js'
import connectDB from "./config/db.js";
import productRoute from './routes/productRoute.js'
import userRoute from './routes/userRoute.js'
import orderRoute from './routes/orderRoute.js'
import uploadRoute from './routes/uploadRoute.js'
import { notfound, errorHandler } from "./middlewares/errorMiddleware.js";
dotenv.config()
const PORT = process.env.PORT || 5000;

connectDB();
const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// cookie parser middleware
app.use(cookieParser());





app.use('/api/products' ,productRoute );
app.use('/api/users' ,userRoute );
app.use('/api/orders' ,orderRoute );
app.use('/api/upload' ,uploadRoute);


const __dirname = path.resolve(); //Set __dirname to current directory

app.use('/uploads',express.static(path.join(__dirname,'/uploads')));

if(process.env.NODE_ENV === 'production'){

    //set static folder
   app.use(express.static(path.join(__dirname, '/frontend/build')));
   
   //any route that is not api will be redirected to index.html
   app.get('*',(req,res) => res.sendFile(path.resolve(__dirname, 'frontend',  'build', 'index.html')));

}else{
    app.get('/' , (req,res) =>{
        res.send("API is running....");
    } );

}


app.use(notfound);
app.use(errorHandler);


app.listen(PORT ,() => console.log("server is running on port :" ,PORT));