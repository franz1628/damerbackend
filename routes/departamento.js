
const { Router } = require('express');
const { check } = require('express-validator');


const { validFields } = require('../middlewares/valid-fields');
const { isValidRole, departamentoExists, paisExists } = require('../helpers/db-validators');

const { departamentoGet,
        departamentoPut,
        departamentoPost,
        departamentoDelete,
        departamentoPatch } = require('../controllers/departamento');

const router = Router();


router.get('/', departamentoGet );

router.put('/:id',[
    check('descripcion', 'La descripcion es requerida').not().isEmpty(),
    check('idPais').custom(paisExists),
    validFields
],departamentoPut );

router.post('/',[
    check('descripcion', 'La descripcion es requerida').not().isEmpty(),
    check('idPais').custom(paisExists),
    validFields
], departamentoPost );

router.delete('/:id',[
    validFields
],departamentoDelete );

router.patch('/', departamentoPatch );

module.exports = router;