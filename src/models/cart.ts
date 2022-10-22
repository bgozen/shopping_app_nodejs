import { sequelize } from "../util/database"
import { DataTypes } from "sequelize"


export const Cart = sequelize.define('Cart',{
    id:{
        type:DataTypes.INTEGER,
        unique:true,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false

    }
})


