
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole } = require('../helpers/db-validators');

const { get,
        getCodigo,
        put,
        post,
        deleted,
        patch, 
        postCodigo} = require('../controllers/canasta');

const router = Router();

router.get('/', get );

router.get('/canasta/:codigo', getCodigo );

router.put('/:id',[
    check('codigo', 'El codigo es requerido').not().isEmpty(),
    check('descripcion', 'La descripcion es requerida').not().isEmpty(),
    validFields
],put );

router.post('/',[
    check('codigo', 'El codigo es requerido').not().isEmpty(),
    check('descripcion', 'La descripcion es requerida').not().isEmpty(),
    validFields
], post );

router.post('/codigo/',[
    check('codigo', 'El codigo es requerido').not().isEmpty(),
    validFields
], postCodigo );



router.delete('/:id',[
    validFields
],deleted );

router.patch('/', patch );

module.exports = router;