
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole } = require('../helpers/db-validators');

const { get,
        getContratos,
        postCodigo,
        postAddVersion,
        postId,
        put,
        post,
        deleted,
        patch } = require('../controllers/contrato');

const router = Router();

router.get('/', get );

router.get('/contratos', getContratos );

router.post('/id',[
    check('id', 'El id es requerido').not().isEmpty(),
    validFields
] ,postId );

router.post('/addVersion',[
    check('id', 'El id es requerido').not().isEmpty(),
    validFields
] ,postAddVersion );

router.put('/:id',[
    // check('codigo', 'El codigo es requerido').not().isEmpty(),
    validFields
],put );

router.post('/',[
    check('idCliente', 'El idCliente es requerido').not().isEmpty(),
    check('idCategoria', 'El idCategoria es requerido').not().isEmpty(),
    validFields
], post );


router.delete('/:id',[
    validFields
],deleted );

router.patch('/', patch );

module.exports = router;