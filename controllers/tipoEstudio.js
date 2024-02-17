const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { TipoEstudio } = require('../models/tipoEstudio');
const { TipoInformeOrden } = require('../models/tipoInformeOrden');

const get = async (req = request, res = response) => {
    const model_all = await TipoEstudio.findAll({
        where: {
            estado: 1,
        },
        include: [{
            model:TipoInformeOrden,
            as:'TipoInformeOrden'
        }]
    })

    res.json({
        data: model_all,
        state: 1,
        message: ''
    });
}

const postCodigo = async (req = request, res = response) => {
    const model = await TipoEstudio.findOne({
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
    const model = new TipoEstudio(req.body);

    // Guardar en BD
    await model.save();

    res.json({
        model
    });
}


const put = async (req, res = response) => {

    const { id } = req.params;

    delete req.body.id;

    const model = await TipoEstudio.update(req.body, {
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
        msg: 'patch API - TipoEstudioPatch'
    });
}

const deleted = async (req, res = response) => {
    const { id } = req.params;

    const model = await TipoEstudio.update({
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