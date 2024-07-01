const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const {  Departamento } = require('../models/departamento');
const { where } = require('sequelize');

const departamentoGet = async (req = request, res = response) => {

    const departamento_all = await Departamento.findAll({
        where: {
            estado: 1
        }
    })

    res.json({
        data: departamento_all,
        state: 1,
        message: ''
    });
}

const departamentoPost = async (req, res = response) => {
    delete req.body.id;
    const departamento = new Departamento(req.body);

    // Guardar en BD
    await departamento.save();

    res.json({
        departamento
    });
}

const departamentoPut = async (req, res = response) => {

    const { id } = req.params;

    delete req.body.id;
  

    const departamento = await Departamento.update(req.body, {
        where: {
            id: id,
        }
    });

    res.json({
        data: [departamento],
        state: 1,
        message: 'Actualizado correctamente'
    });
}

const departamentoPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - departamentoPatch'
    });
}

const departamentoDelete = async (req, res = response) => {
    const { id } = req.params;

    const departamento = await Departamento.update({
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
    departamentoGet,
    departamentoPost,
    departamentoPut,
    departamentoPatch,
    departamentoDelete,
}