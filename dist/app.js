"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const errorController = __importStar(require("./controllers/error"));
const admin_1 = require("./routes/admin");
const shop_1 = require("./routes/shop");
const database_1 = require("./util/database");
const product_1 = require("./models/product");
const user_1 = require("./models/user");
const cart_1 = require("./models/cart");
const cart_item_1 = require("./models/cart-item");
const order_1 = require("./models/order");
const order_item_1 = require("./models/order-item");
product_1.Product.belongsTo(user_1.User, { constraints: true, onDelete: 'CASCADE' });
user_1.User.hasMany(product_1.Product);
user_1.User.hasMany(order_1.Order);
user_1.User.hasOne(cart_1.Cart);
cart_1.Cart.belongsTo(user_1.User, { constraints: true, onDelete: 'CASCADE' });
order_1.Order.belongsTo(user_1.User, { constraints: true, onDelete: 'CASCADE' });
cart_1.Cart.belongsToMany(product_1.Product, { through: cart_item_1.CartItem });
order_1.Order.belongsToMany(product_1.Product, { through: order_item_1.OrderItem });
product_1.Product.belongsToMany(cart_1.Cart, { through: cart_item_1.CartItem });
product_1.Product.belongsToMany(order_1.Order, { through: order_item_1.OrderItem });
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, '../', 'public')));
app.use((req, res, next) => {
    user_1.User.findByPk(1)
        .then(user => {
        req.user = user;
        next();
    })
        .catch(err => console.log(err));
});
app.use('/admin', admin_1.router);
app.use(shop_1.router);
app.use(errorController.get404);
database_1.sequelize.sync()
    .then((result) => {
    return user_1.User.findByPk(1);
})
    .then(user => {
    if (!user) {
        return user_1.User.create({ name: 'Bulut', email: 'bgozen@gmail.com' });
    }
    return Promise.resolve(user);
})
    .then((user) => {
    return user.createCart();
})
    .then(() => app.listen(3000))
    .catch(err => console.log(err));
