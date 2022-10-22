"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCheckout = exports.postOrders = exports.getOrders = exports.postDeleteCartProduct = exports.postCart = exports.getCart = exports.getIndex = exports.getProduct = exports.getProducts = void 0;
const product_1 = require("../models/product");
const getProducts = (req, res, next) => {
    product_1.Product.findAll().then((products) => {
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
    product_1.Product.findByPk(productId).then((product) => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product === null || product === void 0 ? void 0 : product.getDataValue('title'),
            path: '/products'
        });
    }).catch(err => console.log(err));
};
exports.getProduct = getProduct;
const getIndex = (req, res, next) => {
    product_1.Product.findAll().then((products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    });
};
exports.getIndex = getIndex;
const getCart = (req, res, next) => {
    req.user.getCart()
        .then((cart) => { return cart.getProducts(); })
        .then((products) => {
        res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            cartProducts: products
        });
    });
};
exports.getCart = getCart;
const postCart = (req, res, next) => {
    const productId = +req.body.productId;
    let fetchedCart;
    let newQ = 1;
    req.user.getCart().then((cart) => {
        fetchedCart = cart;
        return cart.getProducts({ where: { id: productId } });
    })
        .then((products) => {
        let product;
        if (products.length > 0) {
            newQ = products[0].CartItem.quantity + 1;
            return products[0];
        }
        return product_1.Product.findByPk(productId);
    })
        .then((product) => {
        return fetchedCart.addProduct(product, { through: { quantity: newQ } });
    })
        .then((result) => {
        res.redirect('/cart');
    })
        .catch((err) => console.log(err));
};
exports.postCart = postCart;
const postDeleteCartProduct = (req, res, next) => {
    const productId = req.body.id;
    req.user.getCart()
        .then((cart) => {
        return cart.getProducts({ where: { id: productId } });
    })
        .then((products) => { return products[0].CartItem.destroy(); })
        .then(() => { res.redirect('/cart'); })
        .catch((err) => { console.log(err); });
};
exports.postDeleteCartProduct = postDeleteCartProduct;
const getOrders = (req, res, next) => {
    req.user.getOrders({ include: ['Products'] })
        .then((orders) => {
        res.render('shop/orders', {
            path: '/orders',
            pageTitle: 'Your Orders',
            orders: orders
        });
    })
        .catch((err) => console.log(err));
};
exports.getOrders = getOrders;
const postOrders = (req, res, next) => {
    const cartProducts = [];
    let fetchedCart;
    req.user.getCart()
        .then((cart) => {
        fetchedCart = cart;
        return cart.getProducts();
    })
        .then((products) => {
        cartProducts.push(...products);
        return req.user.createOrder();
    })
        .then((order) => {
        order.addProducts(cartProducts.map((product) => {
            product.orderItem = { quantity: product.CartItem.quantity };
            return product;
        }));
    })
        .then(() => {
        fetchedCart.setProducts(null);
    })
        .then((result) => res.redirect('/orders'))
        .catch((err) => console.log(err));
};
exports.postOrders = postOrders;
const getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
};
exports.getCheckout = getCheckout;
