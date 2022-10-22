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
        req.user.getProducts({ where: { id: +req.params.id } }).then((products) => {
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                product: products[0],
                editable: editable
            });
        })
            .catch((err) => console.log(err));
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
    req.user.createProduct({
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description,
    }).then(() => res.redirect('/'))
        .catch((err) => console.log(err));
};
exports.postAddProduct = postAddProduct;
const postEditProduct = (req, res, next) => {
    const prodId = +req.body.id;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    product_1.Product.findByPk(prodId).then((product) => {
        return product === null || product === void 0 ? void 0 : product.update({
            title: title,
            imageUrl: imageUrl,
            price: price,
            description: description
        });
    })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err));
};
exports.postEditProduct = postEditProduct;
const postDeleteProduct = (req, res, next) => {
    const prodId = +req.body.id;
    product_1.Product.findByPk(prodId)
        .then((product) => {
        return product === null || product === void 0 ? void 0 : product.destroy();
    })
        .then(() => { res.redirect('/admin/products'); })
        .catch(err => console.log(err));
};
exports.postDeleteProduct = postDeleteProduct;
const getProducts = (req, res, next) => {
    req.user.getProducts().then((products) => {
        res.render('admin/products', {
            pageTitle: 'Admin Products',
            path: '/admin/products',
            prods: products,
        });
    }).catch((err) => console.log(err));
};
exports.getProducts = getProducts;
