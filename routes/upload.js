
const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isValidRole } = require('../helpers/db-validators');

const { 
    uploadImage
 } = require('../controllers/upload');

const router = Router();


router.post('/uploadImage',[
  
    validFields
] ,uploadImage );



module.exports = router;