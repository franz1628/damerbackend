const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where, Op, Sequelize } = require('sequelize');
const { Controller } = require('./controller');
const { UniversoNegocios } = require('../models/universoNegocios');

const control = Controller(UniversoNegocios);


module.exports = control;