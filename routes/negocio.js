
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole, provinciaExists } = require('../helpers/db-validators');

const { get,
    getId,
    put,
    post,
    negocioXZona,
    postDescripcion,
    deleted,
    patch } = require('../controllers/negocio');

const router = Router();

router.get('/', get);
router.get('/:id', getId);


router.put('/:id', [
    check('id', 'El codigo es requerido').not().isEmpty(),
    validFields
], put);

router.post('/', [
    check('id', 'El codigo es requerido').not().isEmpty(),
    validFields
], post);

router.post('/postDescripcion', [
    check('descripcion', 'La descripcion es requerido').not().isEmpty(),
    validFields
], postDescripcion);

router.post('/negocioXZona', [
    validFields
], negocioXZona);


router.delete('/:id', [
    validFields
], deleted);

router.patch('/', patch);

module.exports = router;