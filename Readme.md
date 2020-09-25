# server（服务端）

## 1.使用Koa2获取jssdk签名的接口（获取权限验证配置）

[微信sdk文章](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#2)

### 使用

支持get和post

- 获取权限验证配置

```js
    $.ajax({
        // 40v52n7xjgxeg0z72wwe2a621idw81f4
        url:'//www.forguo.cn/api/weixin/share',
        // //server.forguo.cn/weixin(云开发)
        data:{
            url: window.location.href,
        },
        type:'POST',
        dataType:'json',
        noloading: true,
        success:function(res){
            var data = res.data;
            wx.config({
                debug: false,
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList: [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'onMenuShareQZone'
                    // 'checkJsApi',
                    // 'hideAllNonBaseMenuItem',
                    // 'hideOptionMenu'
                ]
            });
        }
    });
```

- 注入权限验证配置

```js
    var shareData = {
        disabled: true,
        title: '这是一个Node的分享标题',
        desc: '这是一个Node的分享描述',
        link: window.location.href,
        imgUrl: 'https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/wedding/logo-min.png'
    };
    wx.ready(function () {
        wx.onMenuShareAppMessage(shareData);
        wx.onMenuShareTimeline(shareData);
        wx.onMenuShareQQ(shareData);
        wx.onMenuShareWeibo(shareData);
        wx.onMenuShareQZone(shareData);
        // wx.hideOptionMenu();
        // wx.hideAllNonBaseMenuItem({
        //    success: function () {}
        // });
    });
```

### 线上demo

[分享](https://forguo.cn/app/)

代码见 `index.html`

### 2.微信公众号授权

> 订阅号授权

