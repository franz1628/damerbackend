
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole } = require('../helpers/db-validators');

const { get,
        postIdAtributoTecnicoVariedad,
        put,
        post,
        deleted,
        patch } = require('../controllers/atributoTecnicoVariedadValor');

const router = Router();

router.get('/', get );

router.post('/idAtributoTecnicoVariedad',[
    check('idAtributoTecnicoVariedad', 'El id es requerido').not().isEmpty(),
    validFields
] ,postIdAtributoTecnicoVariedad );

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