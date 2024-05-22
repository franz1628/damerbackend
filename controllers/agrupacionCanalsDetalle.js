const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where } = require('sequelize');

const { AgrupacionCanalsDetalle } = require('../models/agrupacionCanalsDetalle');
const { Controller } = require('./controller');
const { AgrupacionCanals } = require('../models/agrupacionCanals');
const { Canal } = require('../models/canal');

const control = Controller(AgrupacionCanalsDetalle);

control.postIdAgrupacionCanals = async (req = request, res = response) => {
    try {
        const model_all = await AgrupacionCanalsDetalle.findAll({
            where: {
                estado: 1,
                idAgrupacionCanals: req.body.idAgrupacionCanals
            },
            include:[
                {
                    model:AgrupacionCanals,
                    as:'AgrupacionCanals'
                },
                {
                    model:Canal,
                    as:'Canal'
                }
            ]
        });

        res.status(201).json({
            data:model_all,
            state: 1,
            message: ''
        });
    } catch (error) {
        res.status(500).json({
            data:[],
            state: 0,
            message: error
        });
    }
    
}

module.exports = control;