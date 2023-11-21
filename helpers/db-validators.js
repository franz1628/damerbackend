const Role = require('../models/role');
const Person = require('../models/person');
const {Usuario} = require('../models/usuario');


const isValidRole = async(role = '') => {
    const rolExists = await Role.findOne({ role });
    if ( !rolExists ) {
        throw new Error(`The role ${ role } is not registered in the databases`);
    }
}


const emailExists = async( email = '' ) => {
    console.log(email);
    const emailExists = await Usuario.findOne({ where: { email: email } });
    if ( emailExists ) {
        throw new Error(`El correo: ${ email }, ya esta registrado`);
    }
}

const personExists = async( id ) => {
    const personExists = await Person.findById(id);
    if ( !personExists ) {
        throw new Error(`Id does not exist: ${ id }`);
    }
}

const usuarioExists = async( id ) => {
    const usuarioExists = await Usuario.findById(id);
    if ( !usuarioExists ) {
        throw new Error(`Id does not exist: ${ id }`);
    }
}

module.exports = {
    isValidRole,
    emailExists,
    personExists,
    usuarioExists,

}

