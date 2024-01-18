const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where } = require('sequelize');
const { Cliente } = require('../models/cliente');

const get = async (req = request, res = response) => {
    const model_all = await Cliente.findAll({
        where: {
            estado: 1
        }
    })

    res.json({
        data: model_all,
        state: 1,
        message: ''
    });
}

const postCodigo = async (req = request, res = response) => {
    const model = await Cliente.findOne({
        where: {
            estado: 1,
            codigo : req.body.codigo
        }
    })

    res.json(
        model
    );
}

const post = async (req, res = response) => {
    try {
        delete req.body.id;
        const model = new Cliente(req.body);

        await model.save();

        res.status(201).json({
            model,
            state: 1,
            message: 'Cliente creada correctamente'
        });
    } catch (error) {
        res.status(500).json({
            state: 0,
            message: 'Internal Server Error'
        });
    }
}


const put = async (req, res = response) => {
    try {
        const { id } = req.params;
        delete req.body.id;

        const model = await Cliente.findOne({
            where: {
                id:id
            }
        })

        if(model.codigo!=req.body.codigo){
            const buscaModel = await Cliente.findOne({
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

        const [rowsAffected, updatedModel] = await Cliente.update(req.body, {
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
}

const patch = (req, res = response) => {
    res.json({
        msg: 'patch API - ClientePatch'
    });
}

const deleted = async (req, res = response) => {
    const { id } = req.params;

    const model = await Cliente.update({
        estado: false,
    }, {
        where: {
            id: id,
        }
    });

    res.json({
        data: [],
        state: 1,
        message: 'Borrado correctamente'
    });
}

module.exports = {
    get,
    postCodigo,
    post,
    put,
    patch,
    deleted,
}