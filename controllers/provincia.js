const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where, Op, Sequelize, fn, col } = require('sequelize');
const { Provincia } = require('../models/provincia');
const { Departamento } = require('../models/departamento');

const provinciaGet = async (req = request, res = response) => {

    const provincia_all = await Provincia.findAll({
        where: {
            estado: 1
        },
        include : [
            {
                model:Departamento,
                as:'Departamento'
            }
        ]
    })

    res.json({
        data: provincia_all,
        state: 1,
        message: ''
    });
}

const provinciaPost = async (req, res = response) => {
    delete req.body.id;
    const provincia = new Provincia(req.body);

    const buscaProvin = await Provincia.findOne({
        where : {
             [Op.and]: [
                Sequelize.where(
                    fn('LOWER', col('descripcion')),
                    fn('LOWER', req.body.descripcion)
                ),
                {
                    idDepartamento:req.body.idDepartamento,
                    estado: 1,
                },
            ],
        }
    })    


    if(buscaProvin){
        return res.json({
            data: [],
            state: 0,
            message: 'Ya existe esa provincia en ese departamento'
        });
    }

    await provincia.save();

    res.json({
        data: [provincia],
        state: 1,
        message: 'Agregado correctamente'
    });
}

const provinciaPut = async (req, res = response) => {

    const { id } = req.params;

    delete req.body.id;

    const buscaProvin = await Provincia.findOne({
        where : {
            [Op.and]: [
                Sequelize.where (
                    fn('LOWER', col('descripcion')),
                    fn('LOWER', req.body.descripcion)
                ),
                {
                    id: {
                        [Op.ne]: id 
                    },
                    idDepartamento:req.body.idDepartamento,
                    estado: 1,
                },
            ],
        }
    })    

    if(buscaProvin){
        return res.json({
            data: [],
            state: 0,
            message: 'Ya existe esa provincia en ese departamento'
        });
    }

    const provincia = await Provincia.update(req.body, {
        where: {
            id: id,
        }
    });

    res.json({
        data: [provincia],
        state: 1,
        message: 'Actualizado correctamente'
    });
}

const provinciaPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - provinciaPatch'
    });
}

const provinciaDelete = async (req, res = response) => {
    const { id } = req.params;

    const provincia = await Provincia.update({
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
    provinciaGet,
    provinciaPost,
    provinciaPut,
    provinciaPatch,
    provinciaDelete,
}