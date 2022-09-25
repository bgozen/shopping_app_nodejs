import fs from 'fs'
import path from 'path'
import {Cart} from './cart'

type cb = (products: Product[]) => void | cb

const p = path.join(
  path.dirname(require.main!.filename), '../',
  'data',
  'products.json'
);

const getProductsFromFile = (cb: cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent.toString()));
    }
  });
};

export class Product {
  constructor(public title: string, public imageUrl: string, public description: string, public price: number, public id?: string) {
  }

  save() {

    getProductsFromFile((products: Product[]) => {
      if (this.id) {
        const productIndex = products.findIndex(product => product.id === this.id)
        products[productIndex] = this
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
      else {
        this.id = Math.random().toString()
        getProductsFromFile((products: Product[]) => {
          products.push(this);
          fs.writeFile(p, JSON.stringify(products), err => {
            console.log(err);
          });
        });
      }

    })
  }

  static delete(id:string) {
    getProductsFromFile((products: Product[]) => {
      const productIndex = products.findIndex(product => product.id === id)
      const price=products[productIndex].price
      Cart.deleteProduct(id,price)
      products.splice(productIndex, 1)
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    })
  }

  static fetchAll(cb: cb) {
    getProductsFromFile(cb);
  }

  static fetchById(id: string, cb: (p: Product) => void) {
    getProductsFromFile((products) => {
      const product = products.find(product => product.id === id)
      if(product){
        cb(product)
      }
 
     
    })
  }
};
