const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where, Op, Sequelize } = require('sequelize');
const { CategoriaAtributoTecnico } = require('../models/categoriaAtributoTecnico');
const { SkuAtributoTecnicoVariedadValor } = require('../models/skuAtributoTecnicoVariedadValor');

const get = async (req = request, res = response) => {
    const model_all = await SkuAtributoTecnicoVariedadValor.findAll({
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

const postIdSku = async (req = request, res = response) => {
    const model = await SkuAtributoTecnicoVariedadValor.findAll({
        where: {
            estado: 1,
            idSku : req.body.idSku
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
    const model = new SkuAtributoTecnicoVariedadValor(req.body);

    // Guardar en BD
    await model.save();

    res.json({
        model
    });
}


const put = async (req, res = response) => {

    const { id } = req.params;

    delete req.body.id;

    const model = await SkuAtributoTecnicoVariedadValor.update(req.body, {
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
        msg: 'patch API - SkuAtributoTecnicoVariedadValorPatch'
    });
}

const deleted = async (req, res = response) => {
    const { id } = req.params;

    const model = await SkuAtributoTecnicoVariedadValor.update({
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
    postIdSku,
    post,
    put,
    patch,
    deleted,
}