const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where } = require('sequelize');
const { Distrito } = require('../models/distrito');
const { Provincia } = require('../models/provincia');
const { Departamento } = require('../models/departamento');

const get = async (req = request, res = response) => {

    const model_all = await Distrito.findAll({
        where: {
            estado: 1
        },
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

    const model = await Distrito.findOne({
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
    const model = new Distrito(req.body);

    // Guardar en BD
    await model.save();

    res.json({
        model
    });
}

const postByZona = async (req, res = response) => {
    const zona  = req.body.zona
    const distritos = await Distrito.findAll({
        where : {
            estado:1,
            idZona:zona.id
        },
        include:[
            {
                model:Provincia,
                as:'Provincia',
                include: [
                    {
                        model:Departamento,
                        as:'Departamento'
                    }
                ]
            }
        ]
    })

    res.json({
        data: distritos,
        state: 1,
        message: 'Listado'
    });
}

const put = async (req, res = response) => {

    const { id } = req.params;

    delete req.body.id;

    const model = await Distrito.update(req.body, {
        where: {
            id: id,
        }
    });

    res.json({
        data: [model],
        state: 1,
        message: 'Actualizado correctamente'
    });
}

const patch = (req, res = response) => {
    res.json({
        msg: 'patch API - distritoPatch'
    });
}

const deleted = async (req, res = response) => {
    const { id } = req.params;

    const model = await Distrito.update({
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
    postByZona,
    put,
    patch,
    deleted,
}