

const { Controller } = require('./controller');
const { Vista } = require('../models/vista');

const control = Controller(Vista);

module.exports = control;