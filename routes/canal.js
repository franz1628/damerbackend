
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole } = require('../helpers/db-validators');

const { get,
        put,
        post,
        deleted,
        patch } = require('../controllers/canal');

const router = Router();

router.get('/', get );

router.put('/:id',[
    check('codigo', 'El codigo es requerido').not().isEmpty(),
    check('descripcion', 'La descripcion es requerida').not().isEmpty(),
    check('descripcionResumida', 'La descripcionResumida es requerida').not().isEmpty(),
    check('tip', 'La tip es requerida').not().isEmpty(),
    check('factorRecargo', 'La factorRecargo es requerida').isNumeric(),
    check('avancePermNego', 'La avancePermNego es requerida').isNumeric(),
    check('avancePermProsp', 'La avancePermProsp es requerida').isNumeric(),
    check('tieneExhibidor', 'La tieneExhibidor es requerida').isNumeric(),
    validFields
],put );

router.post('/',[
    check('codigo', 'El codigo es requerido').not().isEmpty(),
    check('descripcion', 'La descripcion es requerida').not().isEmpty(),
    check('descripcionResumida', 'La descripcion resumida es requerida').not().isEmpty(),
    check('tip', 'La tip es requerida').not().isEmpty(),
    check('factorRecargo', 'La factorRecargo es requerida').isNumeric(),
    check('avancePermNego', 'La avancePermNego es requerida').isNumeric(),
    check('avancePermProsp', 'La avancePermProsp es requerida').isNumeric(),
    check('tieneExhibidor', 'La tieneExhibidor es requerida').isNumeric(),
    validFields
], post );

router.delete('/:id',[
    validFields
],deleted );

router.patch('/', patch );

module.exports = router;