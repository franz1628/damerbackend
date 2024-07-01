const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where } = require('sequelize');

const { Sku } = require('../models/sku');
const { SkuHijos } = require('../models/skuHijos');
const { Controller } = require('./controller');

let control = Controller(SkuHijos);

control.postPack = async (req = request, res = response) => {
    try {
        const {sku,cantidad,nombrePack} = req.body

        const skuPadre = new Sku({
            descripcion:nombrePack,
            descripcionResumida:nombrePack,
            tip:nombrePack,
            tipoSku:2, //PACK
            idCategoria:req.body.skuPadre.idCategoria,
            idMegaCategoria:req.body.skuPadre.idMegaCategoria,
            idCanasta:req.body.skuPadre.idCanasta,
            medicion:req.body.skuPadre.medicion
        });
    
        const nuevo = await skuPadre.save();
        const idSkuPadre = nuevo.id


        new SkuHijos({
            idSkuPadre:idSkuPadre, 
            idSku:sku.id,
            cantidad:cantidad
        }).save()

        res.status(201).json({
            data:[],
            state: 1,
            message: 'Sku Pack agregado correctamente'
        });
    } catch (error) {
        
        res.status(500).js0on({
            data:[],
            state: 0,
            message: error
        });
    }
}

control.updatePack = async (req = request, res = response) => {
    try {
        const {sku,cantidad,nombrePack,skuPadre} = req.body

        const [rowsAffected, updatedModel] = await Sku.update(req.body.sku, {
            where: {
                id: sku.id,
            },
            returning: true,
        });

        if (rowsAffected === 0) {
            return res.status(404).json({
                state: 0,
                message: 'Registro no encontrado',
            });
        }

        await SkuHijos.destroy({
            where: {
                idSkuPadre : skuPadre.id
            }
        })
        
        new SkuHijos({
            idSkuPadre:skuPadre.id, 
            idSku:sku.id,
            cantidad:cantidad
        }).save()

        res.status(201).json({
            data:[],
            state: 1,
            message: 'Sku Pack agregado correctamente'
        });
    } catch (error) {
        
        res.status(500).json({
            data:[],
            state: 0,
            message: error
        });
    }
}


control.postCombo = async (req = request, res = response) => {

    try {
        const {skus,nombreCombo,porcentajes,sku} = req.body

        const skuPadre = new Sku({
            descripcion:nombreCombo,
            descripcionResumida:nombreCombo,
            tip:nombreCombo,
            tipoSku:3, //COMBO
            idCategoria : sku.idCategoria,
            idMegaCategoria : sku.idMegaCategoria,
            idCanasta : sku.idCanasta,
        });
    
        const nuevo = await skuPadre.save();
        const idSkuPadre = nuevo.id

        for (let i = 0; i < skus.length; i++) {
            const sku = skus[i];
            
            new SkuHijos({
                idSkuPadre:idSkuPadre, 
                idSku:sku.id,
                cantidad:1,
                porcentaje:porcentajes[i]
            }).save()
        }


        res.status(201).json({
            data:[],
            state: 1,
            message: 'Sku Combo agregado correctamente'
        });
    } catch (error) {
        
        res.status(500).json({
            data:[],
            state: 0,
            message: error
        });
    }
}



control.updateCombo = async (req = request, res = response) => {

    try {
        const {skus,nombreCombo,porcentajes,sku} = req.body


        const [rowsAffected, updatedModel] = await Sku.update(req.body.sku, {
            where: {
                id: sku.id,
            }, 
            returning: true,
        });

        if (rowsAffected === 0) {
            return res.status(404).json({
                state: 0,
                message: 'Registro no encontrado',
            });
        }

        await SkuHijos.destroy({
            where: {
                idSkuPadre : sku.id
            }
        })


        for (let i = 0; i < skus.length; i++) {
            const skuhijo = skus[i];
            
            new SkuHijos({
                idSkuPadre:sku.id, 
                idSku:skuhijo.id,
                cantidad:1,
                porcentaje:porcentajes[i]
            }).save()
        }


        res.status(201).json({
            data:[],
            state: 1,
            message: 'Sku Combo agregado correctamente'
        });
    } catch (error) {
        
        res.status(500).json({
            data:[],
            state: 0,
            message: error
        });
    }
}



module.exports = control;