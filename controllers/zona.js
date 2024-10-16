const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where, Sequelize } = require('sequelize');
const { Zona } = require('../models/zona');
const { TipoZona } = require('../models/tipoZona');

const get = async (req = request, res = response) => {
    const model_all = await Zona.findAll({
        where: {
        
        },
        order: [
            ['descripcion', 'ASC']
        ],
        include : [
            {
                model:TipoZona,
                as:'TipoZona'
            }
        ]
    })

    res.json({
        data: model_all,
        state: 1,
        message: ''
    });
}

const post = async (req, res = response) => {
    delete req.body.id;
    const model = new Zona(req.body);

    // Guardar en BD
    await model.save();

    res.json({
        model
    });
}

const postDescripcion = async (req = request, res = response) => {
    const model_all = await Zona.findAll({
        where: {
            estado: 1,
            descripcion: Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('descripcion')),
                'LIKE',
                `%${req.body.descripcion.toLowerCase()}%`
            )
        }
    })

    res.json({
        data: model_all,
        state: 1,
        message: ''
    });
}

const put = async (req, res = response) => {

    const { id } = req.params;

    delete req.body.id;

    const model = await Zona.update(req.body, {
        where: {
            id: id,
        },
        individualHooks:true
    });

    res.json({
        data: [model],
        state: 1,
        message: 'Actualizado correctamente'
    });
}

const patch = (req, res = response) => {
    res.json({
        msg: 'patch API - zonaPatch'
    });
}

const deleted = async (req, res = response) => {
    const { id } = req.params;

    const model = await Zona.update({
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
    post,
    postDescripcion,
    put,
    patch,
    deleted,
}