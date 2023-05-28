import {getProduct,insertProduct,updateProduct,deleteProduct,validationProduct} from"../controllers/productController.js"
import express from "express";
import { authenticate, createUser, getUser, login } from "../controllers/userController.js";
const app = express()

const server = () => {

    app.use(express.json())

    // product routes
    app.get('/product', authenticate,getProduct)
    app.get('/product/:code', getProduct)
    app.put('/product', validationProduct('update'),updateProduct)
    app.delete('/product/:code', deleteProduct)
    app.post('/product',validationProduct('insert'), insertProduct)

    // user routes
    app.get('/users',getUser)
    app.post('/users',createUser)
    app.post('/users/login',login)


    app.listen(3000,()=>{console.log('server running');})
}

export default server