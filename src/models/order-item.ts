import { sequelize } from "../util/database";
import { DataTypes } from "sequelize";


export const OrderItem= sequelize.define('orderItem',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        unique:true,
        allowNull:false,
        primaryKey:true
    },
    quantity:DataTypes.INTEGER
})