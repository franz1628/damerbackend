
const { Cliente } = require('../models/cliente');
const { Usuario } = require('../models/usuario');
const { Controller } = require('./controller');

const control = Controller(Cliente);

control.get = async (req = request, res = response) => {
    const model_all = await Cliente.findAll({
        where: {
            estado: 1
        },
        include : [
            {
                model:Usuario,
                as:'Usuario'
            }
        ]
    })

    res.json({
        data: model_all,
        state: 1,
        message: ''
    });
}

module.exports = control;