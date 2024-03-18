const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where, Op, Sequelize } = require('sequelize');
const { ClienteFiltro } = require('../models/clienteFiltro');
const { Controller } = require('./controller');

const control = Controller(ClienteFiltro);

control.postIdAtributoFuncionalVariedadValor =  async (req, res = response) => {
    try {
      
        const model_all = await ClienteFiltro.findAll({
            where: {
                estado: 1,
                idAtributoFuncionalVariedadValor : req.body.idAtributoFuncionalVariedadValor
            }
        })
    
 
        res.status(201).json({
            data:model_all,
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