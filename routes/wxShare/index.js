/**
 * @Description 微信分享
 * @Author forguo
 * @Date 2019/12/14
 */

const router = require('koa-router')();
const wxsdk = require('./wxsdk');

// 添加路由前缀
router.prefix('/api/weixin');

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
            data: res.data,
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
    ctx.body = {
        code: 200,
        message: 'ok',
        data: url,
    };
});

module.exports = router;
