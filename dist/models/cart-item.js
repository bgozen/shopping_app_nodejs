"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItem = void 0;
const database_1 = require("../util/database");
const sequelize_1 = require("sequelize");
exports.CartItem = database_1.sequelize.define('CartItem', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: sequelize_1.DataTypes.INTEGER
});
