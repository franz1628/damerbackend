
const { Sequelize } = require('sequelize');
const { Cliente } = require('../models/cliente');
const { Usuario } = require('../models/usuario');
const { Controller } = require('./controller');

const control = Controller(Cliente);

control.get = async (req = request, res = response) => {
    const model_all = await Cliente.findAll({
        where: {
            estado: 1
        },
        include : [
            {
                model:Usuario,
                as:'Usuario'
            }
        ]
    })

    res.json({
        data: model_all,
        state: 1,
        message: ''
    });
}

control.post = async (req, res = response) => {
    try {
        delete req.body.id;
        const model = new Cliente(req.body);
        const findModel = await Cliente.findOne({
            where: Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('razonSocial')),
                Sequelize.fn('LOWER', req.body.razonSocial)
            )
        })

        if(findModel){
            return res.status(200).json({
                data: [],
                state: 0,
                message: 'Ya existe un Cliente con esa descripcion'
            });
        }

        await model.save();

        res.status(201).json({
            data: model,
            state: 1,
            message: 'Model creada correctamente'
        });
    } catch (error) {
        res.status(500).json({
            data: [],
            state: 0,
            message: error
        });
    }
}

control.put = async (req, res = response) => {
    try {
        const { id } = req.params;

        const miModelDb  = await Cliente.findOne({
            where : {
                id: req.body.id
            }
        })

        if(miModelDb.razonSocial!=req.body.razonSocial){
            const findModel = await Cliente.findOne({
                where: Sequelize.where(
                    Sequelize.fn('LOWER', Sequelize.col('razonSocial')),
                    Sequelize.fn('LOWER', req.body.razonSocial)
                )
            })
    
            if(findModel){
                return res.status(200).json({
                    data: [],
                    state: 0,
                    message: 'Ya existe un Cliente con esa descripcion'
                });
            }
        }

        delete req.body.id;

        const [rowsAffected, updatedModel] = await Cliente.update(req.body, {
            where: {
                id: id,
            },
            returning: true,
            individualHooks: true
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
            message: error.toString(),
        });
    }
},

module.exports = control;