
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole } = require('../helpers/db-validators');

const { get,
        postCodTipoUnidadMedida,
        postCodigo,
        put,
        post,
        deleted,
        patch } = require('../controllers/unidadMedida');

const router = Router();

router.get('/', get );


router.post('/codigo',[
    // check('codigo', 'El codigo es requerido').not().isEmpty(),
    validFields
] ,postCodigo );

router.post('/codTipoUnidadMedida',[
    //check('codigo', 'El codigo es requerido').not().isEmpty(),
    validFields
] ,postCodTipoUnidadMedida );

router.put('/:id',[
    check('codigo', 'El codigo es requerido').not().isEmpty(),
    validFields
],put );

router.post('/',[
    check('codigo', 'El codigo es requerido').not().isEmpty(),
    validFields
], post );


router.delete('/:id',[
    validFields
],deleted );

router.patch('/', patch );

module.exports = router;