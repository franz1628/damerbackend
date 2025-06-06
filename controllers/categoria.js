const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where, Op, Sequelize } = require('sequelize');
const { Categoria } = require('../models/categoria');
const { Sku } = require('../models/sku');
const { CategoriaAtributoTecnico } = require('../models/categoriaAtributoTecnico');
const { TipoCategoria } = require('../models/tipoCategoria');
const { AtributoTecnicoVariedad } = require('../models/atributoTecnicoVariedad');


const get = async (req = request, res = response) => {
    const model_all = await Categoria.findAll({
        where: {
            estado: 1
        },
        order: [
            ['descripcion', 'ASC']
        ],
       
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

const changeState = async (req, res = response) => {

    const model = await Categoria.findOne({
        where: {
            id: req.body.id,
        }
    });

    model.estado = req.body.estado;
    const newModel = await Categoria.update({estado: !req.body.estado}, {
        where: {
            id: req.body.id,
        }
    });
    

    return res.json({
        data: newModel,
        state: 1,
        message: req.body.estado ? 'Desactivado correctamente' : 'Activado correctamente'
    });
}



const getCategorias = async (req, res = response) => {

    const categorias = req.body.idCategorias.split(',');

    const model_all = await Categoria.findAll({
        where: {
            estado: 1,
            id: {
                [Op.in]: categorias
            }
        },
        order: [
            ['descripcion', 'ASC']
        ],
        include : [
            {
                model: CategoriaAtributoTecnico,
                as : 'CategoriaAtributoTecnico',
                include : [
                    {
                        model: AtributoTecnicoVariedad,
                        as : 'AtributoTecnicoVariedad',
                    }
                ]
            }
        ]
    });

    

    return res.json({
        data: model_all,
        state: 1,
        message: 'Correcto'
    });
}

const postCanastaMegaCategoria = async (req, res = response) => {

    const { idCanasta,idMegaCategoria } = req.body;

    const model_all = await Categoria.findAll({
        where: {
            estado: 1,
            idMegaCategoria:idMegaCategoria,
        },
        order: [
            ['descripcion', 'ASC']
        ], 
        include : [
            {
                model: CategoriaAtributoTecnico,
                as : 'CategoriaAtributoTecnico',
            },
            {
                model: TipoCategoria,
                as : 'TipoCategoria',
                foreignKey:'idTipoCategoria'
            }
        ]
    })

    res.json({
        data: model_all,
        state: 1,
        message: ''
    });
}

const postCanastaMegaCategoriaAll = async (req, res = response) => {

    const { idCanasta,idMegaCategoria } = req.body;

    const model_all = await Categoria.findAll({
        where: {
            idMegaCategoria:idMegaCategoria,
        },
        order: [
            ['descripcion', 'ASC']
        ], 
        include : [
            {
                model: CategoriaAtributoTecnico,
                as : 'CategoriaAtributoTecnico',
            },
            {
                model: TipoCategoria,
                as : 'TipoCategoria',
                foreignKey:'idTipoCategoria'
            }
        ]
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

    const skus = await Sku.findAll({
        where:{
            idCategoria : id
        }
    })

    if(skus.length>0){
        return res.json({
            data: null,
            state: 0,
            message: 'No se puede actualizar la descripcion si la categoria tiene skus'
        });
    }

    const model = await Categoria.update(req.body, {
        where: {
            id: id,
        },
        individualHooks:true
    });

    res.json({
        data: model,
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

    const skus = await Sku.findAll({
        where:{
            idCategoria : id
        }
    })
  
    
    if(skus.length>0){
        return res.json({
            data: null,
            state: 0,
            message: 'No se puede eliminar si la categoria tiene skus asociados'
        });
    }

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
    changeState,
    getCategorias,
    postDescripcion,
    post,
    postCanastaMegaCategoria,
    postCanastaMegaCategoriaAll,
    put,
    patch,
    deleted,
}