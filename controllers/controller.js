
const Controller = (Model) => {
    return {
        get : async (req = request, res = response) => {
            const model_all = await Model.findAll({
                where: {
                    estado: 1
                }
            })
        
            res.json({
                data: model_all,
                state: 1,
                message: ''
            });
        },
        post : async (req, res = response) => {
            try {
                delete req.body.id;
                const model = new Model(req.body);
        
                await model.save();
        
                res.status(201).json({
                    model,
                    state: 1,
                    message: 'Model creada correctamente'
                });
            } catch (error) {
                res.status(500).json({
                    state: 0,
                    message: 'Internal Server Error'
                });
            }
        },
        postCodigo : async (req = request, res = response) => {
            const model = await Model.findOne({
                where: {
                    estado: 1,
                    codigo : req.body.codigo
                }
            })
    
            res.json(
                model
            );
        },
        put : async (req, res = response) => {
            try {
                const { id } = req.params;
                delete req.body.id;
        
                const model = await Model.findOne({
                    where: {
                        id:id
                    }
                })
        
                if(model.codigo!=req.body.codigo){
                    const buscaModel = await Model.findOne({
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
        
                const [rowsAffected, updatedModel] = await Model.update(req.body, {
                    where: {
                        id: id,
                    },
                    returning: true,
                });
        
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
        },
        deleted : async (req, res = response) => {
            const { id } = req.params;
        
            const model = await Model.update({
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
        },
        patch : (req, res = response) => {
            res.json({
                msg: 'patch API - ClienteZonaPatch'
            });
        }
    }
}

module.exports = {Controller};
