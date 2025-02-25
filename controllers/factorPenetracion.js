const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where, Op, Sequelize } = require('sequelize');
const { Controller } = require('./controller');
const { FactorPenetracion } = require('../models/factorPenetracion');
const { Medicion } = require('../models/medicion');

const control = Controller(FactorPenetracion);

control.get = async (req = request, res = response) => {
    const model_all = await FactorPenetracion.findAll({
        where: {
            estado: 1
        },
        include : [
            {
                model: Medicion,
                as: 'Medicion'
            }
        ]
    })

    res.json({
        data: model_all,
        state: 1,
        message: ''
    });
}


module.exports = control;