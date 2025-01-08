
const {  CategoriaUnidadVenta } = require('../models/categoriaUnidadVenta');
const { Categoria } = require('../models/categoria');
const { UnidadVenta } = require('../models/unidadVenta');
let { Controller } = require('./controller');

let control = Controller(CategoriaUnidadVenta);

control.post  = async (req = request, res = response) => {
    try {
        delete req.body.id;
        const model = new CategoriaUnidadVenta(req.body);

        if(req.body.default){
            await CategoriaUnidadVenta.update({default:0}, {
                where: {
                    idCategoria: req.body.idCategoria,
                },
            });
        }


        await model.save();

        res.status(201).json({
            data: model,
            state: 1,
            message: 'Model creada correctamente'
        });
    } catch (error) {
        res.status(500).json({
            data: [],
            state: 0,
            message: error
        });
    }
}

control.put  = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        delete req.body.id;

        if(req.body.default){
            await CategoriaUnidadVenta.update({default:0}, {
                where: {
                    idCategoria: req.body.idCategoria,
                },
            });
        }

        const [rowsAffected, updatedModel] = await CategoriaUnidadVenta.update(req.body, {
            where: {
                id: id,
            },
            returning: true,
            individualHooks: true
        });

        if (rowsAffected === 0) {
            return res.status(404).json({
                state: 0,
                message: 'Registro no encontrado',
            });
        }

        res.json({
            data: [updatedModel],
            state: 1,
            message: 'Actualizado correctamente',
        });
    } catch (error) {
        res.status(500).json({
            state: 0,
            message: error.toString(),
        });
    }
}

control.postIdCategoria  = async (req = request, res = response) => {
    const model_all = await CategoriaUnidadVenta.findAll({
        where: {
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


control.suspender = async (req, res = response) => {

    const categoriaUnidadVenta = await CategoriaUnidadVenta.findOne({
        where : {
            id:req.body.model.id
        }
    })

    let newestado = categoriaUnidadVenta.estado==0?1:0

    const model = await CategoriaUnidadVenta.update({
        estado: newestado
    }, {
        where: {
            id: req.body.model.id,
        },
        individualHooks:true
    });

    res.json({
        data: [],
        state: 1,
        message: 'Suspendido correctamente'
    });
}



module.exports = control;