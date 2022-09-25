"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCheckout = exports.getOrders = exports.postDeleteCartProduct = exports.postCart = exports.getCart = exports.getIndex = exports.getProduct = exports.getProducts = void 0;
const product_1 = require("../models/product");
const cart_1 = require("../models/cart");
const getProducts = (req, res, next) => {
    product_1.Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products'
        });
    });
};
exports.getProducts = getProducts;
const getProduct = (req, res, next) => {
    const productId = req.params.productId;
    product_1.Product.fetchById(productId, (product) => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products'
        });
    });
};
exports.getProduct = getProduct;
const getIndex = (req, res, next) => {
    product_1.Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    });
};
exports.getIndex = getIndex;
const getCart = (req, res, next) => {
    cart_1.Cart.getCart((cart) => {
        product_1.Product.fetchAll((products) => {
            const cartProducts = [];
            for (const product of products) {
                const cartProdData = cart.products.find(prod => prod.id === product.id);
                if (cartProdData) {
                    cartProducts.push({ productData: product, qty: cartProdData.qty });
                }
            }
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                cart: cart,
                cartProducts: cartProducts
            });
        });
    });
};
exports.getCart = getCart;
const postCart = (req, res, next) => {
    const productId = req.body.productId;
    product_1.Product.fetchById(productId, (product) => {
        cart_1.Cart.addToCart(productId, product.price);
        res.redirect('/cart');
    });
};
exports.postCart = postCart;
const postDeleteCartProduct = (req, res, next) => {
    const productId = req.body.id;
    product_1.Product.fetchById(productId, (product) => {
        cart_1.Cart.deleteProduct(productId, +product.price);
        res.redirect('/cart');
    });
};
exports.postDeleteCartProduct = postDeleteCartProduct;
const getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
};
exports.getOrders = getOrders;
const getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
};
exports.getCheckout = getCheckout;
