
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole } = require('../helpers/db-validators');

const { get,
        put,
        post,
        deleted,
        patch } = require('../controllers/urbanizacion');

const router = Router();

router.get('/', get );

router.put('/:id',[
    check('descripcion', 'La descripcion es requerida').not().isEmpty(),

    validFields
],put );

router.post('/',[
    check('descripcion', 'La descripcion es requerida').not().isEmpty(),

    validFields
], post );

router.delete('/:id',[
    validFields
],deleted );

router.patch('/', patch );

module.exports = router;