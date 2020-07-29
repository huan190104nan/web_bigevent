$(function () {
    getUerInfo()
    //给退出按钮添加点击事件
    $('#btnOut').on('click', function () {
        //弹出框用户确认是否退出
        layui.layer.confirm('确定退出登录?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            //退出登录后清理本地啊存储
            localStorage.removeItem('token')
            //重新返回登录页面
            location.href = 'login.html'
            layer.close(index);
        })
    })


})

//获取用户的信息
function getUerInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取信息失败')
            }
            console.log(res);
            //获取成功之后渲染头像
            renderAvatar(res.data)
        }

    })
}

//渲染头像
function renderAvatar(user) {
    //显示名字先以昵称为准,没有获取到注册的姓名
    var name = user.nickname || user.username
    //获取到的内容添加到页面中
    $('#welcome').html('欢迎' + name)
    if (user.user_pic !== null) {
        //给图片的src将获取到的头像地址赋值,并且显示
        $('.layui-nav-img').attr('src', user.user_pi).show()
        //文本头像隐藏
        $('.text_avatar').hide()
    } else {
        //图片头像隐藏
        $('.layui-nav-img').hide()
        // 文本头像显示 里面的内容是昵称的第一个字母
        var first = name[0].toUpperCase()
        $('.text_avatar').html(first).show()
    }

}