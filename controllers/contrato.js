
const { Contrato } = require('../models/contrato');
const { Controller } = require('./controller');
const { Cliente } = require('../models/cliente');
const { Categoria } = require('../models/categoria');
const { EstadoContrato } = require('../models/estadoContrato');
const { Frecuencia } = require('../models/frecuencia');
const { Sequelize } = require('sequelize');

const control = Controller(Contrato);

control.getContratos = async (req = request, res = response) => {
    const model_all = await Contrato.findAll({
        where: {
            estado: 1
        },
        include: [
            {
                model: Categoria,
                as: 'Categoria',
                foreignKey: 'idCategoria',
                targetKey: 'id',

            },
            {
                model: Cliente,
                as: 'Cliente',
                foreignKey: 'idCliente',
                targetKey: 'id',
            },
            {
                model: EstadoContrato,
                as: 'EstadoContrato',
                foreignKey: 'idEstadoContrato',
                targetKey: 'id',
            },
            {
                model: Frecuencia,
                as: 'Frecuencia',
                foreignKey: 'idFrecuencia',
                targetKey: 'id',
            }
        ]
    })

    res.json({
        data: model_all,
        state: 1,
        message: ''
    });
}

control.postAddVersion = async (req = request, res = response) => {
    await Contrato.update(
        {
            version: Sequelize.literal('version + 1')
        },
        {
            where: {
                id:req.body.id
            },
        })

    const model = await Contrato.findOne({
        where: {
            id:req.body.id
        },
    })

    res.json({
        data: model,
        state: 1,
        message: ''
    });
}


module.exports = control;