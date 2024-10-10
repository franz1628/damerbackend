const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where } = require('sequelize');
const { Via } = require('../models/via');
const { Provincia } = require('../models/provincia');
const { Departamento } = require('../models/departamento');
const { Zona } = require('../models/zona');
const { Distrito } = require('../models/distrito');

const get = async (req = request, res = response) => {

    const model_all = await Via.findAll({
        where: {
            estado: 1
        },
        include : [
            {
                model:Distrito,
                as:'Distrito'
            }
        ],
        order: [
            ['descripcion', 'ASC']
        ]
    })

    res.json({
        data: model_all,
        state: 1,
        message: ''
    });
}

const getId = async (req = request, res = response) => {

    const model = await Via.findOne({
        where: {
            estado: 1,
            id:req.params.id
        }
    })

    res.json({
        data: model,
        state: 1,
        message: ''
    });
}

const post = async (req, res = response) => {
    delete req.body.id;
    const model = new Via(req.body);

    // Guardar en BD
    await model.save();

    res.json({
        model
    });
}

const put = async (req, res = response) => {

    const { id } = req.params;

    delete req.body.id;

    const model = await Via.update(req.body, {
        where: {
            id: id,
        },
        individualHooks : true
    });

    res.json({
        data: [model],
        state: 1,
        message: 'Actualizado correctamente'
    });
}

const patch = (req, res = response) => {
    res.json({
        msg: 'patch API - ViaPatch'
    });
}

const deleted = async (req, res = response) => {
    const { id } = req.params;

    const model = await Via.update({
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
    getId,
    post,
    put,
    patch,
    deleted,
}