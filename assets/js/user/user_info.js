$(function () {
    //添加验证
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) return '昵称长度请输入1到6位的字符'
        }
    })

    intiUserInfo();
    //初始化用户的信息
    function intiUserInfo() {
        //发起ajax请求获取数据
        $.ajax({
            method: "GET",
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取信息失败')
                }
                //将获取到的值赋值给表单
                form.val("formUserInfo", res.data)
            }
        })
    }
    //重置按钮添加点击事件
    $('.layui-btn-primary').on('click', function (e) {
        //阻止默认提交重置事件
        e.preventDefault()
        //将原来的数据展示
        intiUserInfo()
    })

    //监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        //阻止默认提交重置事件
        e.preventDefault()
        //发起请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layui.layer.msg('更新用户信息失败')
                layui.layer.msg('更新用户信息成功')
                //将修改的数据冲新渲染到首页
                // <iframe> 中的子页面，如果想要调用父页面中的方法，使用 window.parent 即可
                window.parent.getUerInfo()
            }
        })
    })






})