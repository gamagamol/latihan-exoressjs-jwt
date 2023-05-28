import { check,validationResult } from "express-validator"
import productModel from "../model/productModel.js"
import response from "../util/response.js"



export const validationProduct = (methode) => {
   const arr = [
        check('name_product', 'Please fill product Name').notEmpty(),
        check('stock_product', 'Please fill product Stock').notEmpty(),
        check('code_product', 'Please fill product Code').notEmpty(),
        
        
    ]
    if (methode == 'insert') {
      
        arr.push(check('code_product').custom((val) => {
            return productModel.findOne({
                where: {
                    code_product:val
                }
            }).then((product) => {
                if (product) {
                    return Promise.reject('Product Code has been taken')
                }
            })
        }))
    } 

    return arr
}

export const getProduct = async (req, res) => {
   
    if (req.params.code) {
        const product = await productModel.findOne({
            where: {
                code_product:req.params.code
            }
        })

        if (!product) {
            
            res.status(400).json(response('Failed',400))
        }        

      

        res.status(200).json(response('success',200,product))
    }

   
    const products = await productModel.findAll()
    res.status(200).json(response('success',200,products))
}
export const insertProduct = async (req, res) => {
    let error = validationResult(req)
    if (!error.isEmpty()) {
         res.status(400).json({
            message: 'error',
            status_code: 400,
            errors:error
        })
    }
   await productModel.create(req.body)

    res.status(201).json(response('success', 201,req.body))
 
}
export const updateProduct = async (req, res) => {
    
    const product = await productModel.findOne({
        where: {
            code_product:req.body.code_product
        }
    })

    await  product.set(req.body).save()

    res.status(201).json(response('success update data',202,req.body))
}
export const deleteProduct = async (req, res) => {
   

    const product = await productModel.findOne({
        where: {
            code_product:req.params.code
        }
    })
    
    if (!product) {
        res.status(400).json(response('failed product code not found',400))
    }
     product.destroy()
    res.status(202).json(response('success delete',202,product))

}

