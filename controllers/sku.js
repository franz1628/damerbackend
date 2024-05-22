const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where, Sequelize } = require('sequelize');
const { Sku } = require('../models/sku');
const { Canasta } = require('../models/canasta');
const { MegaCategoria } = require('../models/megaCategoria');
const { Categoria } = require('../models/categoria');
const { SkuAtributoTecnicoVariedadValor } = require('../models/skuAtributoTecnicoVariedadValor');
const { AtributoTecnicoVariedad } = require('../models/atributoTecnicoVariedad');
const { AtributoTecnicoVariedadValor } = require('../models/atributoTecnicoVariedadValor');
const { SkuHijos } = require('../models/skuHijos');

const get = async (req = request, res = response) => {
    const model_all = await Sku.findAll({
        where: {
            estado: 1
        },
        include:[
            {
                model:Canasta,
                as:'Canasta',
            },
            {
                model:MegaCategoria,
                as:'MegaCategoria',
            },
            {
                model:Categoria,
                as:'Categoria',
            },
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
    const model = new Sku(req.body);

    // Guardar en BD
    await model.save();

    res.json({
        model
    });
}

const postByCategoria = async (req, res = response) => {

    const {idCategoria } = req.body;

    const model_all = await Sku.findAll({
        where: {
            estado: 1,
            idCategoria:idCategoria,
        },
        include:[
            {
                model:Canasta,
                as:'Canasta',
            },
            {
                model:MegaCategoria,
                as:'MegaCategoria',
            },
            {
                model:Categoria,
                as:'Categoria',
            },
        ]
    })

    res.json({
        data: model_all,
        state: 1,
        message: ''
    });
}

const postByCategoriaAll = async (req, res = response) => {

    const {idCategoria } = req.body;

    const model_all = await Sku.findAll({
        where: {
            estado: 1,
            idCategoria:idCategoria,
        },
        include:[
            {
                model:Categoria,
                as:'Categoria',
            },
            {
                model:SkuAtributoTecnicoVariedadValor,
                as:'SkuAtributoTecnicoVariedadValor',
                include:[
                    {
                        model:AtributoTecnicoVariedad,
                        as:'AtributoTecnicoVariedad'
                    },
                    {
                        model:AtributoTecnicoVariedadValor,
                        as:'AtributoTecnicoVariedadValor'
                    },
                ]
            }
        ]
    })

    res.json({
        data: model_all,
        state: 1,
        message: ''
    });
}

const postId = async (req = request, res = response) => {
    const model = await Sku.findOne({
        where: {
            estado: 1,
            id : req.body.id
        },
        include:[
            {
                model:Canasta,
                as:'Canasta',
            },
            {
                model:MegaCategoria,
                as:'MegaCategoria',
            },
            {
                model:Categoria,
                as:'Categoria',
            },
        ]
    })

    res.json(
        model
    );
}

const postDescripcion = async (req = request, res = response) => {
    let model = await Sku.findAll({
        where: {
            estado: 1,
            descripcion: Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('Sku.descripcion')),
                'LIKE',
                `%${req.body.descripcion.toLowerCase()}%`
            )
        },
        include:[
            {
                model:Canasta,
                as:'Canasta',
            },
            {
                model:MegaCategoria,
                as:'MegaCategoria',
            },
            {
                model:Categoria,
                as:'Categoria',
            },
            {
                model:SkuHijos,
                as:'SkuHijos',
                include:[
                    {
                        model:Sku,
                        as:'Sku'
                    }
                ]
            }
        ]
    })

    res.json(
        model
    );
}

const postDescripcionCategoria = async (req = request, res = response) => {
    let model = await Sku.findAll({
        where: {
            estado: 1,
            descripcion: Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('Sku.descripcion')),
                'LIKE',
                `%${req.body.descripcion.toLowerCase()}%`
            ),
            idCategoria:req.body.idCategoria,
            tipoSku:1
        },
        include:[
            {
                model:Canasta,
                as:'Canasta',
            },
            {
                model:MegaCategoria,
                as:'MegaCategoria',
            },
            {
                model:Categoria,
                as:'Categoria',
            },
            {
                model:SkuHijos,
                as:'SkuHijos',
                include:[
                    {
                        model:Sku,
                        as:'Sku'
                    }
                ]
            }
        ]
    })

    res.json(
        model
    );
}

const put = async (req, res = response) => {

    const { id } = req.params;

    delete req.body.id;

    const model = await Sku.update(req.body, {
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
        msg: 'patch API - SkuPatch'
    });
}

const deleted = async (req, res = response) => {
    const { id } = req.params;

    const model = await Sku.update({
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
    postId,
    postByCategoria,
    postByCategoriaAll,
    postDescripcion,
    postDescripcionCategoria,
    put,
    patch,
    deleted,
}