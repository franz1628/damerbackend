
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole } = require('../helpers/db-validators');

const { get,
        put,
        nextMedicion,
        post,
        deleted,
        patch } = require('../controllers/medicion');

const router = Router();

router.get('/', get );

router.put('/:id',[


    validFields
],put );

router.post('/',[

    validFields
], post );

router.get('/nextMedicion',[

    validFields
], nextMedicion );

router.delete('/:id',[
    validFields
],deleted );

router.patch('/', patch );

module.exports = router;