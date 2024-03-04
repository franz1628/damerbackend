
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole } = require('../helpers/db-validators');

const { get,
        put,
        post,
        postDescripcion,
        deleted,
        patch } = require('../controllers/zona');

const router = Router();

router.get('/', get );

router.put('/:id',[
    check('codigo', 'El codigo es requerido').not().isEmpty(),
    check('descripcion', 'La descripcion es requerida').not().isEmpty(),

    validFields
],put );

router.post('/',[
    check('codigo', 'El codigo es requerido').not().isEmpty(),
    check('descripcion', 'La descripcion es requerida').not().isEmpty(),

    validFields
], post );

router.post('/descripcion',[
    check('descripcion', 'El descripcion es requerido').not().isEmpty(),
    validFields
] ,postDescripcion );

router.delete('/:id',[
    validFields
],deleted );

router.patch('/', patch );

module.exports = router;