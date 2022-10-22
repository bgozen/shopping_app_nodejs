import path from "path";
import express  from "express";
import bodyParser from "body-parser";

import * as errorController from './controllers/error'

import {router as adminRoutes}  from './routes/admin'
import {router as shopRoutes}  from './routes/shop' 

import { sequelize } from "./util/database";
import { Product } from "./models/product";
import { User } from "./models/user";
import {Model} from "sequelize"
import { Cart } from "./models/cart";
import { CartItem } from "./models/cart-item";
import { Order } from "./models/order";
import { OrderItem } from "./models/order-item";

export interface RequestCustom extends express.Request{
    user?:Model
}

Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'})
User.hasMany(Product)
User.hasMany(Order)
User.hasOne(Cart)
Cart.belongsTo(User,{constraints:true,onDelete:'CASCADE'})
Order.belongsTo(User,{constraints:true,onDelete:'CASCADE'})
Cart.belongsToMany(Product,{through:CartItem})
Order.belongsToMany(Product,{through:OrderItem})
Product.belongsToMany(Cart,{through:CartItem})
Product.belongsToMany(Order,{through:OrderItem})

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../','public')));

app.use((req:RequestCustom,res,next)=>{
    User.findByPk(1)
    .then(user=>{
        req.user =user!
        next()
    })
    .catch(err=>console.log(err))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

sequelize.sync()
.then((result)=>{
    return User.findByPk(1)})
.then(user=>{
    if(!user){
       return User.create({name:'Bulut',email:'bgozen@gmail.com'})
    }
    return Promise.resolve(user)
})
.then((user:any)=> {
    return user.createCart()
})
.then(()=> app.listen(3000))
.catch(err=>console.log(err))

