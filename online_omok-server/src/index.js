require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const api = require('./api');

const server = require('koa-static');
const path = require('path');
const send = require('koa-send');

const PORT = 4000;

const app = new Koa();
const router = new Router();

router.use('/api', api.routes());

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

const buildDirectory = path.resolve(__dirname, './client');
app.use(server(buildDirectory));
app.use(async ctx => {
    if (ctx.status === 404 && ctx.path.indexOf('/api') !== 0) {
        await send(ctx, 'index.html', { root: buildDirectory });
    }
})

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});

require('./globalData');
require('./socket/socket');
