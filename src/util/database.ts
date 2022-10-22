import {Sequelize} from 'sequelize'
require('dotenv').config()

export const sequelize= new Sequelize('shopping','root','Gat64mec',{dialect:'mysql',host:'localhost',port:3307})