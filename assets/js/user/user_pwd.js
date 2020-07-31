$(function () {
    //添加密码验证信息
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) return '新密码和旧密码不能一致'
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) return '2次输入的密码不一致'
        }

    })

    //监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layui.layer.msg('修改密码失败')
                layui.layer.msg('修改密码成功')
                //清空表单
                $('.layui-form')[0].reset()

            }
        })
    })


})