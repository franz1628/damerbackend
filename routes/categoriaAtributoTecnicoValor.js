
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole } = require('../helpers/db-validators');

const { get,
        postCodCategoriaTecnicoVariedad,
        put,
        post,
        deleted,
        patch } = require('../controllers/categoriaAtributoTecnicoValor');

const router = Router();

router.get('/', get );

router.post('/idCategoriaAtributoTecnico',[
    check('idCategoriaAtributoTecnico', 'El idCategoriaAtributoTecnico es requerido').not().isEmpty(),
    validFields
] ,postCodCategoriaTecnicoVariedad );


router.put('/:id',[
   // check('codCategoria', 'El codCategoria es requerido').not().isEmpty(),
    validFields
],put );

router.post('/',[
    //check('codCategoria', 'El codCategoria es requerido').not().isEmpty(),
    validFields
], post );


router.delete('/:id',[
    validFields
],deleted );

router.patch('/', patch );

module.exports = router;