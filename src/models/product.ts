import { Cart } from './cart'
import { pool } from '../util/database'


type cb = (products: Product[]) => void | cb


export class Product {
  constructor(public title: string, public imageUrl: string, public description: string, public price: number, public id?: number) {
  }

  save() {
    if (this.id) {
      return pool.execute(
        'UPDATE product SET title=? ,imageUrl=? , description=?, price=? WHERE id=?',
        [this.title, this.imageUrl, this.description, this.price, this.id])
    }
    return pool.execute(
      'INSERT INTO product (title,imageUrl,description,price) VALUES (?,?,?,?)',
      [this.title, this.imageUrl, this.description, this.price])
  }

  static delete(id: number) {
    return pool.query('DELETE FROM product WHERE id=?', id)
  }

  static fetchAll(cb: cb) {
    pool.query('SELECT * FROM product').then(([products, meta]) => {
      cb(products as Product[])
    }).catch((err) => {
      console.log(err)
    })
  }

  static fetchById(id: number, cb: (p: Product) => void) {
    pool.query('SELECT * FROM product WHERE id=?', id).then(([rowData, meta]) => {
      const [product] = rowData as Array<Product>
      cb(product)
    }).catch((err) => {
      console.log(err)
    })
  }
}
