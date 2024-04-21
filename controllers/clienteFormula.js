const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where, Op, Sequelize } = require('sequelize');

const { Controller } = require('./controller');
const { ClienteFormula } = require('../models/clienteFormula');
const { SkuAtributoTecnicoVariedadValor } = require('../models/skuAtributoTecnicoVariedadValor');

const control = Controller(ClienteFormula);

control.postIdAtributoFuncionalVariedadValor =  async (req, res = response) => {
    try {
      
        const model_all = await ClienteFormula.findOne({
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

control.asignarFormula =  async (req, res = response) => {
    try {
      
        const model = await ClienteFormula.findOne({
            where: {
                estado: 1,
                idAtributoFuncionalVariedadValor : req.body.idAtributoFuncionalVariedadValor
            }
        })

        if(model!=null){
            await ClienteFormula.update(req.body, {
                where: {
                    id: model.id,
                }
            });
        }else{ //No existe tenemos que agregar
            delete req.body.id;
            const model = new ClienteFormula(req.body);
    
            await model.save();
        }
    
 
        res.status(201).json({
            data:model,
            state: 1,
            message: 'Actualizado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            state: 0,
            message: error
        });
    }
}



module.exports = control;