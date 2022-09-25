"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const database_1 = require("../util/database");
class Product {
    constructor(title, imageUrl, description, price, id) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this.id = id;
    }
    save() {
        if (this.id) {
            return database_1.pool.execute('UPDATE product SET title=? ,imageUrl=? , description=?, price=? WHERE id=?', [this.title, this.imageUrl, this.description, this.price, this.id]);
        }
        return database_1.pool.execute('INSERT INTO product (title,imageUrl,description,price) VALUES (?,?,?,?)', [this.title, this.imageUrl, this.description, this.price]);
    }
    static delete(id) {
        return database_1.pool.query('DELETE FROM product WHERE id=?', id);
    }
    static fetchAll(cb) {
        database_1.pool.query('SELECT * FROM product').then(([products, meta]) => {
            cb(products);
        }).catch((err) => {
            console.log(err);
        });
    }
    static fetchById(id, cb) {
        database_1.pool.query('SELECT * FROM product WHERE id=?', id).then(([rowData, meta]) => {
            const [product] = rowData;
            cb(product);
        }).catch((err) => {
            console.log(err);
        });
    }
}
exports.Product = Product;
