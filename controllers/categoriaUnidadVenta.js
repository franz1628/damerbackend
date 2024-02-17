
const {  CategoriaUnidadVenta } = require('../models/categoriaUnidadVenta');
const { Categoria } = require('../models/categoria');
const { UnidadVenta } = require('../models/unidadVenta');
let { Controller } = require('./controller');

let control = Controller(CategoriaUnidadVenta);


control.postIdCategoria  = async (req = request, res = response) => {
    const model_all = await CategoriaUnidadVenta.findAll({
        where: {
            estado: 1,
            idCategoria: req.body.idCategoria
        },
        include: [
            {
                model: Categoria,
                as: 'Categoria'
            },
            {
                model: UnidadVenta,
                as: 'UnidadVenta'
            }
        ]
    });

    res.json({
        data: model_all,
        state: 1,
        message: ''
    });
}



module.exports = control;