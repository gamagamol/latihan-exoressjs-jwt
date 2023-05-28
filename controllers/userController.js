
import userModel from "../model/userModel.js";
import bcrypt from "bcrypt"
import response from "../util/response.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()
export const getUser = async () => {
    console.log( await userModel.findAll());
}

export const createUser = async (req,res) => {
    
  
        let salt = await bcrypt.genSalt()
        let password = await bcrypt.hash(req.body.password, salt)
        
        await userModel.create({
            email: req.body.email,
            password:password
        })

        res.status(201).json(response('success',201))
    
}

export const login = async (req,res) => {
    
  

    const user = await userModel.findOne({
        where: {
            email:req.body.email
        }
    })

    if (user) {

        if (await bcrypt.compare(req.body.password, user.password)) {

          const token = jwt.sign(user.toJSON(),process.env.ACCESS_TOKEN_SECRET)

            
        res.status(200).json(response('succes', 200, {access_token:token}))
            
        } else {
        res.status(400).json(response('user not found',400))
            
        }

        
    } else {
        res.status(400).json(response('user not found',400))
    }


}


export const authenticate = (req, res, next) => {
    
    const autHeader = req.headers["authorization"]
    const token = autHeader && autHeader.split(' ')[1]
    if(token == null || token == undefined) return res.status(403).json(response('failed',403))
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, users) => {
        if (err) return res.status(403).json(response('failed', 403))
        
        req.users = users
        next()
    })
}