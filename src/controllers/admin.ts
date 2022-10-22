import express from 'express'
import { Product } from '../models/product';
import { RequestCustom } from '../app';
import { User } from '../models/user';

export const getAddProduct: express.RequestHandler = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/edit-product',
    editable: false
  });
};


export const getEditProduct: express.RequestHandler = (req:any, res, next) => {
  let editable = req.query.edit
  if (editable === 'true') {
    req.user!.getProducts({where:{id:+req.params.id}}).then((products:any) => {
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        product: products[0],
        editable: editable
      })
    })
    .catch((err:any)=>console.log(err))
  }
  else {
    res.redirect('/')
  }
}

export const postAddProduct: express.RequestHandler = (req:any, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user!.createProduct({
    title:title,
    imageUrl:imageUrl,
    price:price,
    description:description,
  }).then(()=>res.redirect('/'))
  .catch((err: any)=>console.log(err))
}

export const postEditProduct: express.RequestHandler = (req, res, next) => {
  const prodId = +req.body.id
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  Product.findByPk(prodId).then((product)=>{
    return product?.update({
      title:title,
      imageUrl:imageUrl,
      price:price,
      description:description
    })
  })
  .then(()=>res.redirect('/'))
  .catch(err=>console.log(err))
}


export const postDeleteProduct: express.RequestHandler = (req, res, next) => {
  const prodId = +req.body.id
  Product.findByPk(prodId)
  .then((product)=>{
    return product?.destroy()
  })
  .then(()=>{res.redirect('/admin/products')})
  .catch(err=>console.log(err))
}

export const getProducts : express.RequestHandler=(req:any,res,next)=>{
  req.user.getProducts().then((products:any)=>{
    res.render('admin/products',{
      pageTitle: 'Admin Products',
      path: '/admin/products',
      prods:products,
    })
  }).catch((err:any)=>console.log(err))
}