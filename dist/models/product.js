"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cart_1 = require("./cart");
const p = path_1.default.join(path_1.default.dirname(require.main.filename), '../', 'data', 'products.json');
const getProductsFromFile = (cb) => {
    fs_1.default.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        }
        else {
            cb(JSON.parse(fileContent.toString()));
        }
    });
};
class Product {
    constructor(title, imageUrl, description, price, id) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this.id = id;
    }
    save() {
        getProductsFromFile((products) => {
            if (this.id) {
                const productIndex = products.findIndex(product => product.id === this.id);
                products[productIndex] = this;
                fs_1.default.writeFile(p, JSON.stringify(products), err => {
                    console.log(err);
                });
            }
            else {
                this.id = Math.random().toString();
                getProductsFromFile((products) => {
                    products.push(this);
                    fs_1.default.writeFile(p, JSON.stringify(products), err => {
                        console.log(err);
                    });
                });
            }
        });
    }
    static delete(id) {
        getProductsFromFile((products) => {
            const productIndex = products.findIndex(product => product.id === id);
            const price = products[productIndex].price;
            cart_1.Cart.deleteProduct(id, price);
            products.splice(productIndex, 1);
            fs_1.default.writeFile(p, JSON.stringify(products), err => {
                console.log(err);
            });
        });
    }
    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
    static fetchById(id, cb) {
        getProductsFromFile((products) => {
            const product = products.find(product => product.id === id);
            if (product) {
                cb(product);
            }
        });
    }
}
exports.Product = Product;
;
