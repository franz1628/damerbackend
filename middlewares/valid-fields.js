const { validationResult } = require('express-validator');


const validFields = ( req, res, next ) => {

    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({
            data : [],
            state: 0,
            message: errors.errors[0].msg
        });
    }

    next();
}



module.exports = {
    validFields
}
