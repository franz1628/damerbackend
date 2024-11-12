const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where, Op, Sequelize } = require('sequelize');
const { Controller } = require('./controller');
const { AgrupacionCanalCanal } = require('../models/agrupacionCanalCanal');

const control = Controller(AgrupacionCanalCanal);


module.exports = control;