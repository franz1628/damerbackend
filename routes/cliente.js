
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole } = require('../helpers/db-validators');

const { get,
        postId,
        put,
        post,
        deleted,
        patch } = require('../controllers/cliente');

const router = Router();

router.get('/', get );

router.post('/id',[
    check('id', 'El id es requerido').not().isEmpty(),
    validFields
] ,postId );

router.put('/:id',[
    check('codigo', 'El codigo es requerido').not().isEmpty(),
    validFields
],put );

router.post('/',[
    check('codigo', 'El codigo es requerido').not().isEmpty(),
    validFields
], post );


router.delete('/:id',[
    validFields
],deleted );

router.patch('/', patch );

module.exports = router;