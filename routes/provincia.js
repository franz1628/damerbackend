
const { Router } = require('express');
const { check } = require('express-validator');


const { validFields } = require('../middlewares/valid-fields');
const { isValidRole, departamentoExists } = require('../helpers/db-validators');

const { provinciaGet,
        provinciaPut,
        provinciaPost,
        provinciaDelete,
        provinciaPatch } = require('../controllers/provincia');

const router = Router();

router.get('/', provinciaGet );

router.put('/:id',[
    check('descripcion', 'La descripcion es requerida').not().isEmpty(),
    check('idDepartamento').custom(departamentoExists),
    validFields
],provinciaPut );

router.post('/',[
    check('descripcion', 'La descripcion es requerida').not().isEmpty(),
    check('idDepartamento').custom(departamentoExists),
    validFields
], provinciaPost );

router.delete('/:id',[
    validFields
],provinciaDelete );

router.patch('/', provinciaPatch );

module.exports = router;