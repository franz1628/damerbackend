const validFields = require('../middlewares/valid-fields');
const validToken = require('../middlewares/valid-token');
const validRole = require('../middlewares/valid-role');

module.exports = {
    ...validFields,
    ...validToken,
    ...validRole
}
