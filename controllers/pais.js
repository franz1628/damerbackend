const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { Pais } = require('../models/pais');
const { where } = require('sequelize');

const paisGet = async (req = request, res = response) => {

    const paises = await Pais.findAll({
        where: {
            estado: 1
        }
    })

    res.json({
        data: paises,
        state: 1,
        message: ''
    });
}

const paisPost = async (req, res = response) => {

    const { descripcion, estado } = req.body;
    const pais = new Pais({ descripcion, estado });

    // Guardar en BD
    await pais.save();

    res.json({
        pais
    });
}

const paisPut = async (req, res = response) => {

    const { id } = req.params;
    const {descripcion} = req.body;

    const pais = await Pais.update({
        descripcion: descripcion,
    }, {
        where: {
            id: id,
        }
    });

    res.json({
        data: [pais],
        state: 1,
        message: 'Actualizado correctamente'
    });
}

const paisPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - paisPatch'
    });
}

const paisDelete = async (req, res = response) => {
    const { id } = req.params;

    const pais = await Pais.update({
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
    paisGet,
    paisPost,
    paisPut,
    paisPatch,
    paisDelete,
}