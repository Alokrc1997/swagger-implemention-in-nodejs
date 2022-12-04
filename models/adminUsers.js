const mongoose = require('../utils/connection');
const bcrypt = require('bcrypt');

const adminSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
});

adminSchema.pre('save', async function () {
    let salt = await bcrypt.genSalt();
    let hashedString = await bcrypt.hash(this.password, salt);
    this.password = hashedString;
})

const adminModel = mongoose.model("adminModel", adminSchema);

module.exports = adminModel;