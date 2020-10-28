/**
 * @Description 微信分享
 * @Author forguo
 * @Date 2019/12/14
 */
const request = require('request');
const router = require('koa-router')();
const wxsdk = require('./wxsdk');

// 添加路由前缀
router.prefix('/jssdk');

/**
 * 分享（get方式）
 */
router.get('/share', async (ctx, next) => {
    if (!ctx.request.query || ctx.request.query.length === 0) {
        ctx.body = {
            code: 10001,
            message: '参数不能为空',
        };
        return false;
    }
    const { query } = ctx.request;
    const {
        url,
    } = query;
    try {
        let res = await wxsdk(url);
        ctx.body = {
            code: 200,
            message: 'ok',
            data: res,
        };
    } catch (e) {
        ctx.body = {
            code: 10086,
            message: 'error',
            data: e,
            err: JSON.stringify(e)
        };
    }
});

/**
 * 分享
 */
router.post('/share', async (ctx, next) => {
    if (!ctx.request.body || ctx.request.body.length === 0) {
        ctx.body = {
            code: 10001,
            message: '参数不能为空',
        };
        return false;
    }
    const { body } = ctx.request;
    const {
        url,
    } = body;
    try {
        let res = await wxsdk(url);
        ctx.body = {
            code: 200,
            message: 'ok',
            data: res,
        };
    } catch (e) {
        ctx.body = {
            code: 10086,
            message: 'error',
            data: e,
            err: JSON.stringify(e)
        };
    }
});

/**
 * 公众号授权（get方式）
 */
const APPID = 'wx524c7234498cfc11';
const APPSECRET = 'b845362de2514656ce5893a0f9f617ff';
const REDIRECT_URI = 'https://forguo.com.cn';

router.get('/login', async (ctx, next) => {
    let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
    ctx.response.redirect(url); // 重定向到这个地址
});

// 获取code
router.get('/auth', async (ctx, next) => {
    let code = ctx.query.code;
    request(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${APPID}&secret=${APPSECRET}&code=${code}&grant_type=authorization_code`, function (error, response, data) {
        let result = JSON.parse(data);
        console.log('accessToken', result);
        if (!error && response.statusCode === 200 && result.access_token) {
        } else {
            console.warn(' accessToken ===== >', result.errmsg || response || error);
        }
    });
});

module.exports = router;
