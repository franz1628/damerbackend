
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole } = require('../helpers/db-validators');

const { get,
        getCodClienteCodCategoria,
        postCodigo,
        postIdClienteIdCategoria,
        put,
        post,
        deleted,
        patch } = require('../controllers/atributoFuncionalVariedad');

const router = Router();

router.get('/', get );
router.get('/codCliente/:codCliente/:codCategoria', getCodClienteCodCategoria );

router.post('/codigo',[
    // check('codigo', 'El codigo es requerido').not().isEmpty(),
    validFields
] ,postCodigo );

router.post('/idClienteidCategoria',[
    // check('codigo', 'El codigo es requerido').not().isEmpty(),
    validFields
] ,postIdClienteIdCategoria );


router.put('/:id',[
    check('codCliente', 'El codigo es requerido').not().isEmpty(),
    validFields
],put );

router.post('/',[
    check('codCliente', 'El codigo es requerido').not().isEmpty(),
    validFields
], post );


router.delete('/:id',[
    validFields
],deleted );

router.patch('/', patch );

module.exports = router;