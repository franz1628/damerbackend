
const { Router } = require('express');
const { check } = require('express-validator');


const { validFields } = require('../middlewares/valid-fields');
const { isValidRole, emailExists, usuarioExists } = require('../helpers/db-validators');

const { usuarioGet,
        usuarioPut,
        usuarioPost,
        usuarioLogin,
        usuarioDelete,
        usuarioUpdateCargo,
        usuarioUpdateVistas,
        usuarioPatch } = require('../controllers/usuario');

const router = Router();


router.get('/', usuarioGet );

router.put('/:id',[
    check('nombres', 'Los nombres son requeridos').not().isEmpty(),
    check('apellidoPaterno', 'Los apellidoPaterno son requeridos').not().isEmpty(),
    check('apellidoMaterno', 'Los apellidoMaterno son requeridos').not().isEmpty(),
    validFields
],usuarioPut );

router.post('/login',[
    validFields
], usuarioLogin );

router.post('/',[
    check('nombres', 'Los nombres son requeridos').not().isEmpty(),
    check('apellidoPaterno', 'Los apellidoPaterno son requeridos').not().isEmpty(),
    check('apellidoMaterno', 'Los apellidoMaterno son requeridos').not().isEmpty(),
    //check('password', 'La contraseña debe tener minimo 6 caracteres').isLength({ min: 6 }),
    check('email').custom( emailExists ),
    validFields
], usuarioPost );

router.post('/updateCargo/:id',[

    validFields
], usuarioUpdateCargo );

router.post('/updateVistas/:id',[
    validFields
], usuarioUpdateVistas );

router.delete('/:id',[
    
    validFields
],usuarioDelete );

router.patch('/', usuarioPatch );





module.exports = router;