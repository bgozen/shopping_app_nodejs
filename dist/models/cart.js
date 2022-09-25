"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const p = path_1.default.join(path_1.default.dirname(require.main.filename), '../', 'data', 'cart.json');
class Cart {
    static addToCart(id, productPrice) {
        fs_1.default.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent.toString());
            }
            const existingProductIndex = cart.products.findIndex(product => product.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if (existingProduct) {
                updatedProduct = Object.assign({}, existingProduct);
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products[existingProductIndex] = updatedProduct;
            }
            else {
                updatedProduct = { id: id, qty: 1 };
                cart.products.push(updatedProduct);
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs_1.default.writeFile(p, JSON.stringify(cart), (err) => {
            });
        });
    }
    static deleteProduct(id, price) {
        fs_1.default.readFile(p, (err, fileContent) => {
            if (!err) {
                const cart = JSON.parse(fileContent.toString());
                const prodIndex = cart.products.findIndex(product => product.id === id);
                if (prodIndex === -1) {
                    return;
                }
                const prodQty = cart.products[prodIndex].qty;
                cart.products.splice(prodIndex, 1);
                cart.totalPrice -= (price * prodQty);
                fs_1.default.writeFile(p, JSON.stringify(cart), (err) => {
                });
            }
        });
    }
    static getCart(cb) {
        fs_1.default.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent.toString());
            cb(cart);
        });
    }
}
exports.Cart = Cart;
