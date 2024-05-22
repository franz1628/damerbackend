
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole } = require('../helpers/db-validators');

const { get,
        put,
        post,
        postId,
        postByCategoria,
        postDescripcionCategoria,
        postByCategoriaAll,
        postDescripcion,
        deleted,
        patch } = require('../controllers/sku');

const router = Router();

router.get('/', get );

router.post('/id',[
    check('id', 'El id es requerido').not().isEmpty(),
    validFields
] ,postId );

router.put('/:id',[
    check('descripcion', 'La descripcion es requerida').not().isEmpty(),
    validFields
],put );

router.post('/',[
    check('descripcion', 'La descripcion es requerida').not().isEmpty(),
    validFields
], post );

router.post('/descripcion',[
    check('descripcion', 'El descripcion es requerido').not().isEmpty(),
    validFields
] ,postDescripcion );

router.post('/postDescripcionCategoria',[
    check('descripcion', 'El descripcion es requerido').not().isEmpty(),
    validFields
] ,postDescripcionCategoria );

router.post('/byCategoria',[
    validFields
], postByCategoria );

router.post('/byCategoriaAll',[
    validFields
], postByCategoriaAll );

router.delete('/:id',[
    validFields
],deleted );

router.patch('/', patch );

module.exports = router;