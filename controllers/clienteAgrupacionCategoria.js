const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where, Op, Sequelize, Model } = require('sequelize');
const { Controller } = require('./controller');
const { ClienteAgrupacionCategoria } = require('../models/clienteAgrupacionCategoria');
const { Categoria } = require('../models/categoria');
const { Cliente } = require('../models/cliente');
const { AgrupacionCategoriaCategoria } = require('../models/agrupacionCategoriaCategoria');

const control = Controller(ClienteAgrupacionCategoria);

control.postIdCliente = async (req = request, res = response) => {
    const model_all = await ClienteAgrupacionCategoria.findAll({
        where: {
            estado: 1,
            idCliente: req.body.idCliente
        },
        include: [
           {
            model:AgrupacionCategoriaCategoria,
            as:'AgrupacionCategoriaCategoria',
            include : [
                {
                    model:Categoria,
                    as:'Categoria'
                }
            ]
           }
        ]
    });

    res.json({
        data: model_all,
        state: 1,
        message: ''
    });
}


control.addCategoriasNuevo = async (req = request, res = response) => {
    const categorias = req.body.categoriasAgrupacion

    const model = new ClienteAgrupacionCategoria({
        idCliente : req.body.idCliente,
        nombre:req.body.nombreAgrupacionCategoria
    });

    const clienteAgrupacionCategoria = await ClienteAgrupacionCategoria.findOne({
        where: {
            [Op.and]: [
                Sequelize.where(
                    Sequelize.fn('LOWER', Sequelize.col('nombre')), 
                    Sequelize.fn('LOWER', req.body.nombreAgrupacionCategoria)
                ),
                { estado: 1 },
                { idCliente: req.body.idCliente }
            ]
        }
    });

    if(clienteAgrupacionCategoria){
        return res.json({
            data: [],
            state: 0,
            message: 'Ya existe una agrupacion con ese nombre'
        });
    }

    ///////Revisando si ya existe una agrupacion con categorias todas repetidas
    const clientesAgrupaciones = await ClienteAgrupacionCategoria.findAll({
        where : {
            idCliente : req.body.idCliente,
            estado:1
        },
        include : [
            {
                model:AgrupacionCategoriaCategoria,
                as : 'AgrupacionCategoriaCategoria'
            }
        ]
    });

    for (let i = 0; i < clientesAgrupaciones.length; i++) {
        const arrAgrupa = clientesAgrupaciones[i].AgrupacionCategoriaCategoria.map(x=>x.idCategoria).sort()
        const misCateTraidas = categorias.map(x=>x.id).sort()

        if(JSON.stringify(arrAgrupa) === JSON.stringify(misCateTraidas)){
            
            return res.json({
                data: [],
                state: 0,
                message: 'Ya existe una agrupacion con las mismas categorias'
            });
        }
    }
    /////////



        
    await model.save();

    for (let i = 0; i < categorias.length; i++) {
        const categoria = categorias[i];

        let miAgrupacionCategoria = new AgrupacionCategoriaCategoria({
            idClienteAgrupacionCategoria : model.id,
            idCategoria : categoria.id
        })
        await miAgrupacionCategoria.save();
    }

    res.json({
        data: model,
        state: 1,
        message: 'Agrupacion Agregado correactemente'
    });
}

control.editCategorias = async (req = request, res = response) => {
    const categorias = req.body.categoriasAgrupacion
    const idClienteAgrupacionCategoria = req.body.idClienteAgrupacionCategoria

    const clienteAgrupacionCategoria = await ClienteAgrupacionCategoria.findOne({
        where : {
            id : req.body.idClienteAgrupacionCategoria
        }
    });

    if(clienteAgrupacionCategoria.nombre != req.body.nombreAgrupacionCategoria){
        const clienteAgrupacionCategoriaBusca = await ClienteAgrupacionCategoria.findOne({
            where : {
                [Op.and]: [
                    Sequelize.where(
                        Sequelize.fn('LOWER', Sequelize.col('nombre')), 
                        Sequelize.fn('LOWER', req.body.nombreAgrupacionCategoria)
                    ),
                    { estado: 1 },
                    { idCliente : clienteAgrupacionCategoria.idCliente}
                ]
            }
        });
    
        if(clienteAgrupacionCategoriaBusca){
            return res.json({
                data: [],
                state: 0,
                message: 'Ya existe una agrupacion con ese nombre'
            });
        }
    }

    ///////Revisando si ya existe una agrupacion con categorias todas repetidas
    const clientesAgrupaciones = await ClienteAgrupacionCategoria.findAll({
        where : {
            idCliente : clienteAgrupacionCategoria.idCliente,
            id: {
                [Op.ne]: idClienteAgrupacionCategoria
            },
            estado:1
        },
        include : [
            {
                model:AgrupacionCategoriaCategoria,
                as : 'AgrupacionCategoriaCategoria'
            }
        ]
    });

    for (let i = 0; i < clientesAgrupaciones.length; i++) {
        
        const arrAgrupa = clientesAgrupaciones[i].AgrupacionCategoriaCategoria.map(x=>x.idCategoria).sort()
        const misCateTraidas = categorias.map(x=>x.id).sort()

        if(JSON.stringify(arrAgrupa) === JSON.stringify(misCateTraidas)){
            
            return res.json({
                data: [],
                state: 0,
                message: 'Ya existe una agrupacion con las mismas categorias'
            });
        }
    }
    /////////

    
    await ClienteAgrupacionCategoria.update(
        {
            nombre:req.body.nombreAgrupacionCategoria
        }, {
        where: {
            id: req.body.idClienteAgrupacionCategoria,
        }
    });

    await AgrupacionCategoriaCategoria.destroy({
        where : {
            idClienteAgrupacionCategoria : idClienteAgrupacionCategoria
        }
    })


    for (let i = 0; i < categorias.length; i++) {
        const categoria = categorias[i];

        let miAgrupacionCategoria = new AgrupacionCategoriaCategoria({
            idClienteAgrupacionCategoria : idClienteAgrupacionCategoria,
            idCategoria : categoria.id
        })
        await miAgrupacionCategoria.save();
    }

    res.json({
        data: [],
        state: 1,
        message: 'Agrupacion modificada correactemente'
    });
}



module.exports = control;