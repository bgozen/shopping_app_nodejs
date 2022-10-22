"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const database_1 = require("../util/database");
const sequelize_1 = require("sequelize");
exports.Order = database_1.sequelize.define('Order', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
});
