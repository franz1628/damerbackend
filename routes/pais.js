
const { Router } = require('express');
const { check } = require('express-validator');


const { validFields } = require('../middlewares/valid-fields');
const { isValidRole, emailExists, paisExists } = require('../helpers/db-validators');

const { paisGet,
        paisPut,
        paisPost,
        paisDelete,
        paisPatch } = require('../controllers/pais');

const router = Router();


router.get('/', paisGet );

router.put('/:id',[
    validFields
],paisPut );

router.post('/',[
    check('descripcion', 'La descripcion es requerida').not().isEmpty(),
    validFields
], paisPost );

router.delete('/:id',[
    validFields
],paisDelete );

router.patch('/', paisPatch );

module.exports = router;