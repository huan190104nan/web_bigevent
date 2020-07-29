//调用$.ajaxPrefilter()函数
//每次发起请求的时候可以先获取到请求的配置项.得到当前请求的路径
//将当前的路径和根路径拼接再赋值该当前请求的url配置项

$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    //为统一有权限的请求设置headers
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //用户没有登录的话是不能进入后台主页,强制返回到登录页面
    options.complete = function (res) {
        console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //清空本地存储的token
            localStorage.removeItem('token')
            //跳转到登录首页
            location.href = 'login.html'
        }

    }


})