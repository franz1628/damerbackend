const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Person = require('../models/person');



const personGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { state: true };

    const [ total, person ] = await Promise.all([
        Person.countDocuments(query),
        Person.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        person
    });
}

const personPost = async(req, res = response) => {
    
    const { name, email, password, role } = req.body;
    const person = new Person({ name, email, password, role });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    person.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await person.save();

    res.json({
        person
    });
}

const personPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...resto } = req.body;

    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const person = await Person.findByIdAndUpdate( id, resto );

    res.json(person);
}

const personPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - personPatch'
    });
}

const personDelete = async(req, res = response) => {

    const { id } = req.params;

    const person = await Person.findByIdAndUpdate( id, { estado: false } );


    res.json(person);
}




module.exports = {
    personGet,
    personPost,
    personPut,
    personPatch,
    personDelete,
}