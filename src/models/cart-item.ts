import { sequelize } from "../util/database";
import { DataTypes } from "sequelize";


export const CartItem= sequelize.define('CartItem',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        unique:true,
        allowNull:false,
        primaryKey:true
    },
    quantity:DataTypes.INTEGER
})