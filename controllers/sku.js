const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where, Sequelize, Op } = require('sequelize');
const { Sku } = require('../models/sku');
const { Canasta } = require('../models/canasta');
const { MegaCategoria } = require('../models/megaCategoria');
const { Categoria } = require('../models/categoria');
const { SkuAtributoTecnicoVariedadValor } = require('../models/skuAtributoTecnicoVariedadValor');
const { AtributoTecnicoVariedad } = require('../models/atributoTecnicoVariedad');
const { AtributoTecnicoVariedadValor } = require('../models/atributoTecnicoVariedadValor');
const { AgrupacionCategoriaCategoria } = require('../models/agrupacionCategoriaCategoria');
const { SkuHijos } = require('../models/skuHijos');
const path = require('path');
const fs = require('fs');
const { TipoUnidadMedida } = require('../models/tipoUnidadMedida');
const { UnidadMedida } = require('../models/unidadMedida');

const get = async (req = request, res = response) => {
    const model_all = await Sku.findAll({
        where: {

        },
        include: [
            {
                model: Canasta,
                as: 'Canasta',
            },
            {
                model: MegaCategoria,
                as: 'MegaCategoria',
            },
            {
                model: Categoria,
                as: 'Categoria',
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
        data: model,
        state: 1,
        message: ''
    });
}

const postByCategoria = async (req, res = response) => {

    const { idCategoria } = req.body;

    const model_all = await Sku.findAll({
        where: {
            estado: {
                [Op.or]: [1, 2]
            },
            idCategoria: idCategoria,
        },
        include: [
            {
                model: Canasta,
                as: 'Canasta',
            },
            {
                model: MegaCategoria,
                as: 'MegaCategoria',
            },
            {
                model: Categoria,
                as: 'Categoria',
            },
           /* {
                model:TipoUnidadMedida,
                as:'TipoUnidadMedida'
            },
            {
                model:UnidadMedida,
                as:'UnidadMedida'
            }
            ,*/
            {
                model: SkuAtributoTecnicoVariedadValor,
                as: 'SkuAtributoTecnicoVariedadValor',
                include: [
                    {
                        model: AtributoTecnicoVariedad,
                        as: 'AtributoTecnicoVariedad'
                    },
                    {
                        model: AtributoTecnicoVariedadValor,
                        as: 'AtributoTecnicoVariedadValor'
                    },
                    {
                        model:TipoUnidadMedida,
                        as:'TipoUnidadMedida'
                    },
                    {
                        model:UnidadMedida,
                        as:'UnidadMedida'
                    }
                ]
            },
            {
                model: SkuHijos,
                as: 'SkuHijos',
                include: [
                    {
                        model: Sku,
                        as: 'Sku',
                        include: [
                            {
                                model: Categoria,
                                as: 'Categoria'
                            }
                        ]
                    }
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

const postByCategoriaAll = async (req, res = response) => {

    const { idClienteAgrupacionCategoria } = req.body;



    const agrupacionCategoriaCategorias = await AgrupacionCategoriaCategoria.findAll({
        where: {
            idClienteAgrupacionCategoria: idClienteAgrupacionCategoria
        }, include: [
            {
                model: Categoria,
                as: 'Categoria'
            }
        ]
    })

    let categorias = [];
    agrupacionCategoriaCategorias.map(x => {
        categorias.push(x.Categoria.id);
    })

    const model_all = await Sku.findAll({
        where: {
            estado: {
                [Op.or]: [0, 1]
            },
            idCategoria: {
                [Op.in]: categorias
            }
        },
        include: [
            {
                model: Categoria,
                as: 'Categoria',
            },
            {
                model: SkuAtributoTecnicoVariedadValor,
                as: 'SkuAtributoTecnicoVariedadValor',
                include: [
                    {
                        model: AtributoTecnicoVariedad,
                        as: 'AtributoTecnicoVariedad'
                    },
                    {
                        model: AtributoTecnicoVariedadValor,
                        as: 'AtributoTecnicoVariedadValor'
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
            id: req.body.id
        },
        include: [
            {
                model: Canasta,
                as: 'Canasta',
            },
            {
                model: MegaCategoria,
                as: 'MegaCategoria',
            },
            {
                model: Categoria,
                as: 'Categoria',
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
        include: [
            {
                model: Canasta,
                as: 'Canasta',
            },
            {
                model: MegaCategoria,
                as: 'MegaCategoria',
            },
            {
                model: Categoria,
                as: 'Categoria',
            },
            {
                model: SkuHijos,
                as: 'SkuHijos',
                include: [
                    {
                        model: Sku,
                        as: 'Sku'
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
            idCategoria: req.body.idCategoria,
            tipoSku: 1
        },
        include: [
            {
                model: Canasta,
                as: 'Canasta',
            },
            {
                model: MegaCategoria,
                as: 'MegaCategoria',
            },
            {
                model: Categoria,
                as: 'Categoria',
            },
            {
                model: SkuHijos,
                as: 'SkuHijos',
                include: [
                    {
                        model: Sku,
                        as: 'Sku'
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
    delete req.body.image;


    try {

        await Sku.update(req.body, {
            where: {
                id: id,
            }
        });

      
        const updatedModel = await Sku.findOne({
            where: {
                id: id,
            },
            include: [
                {
                    model: Canasta,
                    as: 'Canasta',
                },
                {
                    model: MegaCategoria,
                    as: 'MegaCategoria',
                },
                {
                    model: Categoria,
                    as: 'Categoria',
                },
            ]
        });

        return res.json({
            data: updatedModel,
            state: 1,
            message: 'Actualizado correctamente'
        });
    } catch (error) {
        return res.status(500).json({
            data: null,
            state: 0,
            message: 'Error al actualizar el modelo',
            error: error.message
        });
    }
}


const deleteImage = async (req, res = response) => {
    const miPath = path.join('public/uploads/sku', req.body.image);

    // Verificar si el archivo existe
    fs.access(miPath, fs.constants.F_OK, (err) => {
        if (err) {

        } else {
            fs.unlink(miPath, (err) => {

            });
        }



    });

    const id = req.body.id;
    delete req.body.id;

    const model = await Sku.update({ image: '' }, {
        where: {
            id: id,
        }
    });


    return res.json({
        data: [model],
        state: 1,
        message: 'Imagen Eliminada correctamente'
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
        message: 'Eliminado correctamente'
    });
}

const suspender = async (req, res = response) => {

    const sku = await Sku.findOne({
        where : {
            id:req.body.model.id
        }
    })

    let newestado = sku.estado==2?1:2

    const model = await Sku.update({
        estado: newestado
    }, {
        where: {
            id: req.body.model.id,
        }
    });

    res.json({
        data: [],
        state: 1,
        message: 'Suspendido correctamente'
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
    deleteImage,
    suspender,
}