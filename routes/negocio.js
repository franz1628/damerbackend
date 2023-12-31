
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole, provinciaExists } = require('../helpers/db-validators');

const { get,
        getCodigo,
        put,
        post,
        deleted,
        patch } = require('../controllers/negocio');

const router = Router();

router.get('/', get );

router.get('/codigo/:codigo',[
    check('codigo', 'El codigo es requerido').not().isEmpty(),
    validFields
] ,getCodigo );

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