
import express from 'express';
import {Product}  from '../models/product'
import { Cart } from '../models/cart';

export const getProducts:express.RequestHandler = (req, res, next) => {
  Product.fetchAll((products:Product[]) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};



export const getProduct:express.RequestHandler = (req, res, next) => {
  const productId= req.params.productId
  Product.fetchById(productId,(product:Product)=>{
    res.render('shop/product-detail',{
      product:product,
      pageTitle:product.title,
      path:'/products'
    })
  })
};

export const getIndex:express.RequestHandler = (req, res, next) => {
  Product.fetchAll((products:Product[]) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

export const getCart:express.RequestHandler = (req, res, next) => {
  Cart.getCart((cart)=>{
    Product.fetchAll((products)=>{
      const cartProducts=[]
      for(const product of products){
        const cartProdData=cart.products.find(
          prod=>prod.id===product.id
        )
        if(cartProdData){
          cartProducts.push({productData:product,qty:cartProdData.qty})
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        cart:cart,
        cartProducts: cartProducts
      });
    })

  })

};

export const postCart:express.RequestHandler = (req, res, next) => {
  const productId=req.body.productId
  Product.fetchById(productId,(product)=>{
    Cart.addToCart(productId,product.price)
    res.redirect('/cart')
  })
};

export const postDeleteCartProduct:express.RequestHandler = (req, res, next) => {
  const productId:string=req.body.id
  Product.fetchById(productId,(product)=>{
    Cart.deleteProduct(productId,+product.price)
    res.redirect('/cart')
  })
};


export const getOrders:express.RequestHandler = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

export const getCheckout:express.RequestHandler = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
