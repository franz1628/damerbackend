
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole } = require('../helpers/db-validators');

const { get,
        postId,
        postIdCliente,
        addZonasNuevo,
        editZonas,
        put,
        post,
        deleted,
        patch } = require('../controllers/clienteAgrupacionZona');

const router = Router();

router.get('/', get );


router.put('/:id',[
    validFields
],put );

router.post('/',[
    validFields
], post );

router.post('/idCliente',[
    validFields
] ,postIdCliente );

router.post('/addZonasNuevo',[
    validFields
] ,addZonasNuevo );

router.post('/editZonas',[
    validFields
] ,editZonas );

router.delete('/:id',[
    validFields
],deleted );

router.patch('/', patch );

module.exports = router;