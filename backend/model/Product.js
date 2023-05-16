import mongoose from "mongoose";

const ProductSchema =  new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    price:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    imageUrl:{
        type:[String]
    }
    
})

export default mongoose.model("Product", ProductSchema)