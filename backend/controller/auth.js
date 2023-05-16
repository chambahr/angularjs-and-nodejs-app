import User from "../model/User.js"
import bcrypt from "bcrypt"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async(req, res, next) => {
     try {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);


        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hash
        })

        await newUser.save()
        res.status(200).send("User has been created Successfully!")

     } catch (err) {
        
     }
}

export const login = async (req, res, next) => {
    try {

        // Check username name if exist else throw error
       const user = await User.findOne({username:req.body.username})

       if(!user) 
            return next(createError(404, "User Not Found!"))

        //    Check and verify password before login
        const isPasswordCorrect = await bcrypt.compare(
                req.body.password, 
                user.password
            )

        if (!isPasswordCorrect) 
            return next(createError(400, "Wrong Password or Username!"))
        

        const token = jwt.sign(
            { id:user._id, isAdmin:user.isAdmin }, 
            process.env.JWT)

        const {password, isAdmin, ...otherDetails} = user._doc

       res
            .cookie("access_token", token, {
                httpOnly:true   
            })
            .status(200)
            .json({ details:{ ...otherDetails }, isAdmin})

    } catch (err) {
       next(err)
    }
}