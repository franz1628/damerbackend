
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole } = require('../helpers/db-validators');

const { get,
        getIdCliente,
        postCodigo,
        put,
        post,
        deleted,
        patch } = require('../controllers/clienteDireccion');

const router = Router();

router.get('/', get );
router.get('/idCliente/:idCliente', getIdCliente );

router.post('/codigo',[
    // check('codigo', 'El codigo es requerido').not().isEmpty(),
    validFields
] ,postCodigo );

router.put('/:id',[
    check('idCliente', 'El codigo es requerido').not().isEmpty(),
    validFields
],put );

router.post('/',[
    check('idCliente', 'El codigo es requerido').not().isEmpty(),
    validFields
], post );


router.delete('/:id',[
    validFields
],deleted );

router.patch('/', patch );

module.exports = router;