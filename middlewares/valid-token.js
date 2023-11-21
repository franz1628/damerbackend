const {response,request} = require('express');
const jwt = require("jsonwebtoken");
const Person = require('../models/person.js');


const validToken = async (req = request, res = response,next ) => {
    const token = req.header('x-token');
    
    if(!token){
        return res.status(401).json({
            msg : 'token is required'
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        const person = await Person.findById(uid);

  

        if(!person){
            return res.status(401).json({
                msg : 'token no valid - Person no exist in DB'
            });
        }

        if(!person.state){
            return res.status(401).json({
                msg : 'token no valid - Person with status false'
            });
        }

        req.person = person;
        
        next();
      
    } catch (error) {
        return res.status(401).json({
            msg : 'token no valid'
        });
    }

    

}

module.exports = {
    validToken
}

