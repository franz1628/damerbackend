const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where, Op, Sequelize } = require('sequelize');
const { Categoria } = require('../models/categoria');

const get = async (req = request, res = response) => {
    const model_all = await Categoria.findAll({
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

const postId = async (req = request, res = response) => {
    const model = await Categoria.findOne({
        where: {
            estado: 1,
            id : req.body.id
        }
    })

    res.json(
        model
    );
}

const postDescripcion = async (req = request, res = response) => {
    const model = await Categoria.findAll({
        where: {
       
            descripcion: Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('descripcion')),
                'LIKE',
                `%${req.body.descripcion.toLowerCase()}%`
            )
        }
    })

    res.json(
        model
    );
}

const post = async (req, res = response) => {
    delete req.body.id;
    const model = new Categoria(req.body);

    const busquedaCategoria = await Categoria.findOne({
        where:{
            descripcion: Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('descripcion')),
                `${req.body.descripcion.toLowerCase()}`
            ),
            estado:1
        }
    })

    if(busquedaCategoria){
        res.json({
            data: null,
            state: 0,
            message: 'Categoria ya existe'
        });
    }else{
         // Guardar en BD
        await model.save();
        res.json({
            data: model,
            state: 1,
            message: 'Guardado exitosamente'
        });
    }
}

const postCanastaMegaCategoria = async (req, res = response) => {

    const { idCanasta,idMegaCategoria } = req.body;

    const model_all = await Categoria.findAll({
        where: {
            estado: 1,

            idMegaCategoria:idMegaCategoria,
        }
    })

    res.json({
        data: model_all,
        state: 1,
        message: ''
    });
}

const put = async (req, res = response) => {

    const { id } = req.params;

    delete req.body.id;

    const model = await Categoria.update(req.body, {
        where: {
            id: id,
        },
        individualHooks:true
    });

    res.json({
        data: [model],
        state: 1,
        message: 'Actualizado correctamente'
    });
}

const patch = (req, res = response) => {
    res.json({
        msg: 'patch API - CategoriaPatch'
    });
}

const deleted = async (req, res = response) => {
    const { id } = req.params;

    const model = await Categoria.update({
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
    postId,
    postDescripcion,
    post,
    postCanastaMegaCategoria,
    put,
    patch,
    deleted,
}