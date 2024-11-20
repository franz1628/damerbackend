
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole } = require('../helpers/db-validators');

const { get,
        getById,
        postCodigo,
        put,
        post,
        deleted,
        patch } = require('../controllers/tipoPresentacion');

const router = Router();

router.get('/', get );
router.get('/:id', getById );

router.post('/codigo',[
    // check('codigo', 'El codigo es requerido').not().isEmpty(),
    validFields
] ,postCodigo );

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