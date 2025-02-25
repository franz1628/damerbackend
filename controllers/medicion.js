const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where, Sequelize } = require('sequelize');
const { Medicion } = require('../models/medicion');
const e = require('express');
const { db } = require('../database/config');

const get = async (req = request, res = response) => {
    const model_all = await Medicion.findAll({
        where: {
            estado: 1
        },
        order : [['id', 'DESC']]
    })

    res.json({
        data: model_all,
        state: 1,
        message: ''
    });
}

const post = async (req, res = response) => {
  


    const resultado = await db.query('EXEC dbo.creaMedicion', {
        type: Sequelize.QueryTypes.SELECT,// Tipo de consulta
    });

    console.log(resultado);
    if(resultado[0].nuevaMedicion){
        res.json({
            data: [],
            state: 1,
            message: resultado[0].nuevaMedicion
        });
    }else{
        res.json({
            data: [],
            state: 0,
            message: resultado[0].error
        });
    }
  

}

const nextMedicion = async (req, res = response) => { 
    const model_last = await Medicion.findOne({
        order: [
            ['id', 'DESC']
        ]
    });

    const {anio,mes} = model_last;

    if(mes==12){ 
        model_last.anio = anio+1;
        model_last.mes = 1;
    } else{
        model_last.anio = anio;
        model_last.mes = mes+1;
    }

    model_last.medicion =  model_last.anio%100 + '' + (model_last.mes<10 ? '0'+model_last.mes : model_last.mes);

    res.json({
        data: model_last,
        state: 1,
        message: ''
    });
}

const put = async (req, res = response) => {

    const { id } = req.params;

    delete req.body.id;

    const model = await Medicion.update(req.body, {
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
        msg: 'patch API - MedicionPatch'
    });
}

const deleted = async (req, res = response) => {
    const { id } = req.params;

    const model = await Medicion.update({
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
    post,
    nextMedicion,
    put,
    patch,
    deleted,
}