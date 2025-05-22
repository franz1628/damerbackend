const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { Usuario } = require('../models/usuario');
const jwt = require('jsonwebtoken');
const { Cargo } = require('../models/cargo');

const usuarioGet = async(req = request, res = response) => {

    const models = await Usuario.findAll({
        where:{
            
        },
        include: [
            {
                model: Cargo,
                as: 'Cargo',
            }
        ],
    })

    res.json({
        data: models,
        state: 1,
        message: 'correcto'
    });

}

const usuarioPost = async(req, res = response) => {
    
    const { nombres,apellidoPaterno,apellidoMaterno,password,email,telefono,estado,idTipoDocumento,nroDocumento,idCargo } = req.body;
    const usuario = new Usuario({ nombres,apellidoPaterno,apellidoMaterno,password,email,telefono,estado,idTipoDocumento,nroDocumento,idCargo });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password2 = usuario.password;
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.json({
        data: usuario,
        state: 1,
        message: 'Guardado correctamente'
    });
}

const usuarioUpdateCargo = async(req, res = response) => {
    
    
    const { id } = req.params;
    const { idCargo } = req.body;


    const model = await Usuario.findOne({ where: { id } });
    model.idCargo = idCargo;

    console.log(model);
    

    const [rowsAffected, updatedModel] = await Usuario.update({ idCargo }, {
            where: {
                id: id,
            },
            returning: true,
            individualHooks: true
        });

    
   
    res.json({
        data: updatedModel,
        state: 1,
        message: 'Actualizado correctamente'
    });
}

const usuarioUpdateVistas = async(req, res = response) => {
    const { id } = req.params;
    const { vistas } = req.body;

    const model = await Usuario.findOne({ where: { id } });
    model.vistas = vistas;

    console.log(vistas);
    console.log(id);

    const [rowsAffected, updatedModel] = await Usuario.update({ vistas }, {
            where: {
                id: id,
            },
            returning: true,
            individualHooks: true
        });

    
   
    res.json({
        data: updatedModel,
        state: 1,
        message: 'Actualizado correctamente'
    });
}   


const usuarioLogin = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.json({
                data: [],
                state: 0,
                message: 'Email y/o contraseña incorrectos'
            });
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.json({
                data: [],
                state: 0,
                message: 'Email y/o contraseña incorrectos'
            });
        }

        // Crear el JWT
        const payload = {
            uid: usuario.id,
            nombre: usuario.nombre,
            rol: usuario.rol
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || '4h'
        });

        res.json({
            data: {
                usuario,
                token
            },
            state: 1,
            message: 'Login exitoso'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            data: [],
            state: 0,
            message: 'Error del servidor'
        });
    }
};

const usuarioPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, ...resto } = req.body;

    const myModel = await Usuario.findOne({ where: { id } });
    if(req.body.password==''){
        req.body.password = myModel.password;
        req.body.password2 = myModel.password2;
    }else{
        const salt = bcryptjs.genSaltSync();
        req.body.password = bcryptjs.hashSync( password, salt );
        req.body.password2 = req.body.password;
    }

    if(req.body.email != myModel.email){
        const emailExists = await Usuario.findOne({ where: { email: req.body.email } });
        if (emailExists) {
            return  res.json({
                data: [],
                state: 0,
                message: 'El correo ya existe'
            });
        }
    }



    
    const updatedModel = await Usuario.update( {
        nombres : req.body.nombres,
        apellidoPaterno : req.body.apellidoPaterno,
        apellidoMaterno : req.body.apellidoMaterno,
        idCargo : req.body.idCargo,
        estado : req.body.estado,
        password : req.body.password,
        password2 : req.body.password2,
        email : req.body.email,
    } , {
            where: {
                id: id,
            },
            returning: true,
            individualHooks: true
        });

  
    res.json({
        data: updatedModel,
        state: 1,
        message: 'Actualizado correctamente'
    });
}

const usuarioPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuarioPatch'
    });
}

const usuarioDelete = async(req, res = response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );


    res.json(usuario);
}




module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioLogin,
    usuarioPut,
    usuarioPatch,
    usuarioDelete,
    usuarioUpdateCargo,
    usuarioUpdateVistas
}