
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors"
import authRoute from './routes/auth.js'
import productsRoute from './routes/product.js'


const app = express();

dotenv.config();


// Connect to MongoDB
  
// connect environment variables
  
  
  const connect = async () => {
      try {
          await mongoose.connect(process.env.MONGO);
          console.log('connected to mongo');
        } catch (error) {
          throw error
        }
      
  };
  
  mongoose.connection.on("connected", ()=>{
      console.log('mongodb connected');
  })
  mongoose.connection.on("disconnected", ()=>{
      console.log('mongodb disconnected');
  })
  
  // middleware
  
  app.use(cors())
  app.use(cookieParser())
  app.use(express.json())
  app.use('/api/auth', authRoute)
  app.use('/api/products', productsRoute)

  // app.use(express.static('frontend'))
  app.use(express.static('frontend'))

  app.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }
    
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    
    res.status(errorStatus);
    res.json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
    
    // Terminate the request-response cycle
    // to prevent multiple responses
    return;
  });


  

// Start the server
app.listen(9090, ()=> {
    connect()
    console.log('connected to backend http://localhost:9090/');
})
