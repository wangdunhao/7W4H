<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>创新方法工作平台</title>
    <!--添加页面框架-->
    <link rel="import" id="frame" href="/webresources/common/html/appFrame.html">
    <script type="text/javascript" src="js/buttonAction.js"></script>
    <script type="text/javascript" src="js/index.js"></script>
    <link rel="stylesheet" href="css/table.css">
    <!--添加页面框架-->
    <script type="text/javascript" src="js/dom-to-image/dom-to-image.js"></script>
    <!-- html2canvas将Dom节点在Canvas里边画出来 -->
    <script src="js/dom-to-image/html2canvas.min.js"></script>
    <!-- 将canvas图片保存成图片 -->
    <script src="js/dom-to-image/canvas2image.js"></script>
    <script src="js/dom-to-image/base64.js"></script>
    <!-- CheckBox表单美化插件 -->
<%--    <link rel="stylesheet" href="css/jquery.richUI.min.css" />
    <script type="text/javascript" src="js/jquery-rich/jquery.richUI.min.js"></script>
    <script type="text/javascript" src="js/jquery-rich/jquery.browser.min.js"></script>--%>
   <%-- <script type="text/javascript" src="js/jquery-rich/jquery-1.11.3.min.js"></script>--%>
    <%--<script type="text/javascript">
        $(function () {
            $("input[name='7w4h']").richcheckbox({allBtn:true});
        })
    </script>--%>
    <!--ickeck-->
    <link href="js/icheck/skins/all.css" rel="stylesheet">
    <script src="js/icheck/icheck.min.js"></script>
</head>
<body class="no-skin">
<div id="mainFunctionHtml">
    <div id="myCustomLi">
        <li class="active"><a data-toggle="tab" href="#abc"> <i
                class="green ace-icon fa fa-desktop bigger-120"></i>7w4h选择
        </a></li>
    </div>
    <div id="myCustomTab">
        <div class="tab-pane active" id="abc">
            <div id="mainBtnGroup" class="btn-group btn-group-sm">
                <button type="button" class="btn btn-info" id="submit"
                        onclick="addTable()">
                    <span class="ace-icon glyphicon glyphicon-plus"></span>新建
                </button>
                <button type="button" class="btn btn-info" id="addTd"
                        onclick="addTd()">
                    <span class="ace-icon glyphicon glyphicon-plus"></span>添加行
                </button>
                <button type="button" class="btn btn-info" id="changeTable"
                        onclick="changeTable()">
                    <span class="glyphicon glyphicon-edit"></span>修改
                </button>
                <button type="button" class="btn btn-info" id="saveProject"
                        onclick="saveProject()">
                    <span class="ace-icon fa fa-save"></span>保存
                </button>
                <a type="button" class="btn btn-info" id="saveAsProject"
                   data-toggle="modal" data-target="#saveAsModal"> <span
                        class="glyphicon glyphicon-check"></span>另存为
                </a>
                <a type="button" class="btn btn-info" id="downLoadPicture" onclick="downLoadPicture()"> <span
                        class="ace-icon glyphicon glyphicon-download"></span>导出图片
                </a>
                <br><br>
                <form id="checkBox" action="" method="POST">
                    <input id="what" type="checkbox" name="7w4h" value="what"style="zoom:180%;">
                    <label for="what"><font size="5">what</font></label>
                    <input id="why" type="checkbox" name="7w4h" value="why"style="zoom:180%;">
                    <label for="why"><font size="5">why</font></label>
                    <input id="when" type="checkbox" name="7w4h" value="when"style="zoom:180%;">
                    <label for="when"><font size="5">when</font></label>
                    <input id="where" type="checkbox" name="7w4h" value="where"style="zoom:180%;">
                    <label for="where"><font size="5">where</font></label>
                    <input id="who" type="checkbox" name="7w4h" value="who"style="zoom:180%;">
                    <label for="who"><font size="5">who</font></label>
                    <input id="whom" type="checkbox" name="7w4h" value="whom"style="zoom:180%;">
                    <label for="whom"><font size="5">whom</font></label>
                    <input id="which" type="checkbox" name="7w4h" value="which"style="zoom:180%;">
                    <label for="which"><font size="5">which</font></label>
                    <input id="howMuch" type="checkbox" name="7w4h" value="howMuch"style="zoom:180%;">
                    <label for="howMuch"><font size="5">how Much</font></label>
                    <input id="howMany" type="checkbox" name="7w4h" value="howMany" style="zoom:180%;">
                    <label for="howMany"><font size="5">how Many</font></label>
                    <input id="howLong" type="checkbox" name="7w4h" value="howLong" style="zoom:180%;">
                    <label for="howLong"><font size="5">how Long</font></label>
                    <input id="howTo" type="checkbox" name="7w4h" value="howTo" style="zoom:180%;">
                    <label for="howTo"><font size="5">how To</font></label>
                    <br>
                    <%--<div style="width: 100%">
                        <input id="what" type="checkbox" name="7w4h"value="what" lab="what"style="zoom:180%;" >
                        <input id="why" type="checkbox" name="7w4h" value="why"lab="why"style="zoom:180%;" >
                        <input id="when" type="checkbox" name="7w4h" value="when"lab="when"style="zoom:180%;" >
                        <input id="where" type="checkbox" name="7w4h" value="where"lab="where"style="zoom:180%;" >
                        <input id="who" type="checkbox" name="7w4h" value="who"lab="who"style="zoom:180%;" >
                        <input id="whom" type="checkbox" name="7w4h" value="whom"lab="whom"style="zoom:180%;" >
                        <input id="which" type="checkbox" name="7w4h" value="which"lab="which"style="zoom:180%;" >
                        <input id="howMuch" type="checkbox" name="7w4h" value="howMuch"lab="how Much"style="zoom:180%;" >
                        <input id="howMany" type="checkbox" name="7w4h" value="howMany" lab="how Many"style="zoom:180%;" >
                        <input id="howLong" type="checkbox" name="7w4h" value="howLong"lab="how Long" style="zoom:180%;" >
                        <input id="howTo" type="checkbox" name="7w4h" value="howTo" lab="how To"style="zoom:180%;" >
                    </div>--%>
                </form>

                <div id="mycanDiv" >
                    <table id="7w4h-table">
                        <thead>
                       <%-- <tr id="td0"></tr>--%>
                        </thead>
                        <tbody  id="row">
                        <%--<tr id="td1"></tr>--%>
                        </tbody>
                    </table>
                </div>
                <div id="myMenu"></div>
            </div>
        </div>
        <div id="images" style="display:none;">图片预览区</div>
        <!--帮助页面-->
        <div id="helpHtml">
            <div class="page-header">
                <h1>7w4h使用说明</h1>
            </div>
            <div class="alert alert-block alert-success" id="appHelp">
                <div class="helpClass">
                    <p class="helpP">
                        <i class="ace-icon fa fa-check green"></i> 欢迎使用<strong
                            class="green">7W4H App</strong>, 使用流程如下：<br>
                        &nbsp;&nbsp;&nbsp;&nbsp;1、新建项目<br><img src="./template/img/newProject.png" width="500px"
                                                               height="300px"><br>
                        &nbsp;&nbsp;&nbsp;&nbsp;2、生成7W4H表格<br> <img src="./template/img/occurProject.png" width="500px"
                                                                    height="300px"><br>
                        &nbsp;&nbsp;&nbsp;&nbsp;3、保存项目<br> <img src="./template/img/saveProject.png" width="500px"
                                                                height="300px"><br>
                        &nbsp;&nbsp;&nbsp;&nbsp;4、注意事项<br>通过选中7W4H标签生成7W4H表格，新建按钮集成新建、删除功能，若需新加7W4H表格则选中新添标签，点击新建按钮；
                        若需删除则不选中该标签，点击新建按钮。<br>

                    <p>
                </div>
            </div>
        </div>
    </div>
    <!--另存为模态框-->
    <div class="modal fade" id="saveAsModal" tabindex="-1" role="dialog"
         aria-labelledby="myModalLabel" aria-hidden="true"
         style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="newProjectModalTitle">新建项目</h4>
                </div>
                <div class="modal-body">
                    <!--  -->
                    <div class="input-group">
                        <span class="input-group-addon">项目名：</span> <input type="text"
                                                                           class="form-control" placeholder="请输入项目名称"
                                                                           id="saveAsProjectNameModal">
                    </div>
                    <br>
                    <div class="input-group">
                        <span class="input-group-addon">备 注：</span> <input type="text"
                                                                           class="form-control" placeholder="请输入备注"
                                                                           id="saveAsProjectRemarkModal">
                    </div>
                    <br>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭
                    </button>
                    <button type="button" class="btn btn-primary"
                            onclick="saveAsProject()" id="saveAsProButton">确认</button>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>