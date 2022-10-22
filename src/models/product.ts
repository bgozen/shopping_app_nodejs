import { Cart } from './cart'
import { sequelize } from '../util/database'
import { CreationOptional, DataTypes, Model} from 'sequelize'



export const Product =sequelize.define('Product',{
  id:{
    type : DataTypes.INTEGER,
    primaryKey:true,
    allowNull:false,
    autoIncrement:true,
    unique:true
  },
  title:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  imageUrl:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  description:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  price:{
    type:DataTypes.DOUBLE,
    allowNull:false,
  }
})