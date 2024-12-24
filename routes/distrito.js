

const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole, provinciaExists } = require('../helpers/db-validators');

const { get,
        getId,
        put,
        post,
        postByZona,
        postQuitarZona,
        deleted,
        patch } = require('../controllers/distrito');

const router = Router();

router.get('/', get );
router.get('/:id', getId );

router.put('/:id',[

    check('descripcion', 'La descripcion es requerida').not().isEmpty(),
    check('idProvincia','IdProvincia es requerido').not().isEmpty(),
    check('idProvincia').not().isEmpty(),
    check('idProvincia').custom(provinciaExists),
    validFields
],put );

router.post('/',[

    check('descripcion', 'La descripcion es requerida').not().isEmpty(),
    check('idProvincia','IdProvincia es requerido').not().isEmpty(),
    check('idProvincia').custom(provinciaExists),
    validFields
], post );

router.post('/postByZona',[

    validFields
], postByZona );

router.put('/postQuitarZOna/:id',[
    validFields
], postQuitarZona );

router.delete('/:id',[
    validFields
],deleted );

router.patch('/', patch );

module.exports = router;