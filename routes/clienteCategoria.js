
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
        patch } = require('../controllers/clienteCategoria');

const router = Router();

router.get('/', get );
router.get('/idCliente/:idCliente', getIdCliente );

router.post('/codigo',[

    validFields
] ,postCodigo );

router.post('/idCliente',[

    validFields
] ,postIdCliente );

router.put('/:id',[

    validFields
],put );

router.post('/',[

    validFields
], post );


router.delete('/:id',[
    validFields
],deleted );

router.patch('/', patch );

module.exports = router;