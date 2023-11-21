
/*const { Schema, model } = require('mongoose');

const ModelSchema = Schema({
    user: {
        type: String,
        required: [true, 'El user is required']
    },
    name: {
        type: String,
        required: [true, 'El name is required']
    },
    email: {
        type: String,
        required: [true, 'The email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The password is required'],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    }
});



ModelSchema.methods.toJSON = function() {
    const { __v,_id, ...model  } = this.toObject();
    model.uid = _id;
    return model;
}

module.exports = model( 'Person', ModelSchema );*/
