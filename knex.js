'use strict';

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('./knexfile')[environment];

const knex = require('knex')(knexConfig);

console.log("Environment:", knexConfig.connection);

 
module.exports ={
    knex:knex,

};
