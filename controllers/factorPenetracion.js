const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where, Op, Sequelize } = require('sequelize');
const { Controller } = require('./controller');
const { FactorPenetracion } = require('../models/factorPenetracion');

const control = Controller(FactorPenetracion);


module.exports = control;