
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole } = require('../helpers/db-validators');

const { get,
        getId,
        postId,
        put,
        post,
        deleted,
        patch } = require('../controllers/megaCategoria');

const router = Router();

router.get('/', get );

router.get('/canasta/:id', getId );

router.put('/:id',[
    check('descripcion', 'La descripcion es requerida').not().isEmpty(),
    validFields
],put );

router.post('/',[
    check('descripcion', 'La descripcion es requerida').not().isEmpty(),
    validFields
], post );

router.post('/id/',[
    check('id', 'El id es requerido').not().isEmpty(),
    validFields
], postId );

router.delete('/:id',[
    validFields
],deleted );

router.patch('/', patch );

module.exports = router;