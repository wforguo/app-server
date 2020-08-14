/**
 * @Description: 入口
 * @author: forguo
 * @date: 2020/7/14
 */
const Koa = require('koa');
const onerror = require('koa-onerror');
const compress = require('koa-compress');
const chalk = require('chalk');
const figlet = require('figlet');
const middleWares = require('./middleWares');

// console.log(chalk.yellow.bold('------------- Wedding Server ------------- \n'));
figlet('App  Server', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err); // 打印出该对象的所有属性和属性值.
        return;
    }
    data && console.log(chalk.yellow(data));
});

const app = new Koa();

// wxShare
const wxShare = require('./routes/wxShare');

// error handler
onerror(app);

if (process.env.NODE_ENV === 'production') {
    app.use(compress())
}

app.use(middleWares);

// routes
app.use(wxShare.routes(), wxShare.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app;
