
const { Router } = require('express');
const { check } = require('express-validator');


const { validFields } = require('../middlewares/valid-fields');
const { isValidRole, emailExists, personExists } = require('../helpers/db-validators');

const { personGet,
        personPut,
        personPost,
        personDelete,
        personPatch } = require('../controllers/person');

const router = Router();


router.get('/', personGet );

router.put('/:id',[
    check('id', 'It is not a valid ID').isMongoId(),
    check('id').custom( personExists ),
    check('role').custom( isValidRole ), 
    validFields
],personPut );

router.post('/',[
    check('name', 'The name is required').not().isEmpty(),
    check('password', 'The password must be more than 6 letters').isLength({ min: 6 }),
    check('email', 'The email is not valid').isEmail(),
    check('email').custom( emailExists ),
    check('role').custom( isValidRole), 
    validFields
], personPost );

router.delete('/:id',[
    check('id', 'It is not a valid ID').isMongoId(),
    check('id').custom( personExists ),
    validFields
],personDelete );

router.patch('/', personPatch );





module.exports = router;