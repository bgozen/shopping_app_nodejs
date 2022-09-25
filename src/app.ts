import path from "path";
import express  from "express";
import bodyParser from "body-parser";

import * as errorController from './controllers/error'

import {router as adminRoutes}  from './routes/admin'
import {router as shopRoutes}  from './routes/shop' 

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../','public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
