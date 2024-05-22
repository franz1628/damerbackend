
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole } = require('../helpers/db-validators');

const { get,
        put,
        post,
        postId,
        postPack,
        updatePack,
        postCombo,
        updateCombo,
        deleted,
        patch } = require('../controllers/skuHijos');

const router = Router();

router.get('/', get ); 

router.post('/id',[
    check('id', 'El id es requerido').not().isEmpty(),
    validFields
] ,postId );


router.post('/postPack',[
    validFields
] ,postPack );

router.post('/updatePack',[
    validFields
] ,updatePack );

router.post('/postCombo',[
    validFields
] ,postCombo );

router.post('/updateCombo',[
    validFields
] ,updateCombo );

router.put('/:id',[
    check('descripcion', 'La descripcion es requerida').not().isEmpty(),
    validFields
],put );

router.post('/',[
    check('descripcion', 'La descripcion es requerida').not().isEmpty(),
    validFields
], post );


router.delete('/:id',[
    validFields
],deleted );

router.patch('/', patch );

module.exports = router;