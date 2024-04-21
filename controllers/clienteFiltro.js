const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where, Op, Sequelize, literal } = require('sequelize');
const { ClienteFiltro } = require('../models/clienteFiltro');
const { Sku } = require('../models/sku');
const { SkuAtributoTecnicoVariedadValor } = require('../models/skuAtributoTecnicoVariedadValor');
const { Controller } = require('./controller');

const control = Controller(ClienteFiltro);

control.postIdAtributoFuncionalVariedadValor =  async (req, res = response) => {
    try {
      
        const model_all = await ClienteFiltro.findAll({
            where: {
                estado: 1,
                idAtributoFuncionalVariedadValor : req.body.idAtributoFuncionalVariedadValor
            }
        })
    
 
        res.status(201).json({
            data:model_all,
            state: 1,
            message: 'Model creada correctamente'
        });
    } catch (error) {
        res.status(500).json({
            state: 0,
            message: error
        });
    }
}

control.postResultados =  async (req, res = response) => {
    try {
      
        const model_all = await ClienteFiltro.findAll({
            where: {
                estado: 1,
                idAtributoFuncionalVariedadValor : req.body.idAtributoFuncionalVariedadValor
            }
        })

        let arr_todos = [];
     
       
        let mywhere = {};
        for (let i = 0; i < model_all.length; i++) {
           

            if(model_all[i].idClienteTipoValor == 0){ // es Atributo tecnico
                const idAtributoTecnicoVariedadValors = model_all[i].valor2
                const arry_atributos = idAtributoTecnicoVariedadValors.split(','); 
                arr_todos = arr_todos.concat(arry_atributos);
              
            }else if(model_all[i].idCondicion != 0){ //Es condicion
                if(model_all[i].idClienteTipoValor==1){ //SKU
                    if(model_all[i].idCondicion ==1){//Contiene
                        mywhere.descripcion = {
                            [Op.like]: Sequelize.literal(`'%${model_all[i].valorCondicion}%'`)
                        }  
                    }else if(model_all[i].idCondicion ==2){//Contiene Inicio
                        mywhere.descripcion = {
                            [Op.like]: Sequelize.literal(`'${model_all[i].valorCondicion}%'`)
                        }  
                    }else{//Contiene final
                        mywhere.descripcion = {
                            [Op.like]: Sequelize.literal(`'%${model_all[i].valorCondicion}'`)
                        }  
                    }
                }
            }
            
        }

        console.log(mywhere);

        const uniqueArray = [...new Set(arr_todos)];

        const myinclude =  [
            {
                model: SkuAtributoTecnicoVariedadValor,
                as: 'SkuAtributoTecnicoVariedadValor',
                where : {
                    idAtributoTecnicoVariedadValor: {
                        [Sequelize.Op.in]: uniqueArray
                    }
                }
            },
           
        ]

      
        

       


        const resultados  = await Sku.findAll({
            where : mywhere,
            include: myinclude
        })
 
        res.status(201).json({
            data:resultados,
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
}


module.exports = control;