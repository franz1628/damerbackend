
const { Router } = require('express');
const { check } = require('express-validator');


const { validFields } = require('../middlewares/valid-fields');
const { brandExists } = require('../helpers/db-validators');

const { authPost} = require('../controllers/auth');

const router = Router();

router.post('/login', [
    check('email','The email is required').not().isEmpty(),
    check('password','The password is required').not().isEmpty(),
    validFields
],authPost );

module.exports = router;