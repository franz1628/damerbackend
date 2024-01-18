const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where } = require('sequelize');
const { Frecuencia } = require('../models/frecuencia');

const get = async (req = request, res = response) => {
    try {
        const modelAll = await Frecuencia.findAll({
            where: {
                estado: 1
            }
        });

        res.json({
            data: modelAll,
            state: 1,
            message: 'Success'
        });
    } catch (error) {
        res.status(500).json({
            state: 0,
            message: 'Internal Server Error'
        });
    }
}
const post = async (req, res = response) => {
    try {
        delete req.body.id;
        const model = new Frecuencia(req.body);

        await model.save();

        res.status(201).json({
            model,
            state: 1,
            message: 'Frecuencia creada correctamente'
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

        const [rowsAffected, updatedModel] = await Frecuencia.update(req.body, {
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
        console.error('Error updating frequency:', error);
        res.status(500).json({
            state: 0,
            message: 'Internal Server Error',
        });
    }
}

const patch = (req, res = response) => {
    res.json({
        msg: 'patch API - FrecuenciaPatch'
    });
}

const deleted = async (req, res = response) => {
    try {
        const { id } = req.params;

        const rowsAffected = await Frecuencia.update({
            estado: false,
        }, {
            where: {
                id: id,
            },
        });

        if (rowsAffected === 0) {
            return res.status(404).json({
                state: 0,
                message: 'Registro no encontrado',
            });
        }

        res.json({
            data: [],
            state: 1,
            message: 'Borrado correctamente',
        });
    } catch (error) {
        console.error('Error deleting frequency:', error);
        res.status(500).json({
            state: 0,
            message: 'Internal Server Error',
        });
    }
}

module.exports = {
    get,
    post,
    put,
    patch,
    deleted,
}