"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const database_1 = require("../util/database");
const sequelize_1 = require("sequelize");
exports.Cart = database_1.sequelize.define('Cart', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
});
