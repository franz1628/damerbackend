const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where, Op, Sequelize } = require('sequelize');
const { Controller } = require('./controller');
const { ClienteConcatenacion } = require('../models/clienteConcatenacion');

const control = Controller(ClienteConcatenacion);

control.postIdAtributoFuncionalVariedadValor =  async (req, res = response) => {
    try {
      
        const model = await ClienteConcatenacion.findOne({
            where: {
                estado: 1,
                idAtributoFuncionalVariedadValor : req.body.idAtributoFuncionalVariedadValor
            }
        })
    
 
        res.status(201).json({
            data:model,
            state: 1,
            message: 'Model creada correctamente'
        });
    } catch (error) {
        res.status(500).json({
            state: 0,
            message: error
        });
    }
}

module.exports = control;