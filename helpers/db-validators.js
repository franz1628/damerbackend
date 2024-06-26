const Role = require('../models/role');
const Person = require('../models/person');
const {Usuario} = require('../models/usuario');
const { Parametro } = require('../models/parametro');
const { Departamento } = require('../models/departamento');
const { Pais } = require('../models/pais');
const { Provincia } = require('../models/provincia');


const isValidRole = async(role = '') => {
    const rolExists = await Role.findOne({ role });
    if ( !rolExists ) {
        throw new Error(`The role ${ role } is not registered in the databases`);
    }
}


const emailExists = async( email = '' ) => {

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
const parametroExists = async( id ) => {
    const usuarioExists = await Parametro.findById(id);
    if ( !usuarioExists ) {
        throw new Error(`Id does not exist: ${ id }`);
    }
}
const paisExists = async( id ) => {
    const exists = await Pais.findOne({ where: { id: id } });

    if ( !exists ) {
        throw new Error(`Id Pais no existe: ${ id }`);
    }
}
const departamentoExists = async( id ) => {
    const exists = await Departamento.findOne({ where: { id: id } });

    if ( !exists ) {
        throw new Error(`Id Departamento no existe: ${ id }`);
    }
}
const provinciaExists = async( id ) => {
    const exists = await Provincia.findOne({ where: { id: id } });
    
    if ( !exists ) {
        throw new Error(`Id Provincia no existe: ${ id }`);
    }
}

const codigoParametroExists = async( codigo ) => {
    const exists = await Parametro.findOne({ where: { codigo:codigo } });

    if ( !exists ) {
        throw new Error(`El codigo ya esta registrado: ${ codigo }`);
    }
}

module.exports = {
    isValidRole,
    emailExists,
    personExists,
    usuarioExists,
    parametroExists,
    departamentoExists,
    provinciaExists,
    codigoParametroExists,
    paisExists

}

