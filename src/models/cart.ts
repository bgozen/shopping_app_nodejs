import fs from 'fs'
import path from 'path'
import { Product } from './product'

const p = path.join(
    path.dirname(require.main!.filename),
    '../',
    'data', 'cart.json')


interface ProductInterface {
    id: string,
    qty: number
}
interface CartInterface {
    products: ProductInterface[],
    totalPrice: number
}

export class Cart {

    static addToCart(id: string, productPrice: number) {

        fs.readFile(p, (err, fileContent) => {
            let cart: CartInterface = { products: [], totalPrice: 0 }
            if (!err) {
                cart = JSON.parse(fileContent.toString())
            }
            const existingProductIndex = cart.products.findIndex(product => product.id === id)
            const existingProduct = cart.products[existingProductIndex]

            let updatedProduct: ProductInterface
            if (existingProduct) {
                updatedProduct = { ...existingProduct }
                updatedProduct.qty = updatedProduct.qty + 1
                cart.products[existingProductIndex] = updatedProduct
            }
            else {
                updatedProduct = { id: id, qty: 1 }
                cart.products.push(updatedProduct)

            }
            cart.totalPrice = cart.totalPrice + +productPrice

            fs.writeFile(p, JSON.stringify(cart), (err) => {
            })
        })
    }
    static deleteProduct(id: string,price:number) {
        fs.readFile(p, (err, fileContent) => {
            if (!err) {
                const cart:CartInterface = JSON.parse(fileContent.toString())
                const prodIndex=cart.products.findIndex(product=>product.id===id)
                if(prodIndex===-1){
                    return;
                }
                const prodQty= cart.products[prodIndex].qty
                cart.products.splice(prodIndex,1)
                cart.totalPrice -= (price*prodQty)
                fs.writeFile(p, JSON.stringify(cart), (err) => {
                })
            }
        })
    }
    static getCart(cb:(cart:CartInterface)=>void){
        fs.readFile(p,(err,fileContent)=>{
            const cart:CartInterface=JSON.parse(fileContent.toString())
            cb(cart)
        })    
    }
}

