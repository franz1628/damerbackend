
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole } = require('../helpers/db-validators');

const { get,
        postId,
        byIdCategoria,
        put,
        post,
        deleted,
        patch } = require('../controllers/categoriaAtributoTecnico');

const router = Router();

router.get('/', get );

router.post('/idCategoria',[
  
    validFields
] ,postId );

router.post('/byIdCategoria',[
  
    validFields
] ,byIdCategoria );


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