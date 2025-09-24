import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
export const isAuthenticated =async(req,res,next)=>{
    try {
        const token =req.cookies.token|| (req.headers["authorization"]&&req.headers['authorization'].startWith('Bearer ')
        ? req.headers['authorization'].split(" ")[1] :null);

        if(!token){
            return res.status(404).json({message:"you are not logged In"})
        }
        const decode =jwt.verify(token, process.env.JWT_SECRET )
        if(!decode){
            return res.status(500).json({message:"please login again"})
        }
        const user =await User.findById(decode?.id);
        if(!user){
            return res.status(404).json({message:"logged in user not found"});
        }
        req.id =decode.id;
        next()

    } catch (error) {
        return res.status(500).json({message:"User is not Authenticated.."});
    }
}