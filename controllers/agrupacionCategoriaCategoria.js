const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where, Op, Sequelize } = require('sequelize');
const { Controller } = require('./controller');
const { AgrupacionCategoriaCategoria } = require('../models/agrupacionCategoriaCategoria');

const control = Controller(AgrupacionCategoriaCategoria);


module.exports = control;