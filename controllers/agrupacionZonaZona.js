const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where, Op, Sequelize } = require('sequelize');
const { Controller } = require('./controller');
const { AgrupacionZonaZona } = require('../models/agrupacionZonaZona');

const control = Controller(AgrupacionZonaZona);


module.exports = control;