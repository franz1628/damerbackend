
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole } = require('../helpers/db-validators');

const { get,
        getId,
        put,
        post,
        deleted,
        patch } = require('../controllers/clasificadoReferencia');

const router = Router();

router.get('/', get );
router.get('/:id', getId );


router.put('/:id',[
    check('id', 'El codigo es requerido').not().isEmpty(),
    validFields
],put );

router.post('/',[
    check('id', 'El codigo es requerido').not().isEmpty(),
    validFields
], post );


router.delete('/:id',[
    validFields
],deleted );

router.patch('/', patch );

module.exports = router;