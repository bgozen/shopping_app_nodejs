
import express from 'express';
import { Product } from '../models/product'
import { Cart } from '../models/cart';
import { CartItem } from '../models/cart-item';
import { User } from '../models/user';


export const getProducts: express.RequestHandler = (req, res, next) => {
  Product.findAll().then((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
};



export const getProduct: express.RequestHandler = (req, res, next) => {
  const productId = req.params.productId
  Product.findByPk(productId).then((product) => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product?.getDataValue('title'),
      path: '/products'
    })
  }).catch(err => console.log(err))
};

export const getIndex: express.RequestHandler = (req, res, next) => {
  Product.findAll().then((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  })
};

export const getCart: express.RequestHandler = (req: any, res, next) => {

  req.user.getCart()
    .then((cart: any) => { return cart.getProducts() })
    .then((products: any) => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        cartProducts: products
      });
    })
};

export const postCart: express.RequestHandler = (req: any, res, next) => {
  const productId = +req.body.productId
  let fetchedCart: any;
  let newQ = 1
  req.user.getCart().then((cart: any) => {
    fetchedCart = cart
    return cart.getProducts({ where: { id: productId } })
  })
    .then((products: any) => {
      let product
      if (products.length > 0) {
        newQ = products[0].CartItem.quantity + 1
        return products[0]
      }
      return Product.findByPk(productId)
    })
    .then((product: any) => {
      return fetchedCart.addProduct(product, { through: { quantity: newQ } })
    })
    .then((result: any) => {
      res.redirect('/cart')
    })
    .catch((err: any) => console.log(err))
};

export const postDeleteCartProduct: express.RequestHandler = (req: any, res, next) => {
  const productId: string = req.body.id
  req.user.getCart()
    .then((cart: any) => {
      return cart.getProducts({ where: { id: productId } })
    })
    .then((products: any) => { return products[0].CartItem.destroy() })
    .then(() => { res.redirect('/cart') })
    .catch((err: any) => { console.log(err) })
};


export const getOrders: express.RequestHandler = (req:any, res, next) => {
  req.user.getOrders({include:['Products']})
  .then((orders:any)=>{
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders:orders
    });
  })
  .catch((err:any)=>console.log(err))

};

export const postOrders:express.RequestHandler =(req:any,res,next)=>{
  const cartProducts:{}[]=[]
  let fetchedCart:any
  req.user.getCart()
  .then((cart:any)=>{
    fetchedCart=cart
    return cart.getProducts();
  })
  .then((products:any)=>{
    cartProducts.push(...products)
    return req.user.createOrder()
  })
  .then ((order:any)=>{
    order.addProducts(cartProducts.map((product:any)=>{
      product.orderItem = {quantity:product.CartItem.quantity}
      return product
    }))
  })
  .then(()=>{
    fetchedCart.setProducts(null)})
  .then((result:any)=>res.redirect('/orders'))
  .catch((err:any)=>console.log(err))

}

export const getCheckout: express.RequestHandler = (req:any, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};


