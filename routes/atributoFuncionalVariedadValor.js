
const { Router } = require('express');
const { check } = require('express-validator');
 
const { validFields } = require('../middlewares/valid-fields');
const { isValidRole } = require('../helpers/db-validators');

const { get,
        postIdAtributoFuncionalVariedad,
        put,
        post,
        deleted,
        patch } = require('../controllers/atributoFuncionalVariedadValor');

const router = Router();

router.get('/', get );


router.post('/idAtributoFuncionalVariedad',[
    validFields
] ,postIdAtributoFuncionalVariedad );
 

router.put('/:id',[
    validFields
],put );

router.post('/',[
    validFields
], post );


router.delete('/:id',[
    validFields
],deleted );

router.patch('/', patch );

module.exports = router;