
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole } = require('../helpers/db-validators');

const { get,
        getIdClienteIdCategoria,
        postIdClienteIdCategoria,
        postIdClienteAgrupacionCategoria,
        put,
        post,
        deleted,
        patch } = require('../controllers/atributoFuncionalVariedad');

const router = Router();

router.get('/', get );
router.get('/idCliente/:idCliente/:idClienteAgrupacionCategoria', getIdClienteIdCategoria );


router.post('/idClienteidCategoria',[
    validFields
] ,postIdClienteIdCategoria );

router.post('/idClienteAgrupacionCategoria',[
    validFields
] ,postIdClienteAgrupacionCategoria);


router.put('/:id',[
    //check('idCliente', 'El idCliente es requerido').not().isEmpty(),
    validFields
],put );

router.post('/',[
   // check('idCliente', 'El idCliente es requerido').not().isEmpty(),
    validFields
], post );


router.delete('/:id',[
    validFields
],deleted );

router.patch('/', patch );

module.exports = router;