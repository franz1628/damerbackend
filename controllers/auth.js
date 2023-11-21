const { response, request } = require('express');

const Person = require('../models/person');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');


const authPost = async(req, res = response) => {
    const {email, password} = req.body;

    try{
        //exists Email
        const person = await Person.findOne({email});
        if(!person){
            return res.status(400).json({
                msg:'Email or Password are not valid'
            })
        }

        // Active Person
        if(!person.state){
            return res.status(400).json({
                msg:'Person no valid'
            })
        }

        const validPassword = bcryptjs.compareSync(password, person.password);
        if(!validPassword){
            return res.status(400).json({
                msg:'Password no valid'
            })
        }

        const token = await generarJWT(person.id);

        res.json({
            'msg' : 'ok',
            'token' : token
        })
    }catch(error){
        res.status(500).json({
            'msg' : 'Error, 500'
        });
    }


  
}


module.exports = {
    authPost,
}