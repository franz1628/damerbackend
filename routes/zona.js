
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


    validFields
],put );

router.post('/',[


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