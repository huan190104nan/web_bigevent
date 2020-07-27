$(function () {
    //点击去注册
    $('#link_reg').on('click', function () {
        $('.login').hide();
        $('.reg').show();
    })

    //点击去登录
    $('#link_login').on('click', function () {
        $('.login').show();
        $('.reg').hide();
    })

    //表单验证
    //获取表单元素
    var form = layui.form
    var layer = layui.layer

    form.verify({
        //密码框验证
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //再次确认密码验证
        repwd: function (value) {
            //获取到密码框的值
            var pwd = $('.reg [name=password]').val()
            console.log(pwd);
            if (pwd !== value) {
                return layer.msg('2次输入的密码不一致');
            }
        }
    })

    //监听注册页面提交的事件(发起ajax请求)
    $('#form_reg').on('submit', function (e) {
        //阻止表单默认提交行为
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            console.log(res.status);
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功请登录')
            //注册成功后自动跳转到登录页面
            $('#link_login').click()
        })
    })


    //监听登录表单的提交事件
    $('#form_login').on('submit', function (e) {
        //阻止默认提交行为
        e.preventDefault()
        //提交ajax请求
        $.ajax({
            method: 'POST',
            url: '/api/login',
            //获取到表单所有带有name属性的值
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                //将获取到的token值存入到本地存储中
                localStorage.setItem('token', res.token)
                //跳转到主页面
                location.href = 'index.html'
            }

        })
    })













})