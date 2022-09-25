import mysql2 from 'mysql2'
require('dotenv').config()

export const pool=mysql2.createPool({
    host:'localhost',
    user:'root',
    database:'shopping',
    password:process.env.SQLROOT

}).promise()