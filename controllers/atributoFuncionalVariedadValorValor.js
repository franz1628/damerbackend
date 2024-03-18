
const { AtributoFuncionalVariedadValorValor } = require('../models/atributoFuncionalVariedadValorValor');
const { Controller } = require('./controller');

const control = Controller(AtributoFuncionalVariedadValorValor);


control.enviarAtributos = async (req = request, res = response) => {
    try {
        const idAtributoFuncionalVariedadValor = req.body.idAtributoFuncionalVariedadValor

        const models = await AtributoFuncionalVariedadValorValor.bulkCreate(req.body.idAtributoTecnicoVariedadValors.map(item => {
            return {
                idAtributoFuncionalVariedadValor:idAtributoFuncionalVariedadValor,
                idAtributoTecnicoVariedadValor:item
            };
        }));

        res.status(201).json({
            models,
            state: 1,
            message: 'Registro correcto'
        });
    } catch (error) {
        res.status(500).json({
            state: 0,
            message: error
        });
    }
}

module.exports = control;