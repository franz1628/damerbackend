const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where, Op, Sequelize } = require('sequelize');
const { CategoriaAtributoTecnico } = require('../models/categoriaAtributoTecnico');
const { SkuAtributoTecnicoVariedadValor } = require('../models/skuAtributoTecnicoVariedadValor');
const { Sku } = require('../models/sku');
const { AtributoTecnicoVariedadValor } = require('../models/atributoTecnicoVariedadValor');
const { UnidadMedida } = require('../models/unidadMedida');
const { TipoUnidadMedida } = require('../models/tipoUnidadMedida');
const { AgrupacionCategoriaCategoria } = require('../models/agrupacionCategoriaCategoria');
const { Categoria } = require('../models/categoria');

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
        },
        include:[
            {
                model:UnidadMedida,
                as:'UnidadMedida'
            },
            {
                model:TipoUnidadMedida,
                as:'TipoUnidadMedida'
            },
            {
                model: CategoriaAtributoTecnico,
                as:'CategoriaAtributoTecnico'
            }
        ]
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
    
    req.body.idTipoUnidadMedida = parseInt(req.body.idTipoUnidadMedida)

    const { id } = req.params;

    delete req.body.id;

    const model = await SkuAtributoTecnicoVariedadValor.update(req.body, {
        where: {
            id: id,
        },
        individualHooks: true
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

const postResultados =  async (req, res = response) => {
    try {
        const idAtributoTecnicoVariedadValors = req.body.idAtributoTecnicoVariedadValors
        const arrayA = idAtributoTecnicoVariedadValors.split(',');
        

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
       
        const model_all = await SkuAtributoTecnicoVariedadValor.findAll({
            where: {
                estado: 1,
                idAtributoTecnicoVariedadValor: {
                    [Op.in]: arrayA
                }
            },
            include: [
                {
                    model: Sku,
                    as: 'Sku',
                    where: {
                        idCategoria : {
                            [Op.in] : categorias
                        }
                    },
                },
                {
                    model: AtributoTecnicoVariedadValor,
                    as:'AtributoTecnicoVariedadValor'
                }
            ]
        })

    
 
        res.status(201).json({
            data:model_all,
            state: 1,
            message: 'Listado correctamente'
        });
    } catch (error) {
        
        res.status(500).json({
            state: 0,
            message: error
        });
    }
}

module.exports = {
    get,
    postIdSku,
    postResultados,
    post,
    put,
    patch,
    deleted,
}