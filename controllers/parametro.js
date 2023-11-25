const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { Parametro } = require('../models/parametro');
const { where } = require('sequelize');

const parametroGet = async (req = request, res = response) => {

    const parametro_all = await Parametro.findAll({
        where: {
            estado: 1
        }
    })

    res.json({
        data: parametro_all,
        state: 1,
        message: ''
    });
}

const parametroIdGet = async (req = request, res = response) => {
 
    const parametro = await Parametro.findOne({
        where: {
            id:req.params.id,
            estado: 1
        }
    })

    res.json({
        data: parametro,
        state: 1,
        message: ''
    });
}

const parametroPost = async (req, res = response) => {
    delete req.body.id;
    const parametro = new Parametro(req.body);

    // Guardar en BD
    await parametro.save();

    res.json({
        parametro
    });
}

const parametroPut = async (req, res = response) => {
    delete req.body.id;
    const { id } = req.params;

    const parametro = await Parametro.update(req.body, {
        where: {
            id: id,
        }
    });

    res.json({
        data: [parametro],
        state: 1,
        message: 'Actualizado correctamente'
    });
}

const parametroPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - parametroPatch'
    });
}

const parametroDelete = async (req, res = response) => {
    const { id } = req.params;

    const parametro = await Parametro.update({
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
    parametroGet,
    parametroIdGet,
    parametroPost,
    parametroPut,
    parametroPatch,
    parametroDelete,
}