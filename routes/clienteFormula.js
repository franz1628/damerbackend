
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole } = require('../helpers/db-validators');

const { get,
    put,
    postId,
    postIdAtributoFuncionalVariedadValor,
    asignarFormula,
    post,
    deleted,
    patch } = require('../controllers/clienteFormula');

const router = Router();

router.get('/', get );


router.post('/id',[
    check('id', 'El id es requerido').not().isEmpty(),
    validFields
] ,postId );

router.post('/asignarFormula',[
    validFields
] ,asignarFormula );


router.put('/:id',[
    // check('codigo', 'El codigo es requerido').not().isEmpty(),
    validFields
],put );

router.post('/',[
    validFields
], post );

router.post('/idAtributoFuncionalVariedadValor',[
    validFields
], postIdAtributoFuncionalVariedadValor );


router.delete('/:id',[
    validFields
],deleted );

router.patch('/', patch );

module.exports = router;