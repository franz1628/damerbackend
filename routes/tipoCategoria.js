
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole } = require('../helpers/db-validators');

const { get,
    put,
    postId,
    post,
    deleted,
    patch } = require('../controllers/tipoCategoria');

const router = Router();

router.get('/', get );


router.post('/id',[
    check('id', 'El id es requerido').not().isEmpty(),
    validFields
] ,postId );



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