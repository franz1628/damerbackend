const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where, Op, Sequelize } = require('sequelize');
const { Controller } = require('./controller');
const { MuestraIdeal } = require('../models/muestraIdeal');

const control = Controller(MuestraIdeal);


module.exports = control;