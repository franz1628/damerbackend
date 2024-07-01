const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where, Op, Sequelize } = require('sequelize');
const { CategoriaAtributoTecnico } = require('../models/categoriaAtributoTecnico');
const { CategoriaAtributoTecnicoValor } = require('../models/categoriaAtributoTecnicoValor');
const { AtributoTecnicoVariedad } = require('../models/atributoTecnicoVariedad');
const { AtributoTecnicoVariedadValor } = require('../models/atributoTecnicoVariedadValor');
const { AgrupacionCategoriaCategoria } = require('../models/agrupacionCategoriaCategoria');
const { Categoria } = require('../models/categoria');

const get = async (req = request, res = response) => {
    const model_all = await CategoriaAtributoTecnico.findAll({
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

const postId = async (req = request, res = response) => {
    const idClienteAgrupacionCategoria = req.body.idClienteAgrupacionCategoria;

    const agrupacionCategoriaCategorias = await AgrupacionCategoriaCategoria.findAll({
        where : {
            idClienteAgrupacionCategoria : idClienteAgrupacionCategoria
        },include : [
            {
                model:Categoria,
                as:'Categoria'
            }
        ]
    })

    let categorias = [];

    agrupacionCategoriaCategorias.map(x=>{
        categorias.push(x.Categoria.id);
    })
    
    categorias = [...new Set(categorias)];

    const model = await CategoriaAtributoTecnico.findAll({
        where: {
            estado: 1,
            idCategoria : {
                [Op.in] : categorias
            }
        },
        include: [{
            model: CategoriaAtributoTecnicoValor,
            as: 'CategoriaAtributoTecnicoValor',
            include: [{
                model: AtributoTecnicoVariedadValor,
                as: 'AtributoTecnicoVariedadValor'
            }]

        },
        {
            model: AtributoTecnicoVariedad,
            as: 'AtributoTecnicoVariedad'
        }


        ]
    })

    
    res.json({
        data: model,
        state: 1,
        message: ''
    });

  
}

const byIdCategoria = async (req = request, res = response) => {
   
    const model = await CategoriaAtributoTecnico.findAll({
        where: {
            estado: 1,
            idCategoria : req.body.idCategoria
        },
        include: [{
            model: CategoriaAtributoTecnicoValor,
            as: 'CategoriaAtributoTecnicoValor',
            include: [{
                model: AtributoTecnicoVariedadValor,
                as: 'AtributoTecnicoVariedadValor'
            }]

        },
        {
            model: AtributoTecnicoVariedad,
            as: 'AtributoTecnicoVariedad'
        }


        ]
    })

    
    res.json({
        data: model,
        state: 1,
        message: ''
    });

  
}

const postIdAgrupacionCategoria = async (req = request, res = response) => {
    const model = await CategoriaAtributoTecnico.findAll({
        where: {
            estado: 1,
            idAgrupacionCategoria: req.body.idAgrupacionCategoria
        },
        include: [{
            model: CategoriaAtributoTecnicoValor,
            as: 'CategoriaAtributoTecnicoValor',
            include: [{
                model: AtributoTecnicoVariedadValor,
                as: 'AtributoTecnicoVariedadValor'
            }]

        },
        {
            model: AtributoTecnicoVariedad,
            as: 'AtributoTecnicoVariedad'
        }


        ]
    })


    res.json(
        model
    );
}


const post = async (req, res = response) => {
    delete req.body.id;
    const model = new CategoriaAtributoTecnico(req.body);

    // Guardar en BD
    await model.save();

    res.json({
        model
    });
}


const put = async (req, res = response) => {

    const { id } = req.params;

    delete req.body.id;

    const model = await CategoriaAtributoTecnico.update(req.body, {
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
        msg: 'patch API - CategoriaAtributoTecnicoPatch'
    });
}

const deleted = async (req, res = response) => {
    const { id } = req.params;

    const model = await CategoriaAtributoTecnico.update({
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
    byIdCategoria,
    postIdAgrupacionCategoria,
    post,
    put,
    patch,
    deleted,
}