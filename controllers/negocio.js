
const { Sequelize } = require('sequelize');
const { Negocio } = require('../models/negocio');
const { Controller } = require('./controller');

const control = Controller(Negocio);

control.postDescripcion =  async (req = request, res = response) => {
  

    try {
        const model_all = await Negocio.findAll({
            where: {
                estado: 1,
                nombreComercial: Sequelize.where(
                    Sequelize.fn('LOWER', Sequelize.col('nombreComercial')),
                    'LIKE',
                    `%${req.body.descripcion.toLowerCase()}%`
                )
            }
        });

        res.status(201).json({
            data:model_all,
            state: 1,
            message: 'Lista'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            state: 0,
            message: 'Error en el servidor'
        });
    }

  
},

module.exports = control;