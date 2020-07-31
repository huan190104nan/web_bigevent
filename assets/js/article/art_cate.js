$(function () {
    initArtCateLis()

    //获取文章分类列表
    function initArtCateLis() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var strhtml = template('tlp_table', res)
                //将获取的文章列表渲染到页面上
                $('tbody').html(strhtml)
            }
        })

    }

    //给添加类别添加点击事件
    var index = null
    $('#btnAddCate').on('click', function () {

        //弹出弹出框layer.open  area设置弹出框的宽高 type 1将默认的确认按钮取消
        index = layui.layer.open({
            type: 1,
            area: ['500px', '260px'],
            title: '添加文章分类',
            content: $('#dialog_add').html()
        });

    })

    //监听弹出框中表单的提交事件
    $('body').on('submit', '#add_form', function (e) {
        //阻止表单默认的提交事件
        e.preventDefault()
        //发起请求
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('新增文章分类失败')
                }
                //成功的话重新渲染数据到页面
                initArtCateLis()
                layui.layer.msg(res.message)
                //添加成功之后关闭弹出框
                layui.layer.close(index)
            }
        })
    })

    //给编辑按钮添加点击事件
    var indexEdit = null
    $('tbody').on('click', '#btnEditCate', function () {

        //弹出弹出框layer.open  area设置弹出框的宽高 type 1将默认的确认按钮取消
        indexEdit = layui.layer.open({
            type: 1,
            area: ['500px', '260px'],
            title: '修改文章分类',
            content: $('#dialog_edit').html()
        });

        //点击编辑按钮对应的原来的内容添加到弹出框中
        var id = $(this).attr('data-id')
        console.log(id);
        //发起请求
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                layui.form.val('edit_form', res.data)
                console.log(res.data);
            }
        })

    })


    //监听修改按钮中表单的提交事件
    $('body').on('submit', '#edit_form', function (e) {
        //阻止表单默认的提交事件
        e.preventDefault()
        //发起请求
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新文章分类失败')
                }
                //成功的话重新渲染数据到页面
                initArtCateLis()
                layui.layer.msg(res.message)
                //添加成功之后关闭弹出框
                layui.layer.close(indexEdit)
            }
        })
    })

    //给删除按钮添加事件
    $('tbody').on('click', '#btnDeleCate', function () {
        //获取到当前的id
        var id = $(this).attr('data-id')
        //添加弹框
        layui.layer.confirm('确定删除?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            //发起请求,删除对应的id的内容再重新将数据添加到页面
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layui.layer.msg('删除文章失败')
                    }
                    initArtCateLis()
                    layui.layer.msg(res.message)
                    //添加成功之后关闭弹出框
                    layui.layer.close(index);
                }
            })

        })
    })


})