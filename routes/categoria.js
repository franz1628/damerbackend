
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole } = require('../helpers/db-validators');

const { get,
        postId,
        postDescripcion,
        put,
        post,
        postCanastaMegaCategoria,
        deleted,
        patch } = require('../controllers/categoria');

const router = Router();

router.get('/', get );

router.post('/id',[
    check('id', 'El id es requerido').not().isEmpty(),
    validFields
] ,postId );

router.post('/descripcion',[
    check('descripcion', 'El descripcion es requerido').not().isEmpty(),
    validFields
] ,postDescripcion );

router.put('/:id',[
    check('descripcion', 'La descripcion es requerida').not().isEmpty(),
    validFields
],put );

router.post('/',[
    check('descripcion', 'La descripcion es requerida').not().isEmpty(),
    validFields
], post );

router.post('/canasta/megaCategoria',[
    validFields
], postCanastaMegaCategoria );

router.delete('/:id',[
    validFields
],deleted );

router.patch('/', patch );

module.exports = router;