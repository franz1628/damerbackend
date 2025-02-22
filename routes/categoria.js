
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole } = require('../helpers/db-validators');

const { get,
        postId,
        changeState,
        postDescripcion,
        put,
        post,
        postCanastaMegaCategoria,
        postCanastaMegaCategoriaAll,
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

router.post('/changeState',[
    validFields
] ,changeState);

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

router.post('/canasta/megaCategoriaAll',[
    validFields
], postCanastaMegaCategoriaAll );

router.delete('/:id',[
    validFields
],deleted );

router.patch('/', patch );

module.exports = router;