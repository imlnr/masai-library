const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
}, {
    versionKey: false
})

const UserModel = mongoose.model("Users", userSchema);

module.exports = {
    UserModel
}