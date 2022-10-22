import { sequelize } from "../util/database";
import { DataTypes } from "sequelize"

export const Order = sequelize.define('Order',
{
    id:{
        type:DataTypes.INTEGER,
        unique:true,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false  
    }

}) 


