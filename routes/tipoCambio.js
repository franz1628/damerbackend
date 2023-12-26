
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole } = require('../helpers/db-validators');

const { get,
        put,
        post,
        deleted,
        patch } = require('../controllers/tipoCambio');

const router = Router();

router.get('/', get );

router.put('/:id',[
    check('idMoneda', 'El codigo es requerido').not().isEmpty(),
    check('idTipoTipoCambio', 'El codigo es requerido').not().isEmpty(),
    check('valor', 'El codigo es requerido').not().isEmpty(),
    check('fecha', 'El codigo es requerido').not().isEmpty(),

    validFields
],put );

router.post('/',[
    check('idMoneda', 'El codigo es requerido').not().isEmpty(),
    check('idTipoTipoCambio', 'El codigo es requerido').not().isEmpty(),
    check('valor', 'El codigo es requerido').not().isEmpty(),
    check('fecha', 'El codigo es requerido').not().isEmpty(),
    validFields
], post );

router.delete('/:id',[
    validFields
],deleted );

router.patch('/', patch );

module.exports = router;