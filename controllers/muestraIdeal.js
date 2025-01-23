const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where, Op, Sequelize } = require('sequelize');
const { Controller } = require('./controller');
const { MuestraIdeal } = require('../models/muestraIdeal');
const { Categoria } = require('../models/categoria');
const { Canal } = require('../models/canal');
const { Distrito } = require('../models/distrito');
const { Zona } = require('../models/zona');

const control = Controller(MuestraIdeal);

control.get = async (req = request, res = response) => {
    const model_all = await MuestraIdeal.findAll({
        where: {
            estado: 1
        },
        include : [
            {
                model:Categoria,
                as : 'Categoria'
            },
            {
                model:Canal,
                as : 'Canal'
            },
            {
                model:Distrito,
                as : 'Distrito',
                include : [
                    {
                        model:Zona,
                        as : 'Zona'
                    }
                ]
            }
        ]
    })

    res.json({
        data: model_all,
        state: 1,
        message: ''
    });
},

module.exports = control;