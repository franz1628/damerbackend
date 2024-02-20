
const { Contrato } = require('../models/contrato');
const { Controller } = require('./controller');
const { Cliente } = require('../models/cliente');
const { Categoria } = require('../models/categoria');
const { EstadoContrato } = require('../models/estadoContrato');
const { Frecuencia } = require('../models/frecuencia');
const { Sequelize } = require('sequelize');
const { DateTime } = require('luxon');

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
            version: Sequelize.literal('version + 1'),
            idEstadoContrato:1,
            fechaModificacion:DateTime.now().toFormat('yyyy-MM-dd')
        },
        {
            where: {
                id:req.body.id,
      
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

control.put = async (req, res = response) => {
    try {
        const { id } = req.params;
        delete req.body.id;

        const model = await Contrato.findOne({
            where: {
                id:id
            }
        })

        if(model.codigo!=req.body.codigo){
            const buscaModel = await Contrato.findOne({
                where: {
                    codigo:req.body.codigo
                }
            })

            if(buscaModel){
                return res.status(400).json({
                    state: 0,
                    message: 'El codigo ya existe',
                });
            }
        }
        req.body.fechaModificacion = DateTime.now().toFormat('yyyy-MM-dd');
        if(req.body.idEstadoContrato==3){
            req.body.fechaAprobacion = DateTime.now().toFormat('yyyy-MM-dd');
        }



        const [rowsAffected, updatedModel] = await Contrato.update(req.body, {
            where: {
                id: id,
            },
            returning: true,
        });

        if (rowsAffected === 0) {
            return res.status(404).json({
                state: 0,
                message: 'Registro no encontrado',
            });
        }

        res.json({
            data: [updatedModel],
            state: 1,
            message: 'Actualizado correctamente',
        });
    } catch (error) {
        res.status(500).json({
            state: 0,
            message: 'Internal Server Error',
        });
    }
},


module.exports = control;