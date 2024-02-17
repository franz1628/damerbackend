
const { ContratoDetalle } = require('../models/contratoDetalle');
const { Controller } = require('./controller');

const control = Controller(ContratoDetalle);

control.postAll =  async (req, res = response) => {
    try {
      
        const models = await ContratoDetalle.bulkCreate(req.body.map(item => {

            delete item.id;
            return item;
        }));

        res.status(201).json({
            models,
            state: 1,
            message: 'Model creada correctamente'
        });
    } catch (error) {
        res.status(500).json({
            state: 0,
            message: 'Internal Server Error'
        });
    }
}


control.getIdContrato =  async (req, res = response) => {
    try {
      
        const model_all = await ContratoDetalle.findAll({
            where: {
                estado: 1,
                idContrato: req.params.idContrato
            }
        })

        res.status(201).json({
            data:model_all,
            state: 1,
            message: 'Lista de detalle'
        });
    } catch (error) {
        res.status(500).json({
            state: 0,
            message: 'Internal Server Error'
        });
    }
}

control.postDeleteDetalleContrato =  async (req, res = response) => {
    try {
      
        await ContratoDetalle.destroy({
            where : {
                idContrato : req.body.idContrato
            }
        });

        res.status(201).json({
            data:[],
            state: 1,
            message: 'Model creada correctamente'
        });
    } catch (error) {
        res.status(500).json({
            state: 0,
            message: 'Internal Server Error'
        });
    }
}

module.exports = control;