const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { Usuario } = require('../models/usuario');
const jwt = require('jsonwebtoken');

const usuarioGet = async(req = request, res = response) => {

    const usuarios = await Usuario.findAll({
        where:{
            estado:1
        }
    })

    res.json({
        usuarios
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
        usuario
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
    const { _id, password, google, email, ...resto } = req.body;

    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario);
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
}