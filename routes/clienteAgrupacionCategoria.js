
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole } = require('../helpers/db-validators');

const { get,
        postId,
        postIdCliente,
        addCategoriasNuevo,
        editCategorias,
        put,
        post,
        deleted,
        patch } = require('../controllers/clienteAgrupacionCategoria');

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

router.post('/addCategoriasNuevo',[
    validFields
] ,addCategoriasNuevo );

router.post('/editCategorias',[
    validFields
] ,editCategorias );

router.delete('/:id',[
    validFields
],deleted );

router.patch('/', patch );

module.exports = router;