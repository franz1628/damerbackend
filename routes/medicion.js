
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole } = require('../helpers/db-validators');

const { get,
        put,
        post,
        deleted,
        patch } = require('../controllers/medicion');

const router = Router();

router.get('/', get );

router.put('/:id',[
    check('anio', 'El codigo es requerido').not().isEmpty(),
    check('mes', 'El codigo es requerido').not().isEmpty(),
    check('medicion', 'El codigo es requerido').not().isEmpty(),

    validFields
],put );

router.post('/',[
    check('anio', 'El codigo es requerido').not().isEmpty(),
    check('mes', 'El codigo es requerido').not().isEmpty(),
    check('medicion', 'El codigo es requerido').not().isEmpty(),
    validFields
], post );

router.delete('/:id',[
    validFields
],deleted );

router.patch('/', patch );

module.exports = router;