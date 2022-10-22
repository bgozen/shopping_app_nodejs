"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
require('dotenv').config();
exports.sequelize = new sequelize_1.Sequelize('shopping', 'root', 'Gat64mec', { dialect: 'mysql', host: 'localhost', port: 3307 });
