
const { Router } = require('express');
const { check } = require('express-validator');


const { validFields } = require('../middlewares/valid-fields');
const { codigoParametroExists } = require('../helpers/db-validators');

const { parametroGet,
        parametroIdGet,
        parametroPut,
        parametroPost,
        parametroDelete,
        parametroPatch } = require('../controllers/parametro');

const router = Router();


router.get('/', parametroGet );

router.get('/:id', parametroIdGet );

router.put('/:id',[
    validFields
],parametroPut );

router.post('/',[
    check('descripcion', 'La descripcion es requerida').not().isEmpty(),
    validFields
], parametroPost );

router.delete('/:id',[
    validFields
],parametroDelete );

router.patch('/', parametroPatch );

module.exports = router;