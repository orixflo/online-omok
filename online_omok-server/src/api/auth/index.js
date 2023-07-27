const Router = require('koa-router');
const authCtrl = require('./auth.ctrl');

const auth = new Router();

auth.post('/guestlogin', authCtrl.guestLogin);

module.exports = auth;
