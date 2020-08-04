$(function () {
    // 定义查询数据对象
    //pagenum 页码值默认第一页 pagesize每页显示的数据条数默认2
    var data = {
        pagenum: 1,
        pagesize: 2,
        cate_id: "",
        state: "",
    };
    initTable();
    //发起请求获取到文章列表数据
    function initTable() {
        $.ajax({
            method: "GET",
            url: "/my/article/list",
            data: data,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg("获取列表失败");
                }
                //使用模板引擎渲染数据
                var strhtml = template("tpl_table", res);
                $("tbody").html(strhtml);
                renderPage(res.total);
            },
        });
    }

    //定义时间过滤器
    template.defaults.imports.dataTormat = function (date) {
        var date = new Date(date);
        var y = date.getFullYear();
        var m = padZero(date.getMonth() + 1);
        var d = padZero(date.getDate());
        var h = padZero(date.getHours());
        var mm = padZero(date.getMinutes());
        var ss = padZero(date.getSeconds());
        return y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + ss;
    };

    //定义补零函数
    function padZero(n) {
        return n < 10 ? "0" + n : n;
    }

    getCate();

    //发起请求获取到文章类别数据
    function getCate() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg("获取文章失败");
                }

                var str = template("tpl_cate", res);
                $("[name=cate_id").html(str);
                //使用layui重新渲染页面
                layui.form.render();
            },
        });
    }

    //监听表单的删选事件
    $("#form_search").on("submit", function (e) {
        e.preventDefault();
        //获取到当前选中的文章分类和发布状态的值
        var cate_id = $("[name=cate_id]").val();
        var state = $("[name=state]").val();
        //将获取到的数据重新赋值给data
        data.cate_id = cate_id;
        data.state = state;
        //重新渲染表格
        initTable();
    });

    //分页渲染函数
    function renderPage(total) {
        //调用lauui中的分页方法
        layui.laypage.render({
            elem: "layPageBox", //分页区盒子的id
            count: total, //数据总数
            limit: data.pagesize, //每页显示的条数
            curr: data.pagenum, //起始页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            // 当分页被切换时触发，函数返回两个参数：obj（当前分页的所有选项值）、first（是否首次，一般用于初始加载的判断）
            jump: function (obj, first) {
                //将最新的页码值和分页值赋值给data
                data.pagenum = obj.curr
                data.pagesize = obj.limit
                //防止进入调用initTable进入死循环.当发生点击的时候再调用
                if (!first) {
                    initTable();
                }
            }
        });
    }

    //给文章中的删除按钮添加点击事件
    //动态生成需要委托添加
    $('tbody').on('click', '.btn_del', function () {
        //获取删除按钮的个数
        var btnNum = $('.btn_del').length
        console.log(btnNum);
        //获取点击按钮的id
        var id = $(this).attr('data_id')
        //添加弹出层
        layui.layer.confirm('确认删除?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //发起请求删除对应的id的文章在渲染页面
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layui.layer.msg('删除数据失败')
                    }
                    layui.layer.msg(res.message)
                    //判断当前页面的按钮数,大于1保持原来的页面,等于1,删除之后跳转到前一页并且加载前一页的数据,页码值-1,但当页面值是1的时候不再减保持当前的页码值
                    if (btnNum === 1) {
                        data.pagenum = data.pagenum === 1 ? 1 : data.pagenum - 1
                    }
                    //重新渲染数据
                    initTable();
                    //do something
                    layui.layer.close(index);
                }
            })

        })

    })

    //给编辑按钮添加事件
    $('tbody').on('click', '.btn_edit', function () {

        var id = $(this).attr('data-id')
        localStorage.setItem('id', id)
        // console.log(id);
        location.href = 'change.html'
    })













});