
const { Contrato } = require('../models/contrato');
const { ContratoMes } = require('../models/contratoMes');
const { Variable } = require('../models/variable');
const { Controller } = require('./controller');

const control = Controller(ContratoMes);

control.getIdContrato =  async (req, res = response) => {
    try {
      
        const model_all = await ContratoMes.findAll({
            where: {
                estado: 1,
                idContrato: req.params.idContrato
            },
            include: [
                {
                    model: Contrato,
                    as: 'Contrato'
                }
            ]
        })

        res.status(201).json({
            data:model_all,
            state: 1,
            message: 'Lista de Mes'
        });
    } catch (error) {
        res.status(500).json({
            state: 0,
            message: 'Internal Server Error'
        });
    }
}

module.exports = control;