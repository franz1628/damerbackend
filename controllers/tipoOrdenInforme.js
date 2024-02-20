
const { TipoEstudio } = require('../models/tipoEstudio');
const { TipoInformeOrden } = require('../models/tipoInformeOrden');
const { TipoInformeOrdenTipoEstudio } = require('../models/tipoInformeOrdenTipoEstudio');
const { Controller } = require('./controller');

const control = Controller(TipoInformeOrden);
control.get = async (req = request, res = response) => {
    let model_all = await TipoInformeOrden.findAll({
        where: {
            estado: 1
        },
        include: [{
            model: TipoEstudio,
            as: 'TipoEstudio'
        }]
    })

    res.json({
        data: model_all,
        state: 1,
        message: ''
    });
},
control.getById = async (req = request, res = response) => {
    let model = await TipoInformeOrden.findOne({
        where: {
            estado: 1,
            id:req.params.id
        },
        include: [{
            model: TipoEstudio,
            as: 'TipoEstudio'
        }]
    })

    res.json({
        data: model,
        state: 1,
        message: ''
    });
},
//Sobreescribiendo el metodo
control.post = async (req, res = response) => {
    try {
        const tipoEstudios = req.body.TipoEstudio;

        delete req.body.id;
        delete req.body.TipoEstudio;
        const model = new TipoInformeOrden(req.body);

        await model.save();

        for (let i = 0; i < tipoEstudios.length; i++) {
            const modelTipoEstudio = new TipoInformeOrdenTipoEstudio({
                idTipoInformeOrden: model.id,
                idTipoEstudio: tipoEstudios[i].id
            });
            await modelTipoEstudio.save();
        }

        res.status(201).json({
            data: model,
            state: 1,
            message: 'Model creada correctamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            state: 0,
            message: error
        });
    }
},

control.put =  async (req, res = response) => {
    try {
        const { id } = req.params;
        delete req.body.id;

        const model = await TipoInformeOrden.findOne({
            where: {
                id:id
            }
        })

        if(model.codigo!=req.body.codigo){
            const buscaModel = await TipoInformeOrden.findOne({
                where: {
                    codigo:req.body.codigo
                }
            })

            if(buscaModel){
                return res.status(400).json({
                    state: 0,
                    message: 'El codigo ya existe',
                });
            }
        }

        const [rowsAffected, updatedModel] = await TipoInformeOrden.update(req.body, {
            where: {
                id: id,
            },
            returning: true,
        });

        //Borrando los tipos de estudios del tipo de informe
        await TipoInformeOrdenTipoEstudio.destroy({
            where : {
                idTipoInformeOrden : id
            }
        })
        //Agregando los nuevos tipos de estudio para este tipo  de informe
        const models = await TipoInformeOrdenTipoEstudio.bulkCreate(req.body.TipoEstudio.map(item => {
            return {
                idTipoInformeOrden:id,
                idTipoEstudio:item.id
            };
        }));


        if (rowsAffected === 0) {
            return res.status(404).json({
                state: 0,
                message: 'Registro no encontrado',
            });
        }

        res.json({
            data: [updatedModel],
            state: 1,
            message: 'Actualizado correctamente',
        });
    } catch (error) {
        res.status(500).json({
            state: 0,
            message: 'Internal Server Error',
        });
    }
}

module.exports = control;