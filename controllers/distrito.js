const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where, Op } = require('sequelize');
const { Distrito } = require('../models/distrito');
const { Provincia } = require('../models/provincia');
const { Departamento } = require('../models/departamento');
const { Zona } = require('../models/zona');

const get = async (req = request, res = response) => {

    const model_all = await Distrito.findAll({
        where: {
            estado: 1
        },
        include : [
            {
                model:Provincia,
                as:'Provincia'
            },
            {
                model:Zona,
                as:'Zona'
            }
        ],
        order: [
            ['descripcion', 'ASC']
        ]
    })

    res.json({
        data: model_all,
        state: 1,
        message: ''
    });
}

const getId = async (req = request, res = response) => {

    const model = await Distrito.findOne({
        where: {
            estado: 1,
            id:req.params.id
        },
        include : [
            {
                model:Provincia,
                as:'Provincia'
            },
            {
                model:Zona,
                as:'Zona'
            }
        ],
        order: [
            ['descripcion', 'ASC']
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
    const model = new Distrito(req.body);

    // Guardar en BD
    await model.save();

    res.json({
        model
    });
}

const postByZona = async (req, res = response) => {
    const zona  = req.body.zona
    const distritos = await Distrito.findAll({
        where : {
            estado:1,
            idZona:zona.id
        },
        include:[
            {
                model:Provincia,
                as:'Provincia',
                include: [
                    {
                        model:Departamento,
                        as:'Departamento'
                    }
                ]
            }
        ]
    })

    const distritoSubZonas = await Distrito.findAll({
        where: {
            [Op.or]: [
                { idSubZonas: { [Op.like]: `${zona.id},%` } }, // Al principio
                { idSubZonas: { [Op.like]: `%,${zona.id},%` } }, // En el medio
                { idSubZonas: { [Op.like]: `%,${zona.id}` } }, // Al final
                { idSubZonas: `${zona.id}`} // Exacta coincidencia
            ]
        },
        include:[
            {
                model:Provincia,
                as:'Provincia',
                include: [
                    {
                        model:Departamento,
                        as:'Departamento'
                    }
                ]
            }
        ]
    })

    const allDistritos = [...new Map(
        [...distritos, ...distritoSubZonas].map(item => [item.id, item])
    ).values()];

    res.json({
        data: allDistritos,
        state: 1,
        message: 'Listado'
    });
}

const put = async (req, res = response) => {

    const { id } = req.params;

    delete req.body.id;
    
    const zona = await Zona.findOne({
        where : {
            id : req.body.idZona
        }
    });

    const distrito = await Distrito.findOne({
        where : {
            id : id
        },
        include:[{
            model:Zona,
            as:'Zona'
        }]
    })

    if(zona && distrito.Zona && zona.id != distrito.idZona){
        if(distrito.Zona && zona.planificadorRuta==1 && distrito.Zona.planificadorRuta==1){
            return res.json({
                data: [],
                state: 0,
                message: 'Este distrito ya tiene una Zona con planificador de ruta'
            });
        }
    }

    if(zona.planificadorRuta==0){
        const miSubzonas = distrito.idSubZonas;

        let arr = [];
        if(miSubzonas){
            arr = miSubzonas.split(',');
        }

        arr.push(req.body.idZona)
        const newSubZonas = arr.join(',');

        const model = await Distrito.update({idSubZonas:newSubZonas}, {
            where: {
                id: id,
            },
            individualHooks : true
        });
        res.json({
            data: [model],
            state: 1,
            message: 'Actualizado correctamente'
        });

    }else{
        const { idSubZonas, ...miDistrito } = req.body;
        const model = await Distrito.update(miDistrito, {
            where: {
                id: id,
            },
            individualHooks : true
        });
    
        res.json({
            data: [model],
            state: 1,
            message: 'Actualizado correctamente'
        });
    }

   
}

const postQuitarZona = async (req, res = response) => {

    const { id } = req.params;
    const idZona = req.body.idZona;

    delete req.body.id;

    const distrito = await Distrito.findOne({
        where : {
            id : id
        }
    })

    if(distrito.idZona == idZona){// se esta quitando un distrito de una zona con ruta
        await Distrito.update({
            idZona:0
        },{
            where : {
                id:id
            }
        })
    }else{ // quitando distrito de una zona sin ruta o subzona
        const idSubZonas = distrito.idSubZonas;
        const arr = idSubZonas.split(',') 
        const newArray = arr.filter(item => item != idZona);
        await Distrito.update({
            idSubZonas:newArray.join(',')
        },{
            where : {
                id:id
            }
        })
    }   

    res.json({
        data: [],
        state: 1,
        message: 'Borrado correctamente'
    });
}

const patch = (req, res = response) => {
    res.json({
        msg: 'patch API - distritoPatch'
    });
}

const deleted = async (req, res = response) => {
    const { id } = req.params;

    const model = await Distrito.update({
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
    getId,
    post,
    postByZona,
    postQuitarZona,
    put,
    patch,
    deleted,
}