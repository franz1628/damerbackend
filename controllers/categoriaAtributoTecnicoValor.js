const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where, Op, Sequelize } = require('sequelize');
const { CategoriaAtributoTecnicoValor } = require('../models/categoriaAtributoTecnicoValor');
const { CategoriaAtributoTecnico } = require('../models/categoriaAtributoTecnico');

const get = async (req = request, res = response) => {
    const model_all = await CategoriaAtributoTecnicoValor.findAll({
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

const postIdCategoriaTecnicoVariedad = async (req = request, res = response) => {
    const model = await CategoriaAtributoTecnicoValor.findAll({
        where: {
            estado: 1,
            idCategoriaAtributoTecnico : req.body.idCategoriaAtributoTecnico
        },
        include : {model:CategoriaAtributoTecnico,foreignKey:'id'}
    })
    

    res.json(
        model
    );
}

const post = async (req, res = response) => {
    delete req.body.id;
    const model = new CategoriaAtributoTecnicoValor(req.body);

    // Guardar en BD
    await model.save();

    res.json({
        model
    });
}


const put = async (req, res = response) => {

    const { id } = req.params;

    delete req.body.id;

    const model = await CategoriaAtributoTecnicoValor.update(req.body, {
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
        msg: 'patch API - CategoriaAtributoTecnicoValorPatch'
    });
}

const deleted = async (req, res = response) => {
    const { id } = req.params;

    const model = await CategoriaAtributoTecnicoValor.update({
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
    postIdCategoriaTecnicoVariedad,
    post,
    put,
    patch,
    deleted,
}