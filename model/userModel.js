import { DataTypes } from "sequelize";
import db from "../config/database.js";
const userModel = db.define('users', {
    id_user: {
        primaryKey: true,
        autoIncrement: true,
        type:DataTypes.INTEGER
    },
    email: DataTypes.STRING,
    password:DataTypes.STRING
}, {
    freezeTableName:true
})

 await userModel.sync()
    export default userModel