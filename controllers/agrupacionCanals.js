const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where } = require('sequelize');

const { AgrupacionCanals } = require('../models/agrupacionCanals');
const { Controller } = require('./controller');

const control = Controller(AgrupacionCanals);

module.exports = control; 