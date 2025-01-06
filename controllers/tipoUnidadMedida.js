const { response, request } = require('express');
const { TipoUnidadMedida } = require('../models/tipoUnidadMedida');
const { CategoriaAtributoTecnico } = require('../models/categoriaAtributoTecnico');
const { Op } = require('sequelize');

const get = async (req = request, res = response) => {
    const model_all = await TipoUnidadMedida.findAll({
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
    const model = await TipoUnidadMedida.findOne({
        where: {
            estado: 1,
            codigo : req.body.codigo
        }
    })

    res.json(
        model
    );
}


const postTipoMedidaxCategoria = async (req = request, res = response) => {
    const categoriasAtributosTecnicos = await CategoriaAtributoTecnico.findAll({
        where: {
            estado: 1,
            idCategoria : req.body.idCategoria,
            idTipoUnidadMedida : {
                [Op.ne] : 0
            }
        },
        include : [
            {
                model: TipoUnidadMedida,
                as : 'TipoUnidadMedida'
            }
        ]
    });

    let tipos = [];
    categoriasAtributosTecnicos.map(x => {
        tipos.push(x.TipoUnidadMedida);
    })

   res.json({
        data: tipos,
        state: 1,
        message: 'Lista'
    });
}

const post = async (req, res = response) => {
    delete req.body.id;
    const model = new TipoUnidadMedida(req.body);

    // Guardar en BD
    await model.save();

    res.json({
        model
    });
}


const put = async (req, res = response) => {

    const { id } = req.params;

    delete req.body.id;

    const model = await TipoUnidadMedida.update(req.body, {
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
        msg: 'patch API - TipoUnidadMedidaPatch'
    });
}

const deleted = async (req, res = response) => {
    const { id } = req.params;

    const model = await TipoUnidadMedida.update({
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
    postTipoMedidaxCategoria,
    post,
    put, 
    patch,
    deleted,
}