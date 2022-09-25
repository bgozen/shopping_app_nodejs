"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = exports.postDeleteProduct = exports.postEditProduct = exports.postAddProduct = exports.getEditProduct = exports.getAddProduct = void 0;
const product_1 = require("../models/product");
const getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/edit-product',
        editable: false
    });
};
exports.getAddProduct = getAddProduct;
const getEditProduct = (req, res, next) => {
    let editable = req.query.edit;
    if (editable === 'true') {
        product_1.Product.fetchById(+req.params.id, ((product) => {
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                product: product,
                editable: editable
            });
        }));
    }
    else {
        res.redirect('/');
    }
};
exports.getEditProduct = getEditProduct;
const postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new product_1.Product(title, imageUrl, description, price);
    product.save().then(() => {
        res.redirect('/');
    })
        .catch((err) => {
        console.log(err);
    });
};
exports.postAddProduct = postAddProduct;
const postEditProduct = (req, res, next) => {
    const prodId = +req.body.id;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new product_1.Product(title, imageUrl, description, price, prodId);
    product.save()
        .then(() => {
        res.redirect('/');
    })
        .catch(err => console.log(err));
};
exports.postEditProduct = postEditProduct;
const postDeleteProduct = (req, res, next) => {
    const prodId = +req.body.id;
    product_1.Product.delete(prodId).then((content) => {
        res.redirect('/admin/products');
    })
        .catch((err) => {
        console.log(err);
    });
};
exports.postDeleteProduct = postDeleteProduct;
const getProducts = (req, res, next) => {
    product_1.Product.fetchAll((products) => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    });
};
exports.getProducts = getProducts;
