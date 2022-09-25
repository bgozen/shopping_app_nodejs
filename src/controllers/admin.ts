import express from 'express'
import { Product } from '../models/product';


export const getAddProduct: express.RequestHandler = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/edit-product',
    editable: false
  });
};


export const getEditProduct: express.RequestHandler = (req, res, next) => {
  let editable = req.query.edit
  if (editable === 'true') {
    Product.fetchById(+req.params.id, ((product) => {
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        product: product,
        editable: editable
      });
    }))
  }
  else {
    res.redirect('/')
  }


};

export const postAddProduct: express.RequestHandler = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save().then(()=>{
    res.redirect('/');
  })
  .catch((err)=>{
    console.log(err)
  })
  
};

export const postEditProduct: express.RequestHandler = (req, res, next) => {
  const prodId = +req.body.id
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price, prodId);
  product.save()
  .then(()=>{
    res.redirect('/');
  })
  .catch(err=>console.log(err))
 
};


export const postDeleteProduct: express.RequestHandler = (req, res, next) => {
  const prodId = +req.body.id
  Product.delete(prodId).then((content)=>{
    res.redirect('/admin/products');
  })
  .catch((err)=>{
    console.log(err)
  })
  
}


export const getProducts: express.RequestHandler = (req, res, next) => {
  Product.fetchAll((products: Product[]) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
