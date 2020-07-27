//调用$.ajaxPrefilter()函数
//每次发起请求的时候可以先获取到请求的配置项.得到当前请求的路径
//将当前的路径和根路径拼接再赋值该当前请求的url配置项
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
})