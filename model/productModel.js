import db from '../config/database.js'
import {  DataTypes } from 'sequelize'

// const productModel=db.define('product', {
//     id_product: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement:true
//     },
//     name_product: DataTypes.STRING,
//     stock_product: DataTypes.INTEGER,
//     code_product: DataTypes.STRING,
//     file_product:DataTypes.STRING
    
// }, {
//     freezeTableName:true
// })

// export default productModel

//     (async () => {
//     db.sync()
// })const { Sequelize, DataTypes } = require('@sequelize/core');
// const sequelize = new Sequelize('sqlite::memory:');

const productModel = db.define('product', {
    id_product: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    name_product: DataTypes.STRING,
    stock_product: DataTypes.INTEGER,
    code_product: DataTypes.STRING,
    file_product:DataTypes.STRING
    
}, {
    freezeTableName:true
});
await productModel.sync();

export default productModel


