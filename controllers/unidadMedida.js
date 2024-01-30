const { response, request } = require('express');

const { UnidadMedida } = require('../models/unidadMedida');


const get = async (req = request, res = response) => {
    const model_all = await UnidadMedida.findAll({
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
    const model = await UnidadMedida.findOne({
        where: {
            estado: 1,
            codigo : req.body.codigo
        }
    })

    res.json(
        model
    );
}

const postCodTipoUnidadMedida = async (req = request, res = response) => {
    const models = await UnidadMedida.findAll({
        where: {
            estado: 1,
            codTipoUnidadMedida : req.body.codTipoUnidadMedida
        }
    })

    res.json({
        data: models,
        state: 1,
        message: 'Lista'
    });
}

const post = async (req, res = response) => {
    delete req.body.id;
    const model = new UnidadMedida(req.body);

    // Guardar en BD
    await model.save();

    res.json({
        model
    });
}


const put = async (req, res = response) => {

    const { id } = req.params;

    delete req.body.id;

    const model = await UnidadMedida.update(req.body, {
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
        msg: 'patch API - UnidadMedidaPatch'
    });
}

const deleted = async (req, res = response) => {
    const { id } = req.params;

    const model = await UnidadMedida.update({
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
    postCodTipoUnidadMedida,
    postCodigo,
    post,
    put,
    patch,
    deleted,
}