
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole } = require('../helpers/db-validators');

const { get,
        getIdContrato,
        postCodigo,
        postDeleteDetalleContrato,
        postAll,
        postId,
        put,
        post,
        deleted,
        patch } = require('../controllers/contratoDetalle');

const router = Router();

router.get('/', get );
router.get('/getIdcontrato/:idContrato', getIdContrato );

router.post('/codigo',[
    // check('codigo', 'El codigo es requerido').not().isEmpty(),
    validFields
] ,postCodigo );

router.post('/id',[
    check('id', 'El id es requerido').not().isEmpty(),
    validFields
] ,postId );

router.post('/borrarDetalle',[
    check('idContrato', 'El idContrato es requerido').not().isEmpty(),
    validFields
] ,postDeleteDetalleContrato );

router.put('/:id',[
    // check('codigo', 'El codigo es requerido').not().isEmpty(),
    validFields
],put );

router.post('/',[
    check('idContrato', 'El idCliente es requerido').not().isEmpty(),
    validFields
], post );

router.post('/all/',[
    //check('idContrato', 'El idCliente es requerido').not().isEmpty(),
    validFields
], postAll );


router.delete('/:id',[
    validFields
],deleted );

router.patch('/', patch );

module.exports = router;