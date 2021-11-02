'use strict';

const POSTGRES_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

const { Sequelize, DataTypes } = require('sequelize');

let sequlizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    }
} : {};

let sequelize = new Sequelize(POSTGRES_URL, sequlizeOptions);

const clothes = require('./clothes.model');
const food = require('./food.model');


module.exports = {
    db: sequelize,
    Clothes: clothes(sequelize, DataTypes),
    Food: food(sequelize, DataTypes),
}

