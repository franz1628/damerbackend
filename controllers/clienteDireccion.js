const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where } = require('sequelize');
const { ClienteDireccion } = require('../models/clienteDireccion');
const { Cliente } = require('../models/cliente');
const { TipoDireccion } = require('../models/tipoDireccion');
const { Distrito } = require('../models/distrito');
const { Provincia } = require('../models/provincia');
const { Departamento } = require('../models/departamento');

const get = async (req = request, res = response) => {
    const model_all = await ClienteDireccion.findAll({
        where: {
            estado: 1
        },
        include : [
            {
                model:TipoDireccion,
                as:'TipoDireccion',
                foreignKey : 'id'
            }
        ]
    })

    res.json({
        data: model_all,
        state: 1,
        message: ''
    });
}

const getIdCliente = async (req = request, res = response) => {
    const model_all = await ClienteDireccion.findAll({
        where: {
            estado: 1,
            idCliente:req.params.idCliente
        },
        include : [
            {
                model:Cliente,
                as:'Cliente',
                foreignKey:'id'
            },
            {
                model:TipoDireccion,
                as:'TipoDireccion',
                foreignKey : 'id'
            },
            {
                model:Distrito,
                as:'Distrito',
                foreignKey : 'id',
                include: {
                    model:Provincia,
                    as:'Provincia',
                    foreignKey:'id',
                    include:{
                        model:Departamento,
                        as:'Departamento',
                        foreignKey:'id'
                    }
                }
            }
            
        ]

        
    })

    res.json({
        data: model_all,
        state: 1,
        message: ''
    });
}

const postCodigo = async (req = request, res = response) => {
    const model = await ClienteDireccion.findOne({
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
    delete req.body.id;
    const model = new ClienteDireccion(req.body);

    // Guardar en BD
    await model.save();

    res.json({
        model
    });
}


const put = async (req, res = response) => {

    const { id } = req.params;

    delete req.body.id;

    const model = await ClienteDireccion.update(req.body, {
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
        msg: 'patch API - ClienteDireccionPatch'
    });
}

const deleted = async (req, res = response) => {
    const { id } = req.params;

    const model = await ClienteDireccion.update({
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
    getIdCliente,
    postCodigo,
    post,
    put,
    patch,
    deleted,
}