
const { Sequelize } = require('sequelize');
const { Negocio } = require('../models/negocio');
const { Controller } = require('./controller');
const { Distrito } = require('../models/distrito');
const { Zona } = require('../models/zona');
const { Provincia } = require('../models/provincia');
const { Departamento } = require('../models/departamento');

const control = Controller(Negocio);

control.negocioXZona  =  async (req = request, res = response) => {

    try {
        const idZona = req.body.idZona;
        const negocios = await Negocio.findAll({
          include:[
            {
                model:Distrito,
                as:'Distrito',
                where: {
                    idZona : idZona
                },
                include : [
                    {
                        model:Zona,
                        as:'Zona'
                    },
                    {
                        model:Provincia,
                        as : 'Provincia',
                        include:[
                            {
                                model:Departamento,
                                as:'Departamento'
                            }
                        ]
                    }
                ]
            }
          ]
        });

        res.status(201).json({
            data:negocios,
            state: 1,
            message: 'Lista'
        });
    } catch (error) {
       
        res.status(500).json({
            state: 0,
            message: 'Error en el servidor'
        });
    }

  
};

control.postDescripcion =  async (req = request, res = response) => {
  

    try {
        const model_all = await Negocio.findAll({
            where: {
         
                nombreComercial: Sequelize.where(
                    Sequelize.fn('LOWER', Sequelize.col('nombreComercial')),
                    'LIKE',
                    `%${req.body.descripcion.toLowerCase()}%`
                )
            },
            include : [
                {
                    model:Distrito,
                    as:'Distrito',
                    include: [
                        {
                            model:Zona,
                            as:'Zona'
                        },
                        {
                            model:Provincia,
                            as : 'Provincia',
                            include:[
                                {
                                    model:Departamento,
                                    as:'Departamento'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        res.status(201).json({
            data:model_all,
            state: 1,
            message: 'Lista'
        });
    } catch (error) {
       
        res.status(500).json({
            state: 0,
            message: 'Error en el servidor'
        });
    }

  
},

module.exports = control;