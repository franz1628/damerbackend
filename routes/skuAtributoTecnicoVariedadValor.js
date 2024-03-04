
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole } = require('../helpers/db-validators');

const { get,
        postIdSku,
        put,
        post,
        deleted,
        patch } = require('../controllers/skuAtributoTecnicoVariedadValor');

const router = Router();

router.get('/', get );

router.post('/idSku',[
    validFields
] ,postIdSku );


router.put('/:id',[
   // check('codCategoria', 'El codCategoria es requerido').not().isEmpty(),
    validFields
],put );

router.post('/',[
    //check('codCategoria', 'El codCategoria es requerido').not().isEmpty(),
    validFields
], post );


router.delete('/:id',[
    validFields
],deleted );

router.patch('/', patch );

module.exports = router;