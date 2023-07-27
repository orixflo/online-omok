const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
    username: String,
    nickname: String,
    hashedPassword: String,
});
UserSchema.method('setPassword', async function (password) {
    const hash = await bcrypt.hash(password, 10);
    this.hashedPassword = hash;
});
UserSchema.method('checkPassword', async function (password) {
    const result = await bcrypt.compare(password, this.hashedPassword);
    return result;
});
UserSchema.method('serialize', function () {
    const data = this.toJSON();
    delete data.hashedPassword;
    return data;
});
UserSchema.method('generateToken', function () {
    const token = jwt.sign(
        {
            _id: this.id,
            username: this.username,
            nickname: this.nickname,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d',
        },
    );
    return token;
});
UserSchema.static('findByUsername', function (username) {
    return this.findOne({ username });
});
UserSchema.static('findByNickname', function (nickname) {
    return this.findOne({ nickname });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
