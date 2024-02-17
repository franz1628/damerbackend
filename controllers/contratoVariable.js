
const { Contrato } = require('../models/contrato');
const { ContratoVariable } = require('../models/contratoVariable');
const { Variable } = require('../models/variable');
const { Controller } = require('./controller');

const control = Controller(ContratoVariable);

control.getIdContrato =  async (req, res = response) => {
    try {
      
        const model_all = await ContratoVariable.findAll({
            where: {
                estado: 1,
                idContrato: req.params.idContrato
            },
            include: [
                {
                    model: Contrato,
                    as: 'Contrato'
                },
                {
                    model: Variable,
                    as: 'Variable'
                }
            ]
        })

        res.status(201).json({
            data:model_all,
            state: 1,
            message: 'Lista de Variable'
        });
    } catch (error) {
        res.status(500).json({
            state: 0,
            message: 'Internal Server Error'
        });
    }
}

module.exports = control;