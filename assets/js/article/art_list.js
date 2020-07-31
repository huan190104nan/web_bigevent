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
        console.log(res);
        if (res.status !== 0) {
          return layui.layer.msg("获取列表失败");
        }
        //使用模板引擎渲染数据
        var strhtml = template("tpl_table", res);
        $("tbody").html(strhtml);
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
});
