const {request,response} = require('express');

const validRole = (req = request, res = response, next ) => {

    if(!req.person){
        return res.status(500).json({
            msg : 'you cannot valid role wihout before valid token' 
        })
    }

    const person = req.person;

    if(person.role != 'ADMIN_ROLE'){
        return res.status(401).json({
            msg : 'Only permited for ADMIN_ROLE' 
        });
    }

    next();
}

const haveRole = (...arg ) => {
   
    return (req = request, res = response, next) => {
        if(!arg.includes(req.person.role)){
            return res.status(401).json({
                msg : 'Rol no permitid'
            });
        }

        next();
    }
    
}


module.exports = {
    validRole,
    haveRole
}
