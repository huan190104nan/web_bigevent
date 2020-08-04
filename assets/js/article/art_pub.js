$(function () {
    var layer = layui.layer
    var form = layui.form
    // 初始化富文本编辑器
    initEditor()
    initCate()
    //发起请求获取到文章类别
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取文章失败')
                }
                //获取成功之后将数据渲染到页面
                var strhtml = template('tel_select', res)
                $('[name=cate_id]').html(strhtml)
                //渲染表单中的数据
                form.render()
            }
        })
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')
    console.log($image);

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    //给选择封面添加点击事件
    $('#chooseImage').on('click', function () {
        $('#upfile').click()
    })
    //监听文件上传事件
    $('#upfile').on('change', function (e) {
        //获取到上传文件的列表
        var fileLists = e.target.files
        console.log(fileLists);
        //如果用户没有选择文件则退出
        if (fileLists.length == 0) return
        //选择了文件将新的图片添加到裁剪区
        var newIMageUrl = URL.createObjectURL(fileLists[0])
        // 为裁剪区域重新设置图片
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newIMageUrl) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    //默认发布状态是已发布
    var states = '已发布'
    //给存为草稿按钮添加点击事件
    $('#btnsave2').on('click', function () {
        states = '草稿'
    })

    // 监听表单提交事件
    $('#formUP').on('submit', function (e) {
        //阻止表单默认提交
        e.preventDefault()
        //定义需要传入的参数
        var fd = new FormData($(this)[0])
        //将发布状态的数据添加到fd中
        fd.append('state', states)

        //设置cover_img 裁剪图片的数据(转换成文件)
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                //  将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                //发起ajax请求
                publishArticle(fd)
            })


        function publishArticle(fd) {
            $.ajax({
                method: 'POST',
                url: '/my/article/add',
                data: fd,
                contentType: false,
                processData: false,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('发表文章失败')
                    }
                    //成功之后跳转到文章列表页面
                    layer.msg('发表文章成功')
                    location.href = 'art_list.html'


                }


            })
        }


    })








})