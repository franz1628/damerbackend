

const { Controller } = require('./controller');
const { Cargo } = require('../models/cargo');

const control = Controller(Cargo);

module.exports = control;