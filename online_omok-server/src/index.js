require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const api = require('./api');
const jwtMiddleware = require('./lib/jwtMiddleware');

const server = require('koa-static');
const path = require('path');
const send = require('koa-send');

const { PORT, MONGO_URI } = process.env;

const app = new Koa();
const router = new Router();


// mongoose.connect(MONGO_URI)
//     .then(() => {
//         console.log('Connected to MongoDB');
//     })
//     .catch(() => {
//         console.log(e);
//     });


router.use('/api', api.routes());

app.use(bodyParser());
app.use(jwtMiddleware);
app.use(router.routes()).use(router.allowedMethods());

// const buildDirectory = path.resolve(__dirname, '../../online_omok-client/build');
const buildDirectory = path.resolve(__dirname, './build');
app.use(server(buildDirectory));
app.use(async ctx => {
    if (ctx.status === 404 && ctx.path.indexOf('/api') !== 0) {
        await send(ctx, 'index.html', { root: buildDirectory });
    }
})

app.listen(PORT, () => {
    console.log('Listening to port %d', PORT)
});

require('./globalData');
require('./socket/socket');
