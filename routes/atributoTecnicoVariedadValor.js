
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole } = require('../helpers/db-validators');

const { get,
    postCodigoAtributoTecnicoVariedad,
        put,
        post,
        deleted,
        patch } = require('../controllers/atributoTecnicoVariedadValor');

const router = Router();

router.get('/', get );

router.post('/codAtributoTecnicoVariedad',[
    check('codAtributoTecnicoVariedad', 'El codigo es requerido').not().isEmpty(),
    validFields
] ,postCodigoAtributoTecnicoVariedad );

router.put('/:id',[
    check('codigo', 'El codigo es requerido').not().isEmpty(),
    validFields
],put );

router.post('/',[
    check('codigo', 'El codigo es requerido').not().isEmpty(),
    validFields
], post );


router.delete('/:id',[
    validFields
],deleted );

router.patch('/', patch );

module.exports = router;