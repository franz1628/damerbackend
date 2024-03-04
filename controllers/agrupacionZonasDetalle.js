const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where } = require('sequelize');

const { AgrupacionZonasDetalle } = require('../models/agrupacionZonasDetalle');
const { Controller } = require('./controller');
const { AgrupacionZonas } = require('../models/agrupacionZonas');

const control = Controller(AgrupacionZonasDetalle);

control.postIdAgrupacionZonas = async (req = request, res = response) => {
    try {
        const model_all = await AgrupacionZonasDetalle.findAll({
            where: {
                estado: 1,
                idAgrupacionZonas: req.body.idAgrupacionZonas
            },
            include:[
                {
                    model:AgrupacionZonas,
                    as:'AgrupacionZonas'
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