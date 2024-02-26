
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole } = require('../helpers/db-validators');

const { get,
        postId,
        put,
        post,
        deleted,
        patch } = require('../controllers/categoriaAtributoTecnico');

const router = Router();

router.get('/', get );

router.post('/idCategoria',[
    check('idCategoria', 'El idCategoria es requerido').not().isEmpty(),
    validFields
] ,postId );


router.put('/:id',[
    check('idCategoria', 'El idCategoria es requerido').not().isEmpty(),
    validFields
],put );

router.post('/',[
    check('idCategoria', 'El idCategoria es requerido').not().isEmpty(),
    validFields
], post );


router.delete('/:id',[
    validFields
],deleted );

router.patch('/', patch );

module.exports = router;