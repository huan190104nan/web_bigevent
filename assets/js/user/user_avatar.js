$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    //给上传按钮添加点击事件
    $('.btn_up').on('click', function () {
        //触发文件上传
        $('#file').click()
        console.log(11);
    })
    //更换裁剪区的图片(上传文件添加改变事件)
    $('#file').on('change', function (e) {
        //获取用户选择文件的列表
        var filesList = e.target.files
        // console.log(filesList);

        //判定用户有没有选定图片
        if (filesList.length === 0) return layui.layer.msg('请选择照片')
        //有选择图片则获取到对应的图片
        var file = e.target.files[0]
        //将图片转换成路径
        var imgURL = URL.createObjectURL(file)
        console.log(imgURL);
        //初始化图片裁剪区域(固定写法)
        //销毁旧的区域--重新设置图片的路径--重新初始化裁剪区域
        $image.cropper('destroy').attr('src', imgURL).cropper(options)
    })

    //给确定按钮添加事件

    $('.btn_sure').on('click', function () {
        //将裁剪的图片上传到服务器上
        var dataURL = $image.cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        //发起ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更换头像失败')
                }
                layui.layer.msg('更换头像成功')
                //再将头像渲染到页面
                window.parent.getUerInfo()
            }
        })



    })




})