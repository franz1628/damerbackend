
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole } = require('../helpers/db-validators');

const { get,
        postCodigo,
        postIdCategoria,
        put,
        post,
        deleted,
        patch } = require('../controllers/categoriaUnidadVenta');

const router = Router();

router.get('/', get );


router.post('/idCategoria',[
    // check('codigo', 'El codigo es requerido').not().isEmpty(),
    validFields
] ,postIdCategoria );


router.put('/:id',[
    check('idCliente', 'El codigo es requerido').not().isEmpty(),
    validFields
],put );

router.post('/',[
    check('idCliente', 'El idCliente es requerido').not().isEmpty(),
    check('idUnidadVenta', 'El idUnidadVenta es requerido').not().isEmpty(),
    validFields
], post );


router.delete('/:id',[
    validFields
],deleted );

router.patch('/', patch );

module.exports = router;