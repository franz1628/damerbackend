const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where } = require('sequelize');

const { AgrupacionZonas } = require('../models/agrupacionZonas');
const { Controller } = require('./controller');

const control = Controller(AgrupacionZonas);

module.exports = control;