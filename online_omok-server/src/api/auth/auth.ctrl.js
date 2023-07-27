const Joi = require('joi');
const checkGuestCodeError = require('../../lib/checkGuestCodeError');
const generateGuestCode = require('../../lib/generateGuestCode');
const nickname_pattern = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9]+$/;

/*
POST    /api/auth/guestlogin
{
    "nickname": "user001"
}
*/
const guestLogin = async ctx => {
    // # validation
    const schema = Joi.object().keys({
        nickname: Joi.string()
            .min(3)
            .max(15)
            .pattern(new RegExp(nickname_pattern))
            .required()
    });
    const result = schema.validate(ctx.request.body);
    if (result.error) {
        ctx.status = 400;
        ctx.body = 'validationError';
        return;
    }

    // # generate guestCode
    let guestCode = '';
    while(1) {
        guestCode = generateGuestCode(0, 9999);
        if (checkGuestCodeError(userDataMap, guestCode, 9999) === 'full') {
            ctx.body = 'full'
            return;
        }
        if (checkGuestCodeError(userDataMap, guestCode, 9999) === 'success') break;
    };

    // # set usercode, nickname
    const nickname = ctx.request.body.nickname;
    userDataMap.set(guestCode, {nickname: nickname, room: 'lobby'});
    ctx.body = {guestCode, nickname};
}

module.exports = {
    guestLogin: guestLogin,
};