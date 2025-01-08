
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole } = require('../helpers/db-validators');

const { get,
        postId,
        postIdCategoria,
        put,
        post,
        suspender,
        deleted,
        patch } = require('../controllers/categoriaUnidadVenta');

const router = Router();

router.get('/', get );


router.post('/idCategoria',[
    // check('codigo', 'El codigo es requerido').not().isEmpty(),
    validFields
] ,postIdCategoria );


router.put('/:id',[
    validFields
],put );

router.post('/',[
    validFields
], post );

router.post('/suspender',[
    validFields
], suspender );


router.delete('/:id',[
    validFields
],deleted );

router.patch('/', patch );

module.exports = router;