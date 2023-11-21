/*const { Schema, model } = require('mongoose');

const ModelSchema = Schema({
    role: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});

ModelSchema.methods.toJSON = function() {
    const { __v,_id, ...model  } = this.toObject();
    model.uid = _ud;
    return model;
}

module.exports = model( 'Role', ModelSchema );*/
