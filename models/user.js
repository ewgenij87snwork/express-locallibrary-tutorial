var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 15 },
    role: { type: String, enum: ['Library Worker', 'Director'] }
})

UserSchema.virtual('position').get(function () {
    return !role ? 'User' : role;
})

module.exports = mongoose.model('User', UserSchema);