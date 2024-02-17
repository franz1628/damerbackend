
const { Contrato } = require('../models/contrato');
const { ContratoUnidadVenta } = require('../models/contratoUnidadVenta');
const { UnidadVenta } = require('../models/unidadVenta');
const { Controller } = require('./controller');

const control = Controller(ContratoUnidadVenta);

control.getIdContrato =  async (req, res = response) => {
    try {
      
        const model_all = await ContratoUnidadVenta.findAll({
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
                    model: UnidadVenta,
                    as: 'UnidadVenta'
                }
            ]
        })

        res.status(201).json({
            data:model_all,
            state: 1,
            message: 'Lista de Unidad de venta'
        });
    } catch (error) {
        res.status(500).json({
            state: 0,
            message: 'Internal Server Error'
        });
    }
}

module.exports = control;