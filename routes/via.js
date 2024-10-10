
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole, provinciaExists } = require('../helpers/db-validators');

const { get,
        getId,
        put,
        post,
        deleted,
        patch } = require('../controllers/via');

const router = Router();

router.get('/', get );
router.get('/:id', getId );

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