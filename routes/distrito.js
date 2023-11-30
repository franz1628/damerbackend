
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole, provinciaExists } = require('../helpers/db-validators');

const { get,
        put,
        post,
        deleted,
        patch } = require('../controllers/distrito');

const router = Router();

router.get('/', get );

router.put('/:id',[
    check('codigo', 'El codigo es requerido').not().isEmpty(),
    check('descripcion', 'La descripcion es requerida').not().isEmpty(),
    check('idProvincia','IdProvincia es requerido').not().isEmpty(),
    check('idProvincia').not().isEmpty(),
    check('idProvincia').custom(provinciaExists),
    validFields
],put );

router.post('/',[
    check('codigo', 'El codigo es requerido').not().isEmpty(),
    check('descripcion', 'La descripcion es requerida').not().isEmpty(),
    check('idProvincia','IdProvincia es requerido').not().isEmpty(),
    check('idProvincia').custom(provinciaExists),
    validFields
], post );

router.delete('/:id',[
    validFields
],deleted );

router.patch('/', patch );

module.exports = router;