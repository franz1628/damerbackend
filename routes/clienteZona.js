
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole } = require('../helpers/db-validators');

const { get,
        getIdCliente,
        postIdCliente,
        postCodigo,
        put,
        post,
        deleted,
        patch } = require('../controllers/clienteZona');

const router = Router();

router.get('/', get );
router.get('/idCliente/:idCliente', getIdCliente );

router.post('/codigo',[
    // check('codigo', 'El codigo es requerido').not().isEmpty(),
    validFields
] ,postCodigo );

router.post('/idCliente',[
     check('idCliente', 'El idCliente es requerido').not().isEmpty(),
    validFields
] ,postIdCliente );

router.put('/:id',[
    validFields
],put );

router.post('/',[
     check('idCliente', 'El idCliente es requerido').not().isEmpty(),
     check('idZona', 'El idZona es requerido').not().isEmpty(),
    validFields
], post );


router.delete('/:id',[
    validFields
],deleted );

router.patch('/', patch );

module.exports = router;