const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where, Op, Sequelize } = require('sequelize');

const { Controller } = require('./controller');

const { TipoCategoria } = require('../models/tipoCategoria');

const control = Controller(TipoCategoria);


module.exports = control;