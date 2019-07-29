//声明对象
var tableData = new Array();//"what":"","why":"","when":"","where":"","who":"","whom":"","which":"","howMuch":"","howMany":"","howLong":"","howTo":""
var targetArr = [ "what", "why", 'when', 'where', 'who', 'whom', 'which','howMuch', 'howMany', 'howLong', 'howTo' ];
var r = 0;  //全局变量：记录行数
var label =new Set();  //全局变量：记录表格中"what":"","why":"","when":"","where":"","who":"","whom":"","which":"","howMuch":"","howMany":"","howLong":"","howTo":""有哪些
var querycheckbox = document.getElementsByName("7w4h");  //通过name属性获取CheckBox标签
//声明数组
var h = new Array();
h[0] = 'what(做什么)';
h[1] = 'why(为啥做)';
h[2] = 'when(何时做)';
h[3] = 'where(在哪做)';
h[4] = 'who(谁来做)';
h[5] = 'whom(为谁做)';
h[6] = 'which(有哪些)';
h[7] = 'how much(投入多少)';
h[8] = 'how many(做多少)';
h[9] = 'how long(做多久)';
h[10] = 'how to(如何做)';
//添加表格
function addTable() {
    if ($(":checkbox[name=7w4h]:checked").size() == 0) {
        alert("请选择7w4h标签！！！");
    }else if(label.size != 0){
       alert("7W4H表格已建立,请选择添加行或修改按钮！！！");
    }else {
        $('#mycanDiv').find('thead ').append('<tr id= td'+0+'></tr>');
        $('#mycanDiv').find('tbody ').append('<tr id= td'+1+'></tr>');
        targetArr.forEach(function(element, index,array) {
            if ($('#' + element + '').is(':checked')) {	 //判断CheckBox选中
                if ($('#' + element + 'Th').text() != h[index]) {
                    $('#td'+0+'').append('<th id=' + element + 'Td'+0+'>' + h[index] + '</th>');
                    $('#td'+1+'').append('<td contenteditable="true"id=' + element + 'Td'+1+' > </td>');
                    label.add(element);
                }
            }
        });
        r=2;
        deletRow();
    }
}
//添加行
function addTd(){
    let isEqual = true; //判断此时标签中元素与记录的元素是否相同
    var now = new Set();//记录此时选中的标签
    targetArr.forEach(function(element, index, array) {
        if ($('#' + element + '').is(':checked')) {	 //判断CheckBox选中
            now.add(element); //获取此时选取的标签
        }
    });
    targetArr.forEach(function(element, index, array) {
        if ($('#' + element + '').is(':checked')) {	 //判断CheckBox选中
            if (!label.has(element) || label.size != now.size){		//判断此时标签中元素与记录的元素是否相同
                isEqual= false;
            }
        }
    });
    if(isEqual == true){ //如果标签中元素与记录元素相同
        let rr = r;
        $('#mycanDiv').find('tbody ').append('<tr id= td'+rr+'></tr>');
        targetArr.forEach(function(element, index,array) {
            if ($('#' + element + '').is(':checked')) {	 //判断CheckBox选中
                $('#td'+rr+'').append( '<td id=' + element + 'Td'+rr+' contenteditable="true"></td>');
            }
        });
        r++;	//行数加1
        deletRow();
    }else{
        alert("所选标签与表格不一致，请先通过修改按钮使选中标签与表格一致");
        targetArr.forEach(function(element, index, array){
            if (!label.has(element)){		//找到此时标签中在记录中找不到的标签
                $(":checkbox[id="+element+"]").attr("checked", false); //清除ckeckbox选中事件
            }
        })
        let addele = new Set();  //记录checkbox比表格中少的标签，即需要通过js进行选中的标签
        for(let ele of label){
            if(!now.has(ele) || now.size ==0){
                addele.add(ele);
            }
        }
        let addeleArray = Array.from(addele);
        for(let i=0;i<querycheckbox.length;i++){
            for(let j=0;j<addeleArray.length;i++){
                if(addeleArray[j] == querycheckbox[i].value ){   //如果表格中有checkebox中没有选择的标签，则选中
                    querycheckbox[i].checked = true;
                }
            }
        }
    }
}
//修改表格
function changeTable() {
    let nowLabel = new Set();//记录此时选中的CheckBox标签
    targetArr.forEach(function(element, index,array){
        if($('#' + element + '').is(':checked')){
            nowLabel.add(element);
        }
    })
    //label.forEach(e =>console.log(e));
    let same = true;  //判断此时选中的标签与过程记录的标签是否一致
    //label.forEach(ele => nowLabel.has(ele) ?  true :  false);
    if(nowLabel.size != label.size){
        same = false;
    }else{
        label.forEach(function (ele) {
            if(!nowLabel.has(ele)){
                same = false;
            }
        })
    }
    if(same == false){
        targetArr.forEach(function(element, index,array) {
            var e =r; //局部变量：记录添加或删除多少行而不改变全局行数
            if ($('#' + element + '').is(':checked')) {	 //判断CheckBox选中
                if ($('#' + element + 'Td0').text() != h[index]) {		//该表格不存在
                    $('#mycanDiv').find('thead tr').append('<th id=' + element + 'Td'+0+'>' + h[index] + '</th>');
                    console.log(e);
                    while(e>=1){
                        $('#td'+e+'').append( '<td id=' + element + 'Td'+e+' contenteditable="true"></td>');
                        e--; //局部变量，不影响全局行数
                    }
                    label.add(element);
                }
            }else{
                $('#'+element+'Td0').remove();  //删除表格
                label.delete(element);
                while(e>=1){
                    $('#'+element+'Td'+e+'').remove();  //'#'+element+'Td'
                    e--;//局部变量，不影响全局行数
                }
            }
        });
    }else{
        alert("无修改！！！");
    }
    deletRow();
}
//清空7W4H表格数据
function deleteTableData(){
    for(let i=0;i<r;i++){
      $('#td' + i + '').remove();
    }
    for(let j=0;j<targetArr.length;j++){
        $(":checkbox[id="+targetArr[j]+"]").attr("checked", false);
    }
    r = 0;  //全局变量：记录行数
    label.clear();
}
//将数据保存至数据库
function saveProject(){
    occorPicture();//生成图片
    if(projectId == 0){
        alert("请查看或新建项目");
    }
    else{
        let labelArray = Array.from(label);
        for(let i=0;i<r;i++){
            tableData[i] = new Array();
            for(let j=0;j<labelArray.length;j++){
                if(i==0){
                    tableData[i][j] = labelArray[j];
                }else {
                    tableData[i][j] = $('#' + labelArray[j] + 'Td'+i+'').html();
                }
            }
        }
        console.log(tableData);
        var data = {
            "id" : projectId,
            "appContent" : JSON.stringify(tableData)
        };
        $.ajax({
            type : "PUT",
            url : "/projectManager/api/v1/project",
            data : data,
            success : function(result) {
                console.log(result.state);
                alert("当前项目保存成功");
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                console.log("XMLHttpRequest请求状态码：" + XMLHttpRequest.status);
                console.log("XMLHttpRequest状态码：" + XMLHttpRequest.readyState);
                console.log("textStatus是：" + textStatus);
                console.log("errorThrown是：" + errorThrown);
            }
        });
    }
}
//另存为之前首先检查是否选中了一个项目，然后再执行另存为
function checkAndShowModal(){
    if(projectId == 0){   //未选择项目的情况下不能另存为
        alert("请先选择一个项目，然后另存为！");
    }
    else{
        $('#saveAsNewProjectModal').modal();
    }
}
//另存为一个新项目
function saveAsProject(){
    // 获取输入框中的内容
    projectName = $('#newProjectName')[0].value;//获取项目名
    var createTime = new Date().toLocaleDateString() + ',' + new Date().getHours() + ':' + new Date().getMinutes();//获取项目创建时间
    var memo = $('#newProjectRemark')[0].value;//获取备注
    var datas = $('#myBootstrapTtable').bootstrapTable('getData');
    var data = {
        "id": 0,
        "createTime": createTime,
        "editTime": createTime,
        "projectName": projectName,
        "memo": memo,
        "appContent":JSON.stringify(datas),
        "appResult": appResult
    };
    //获取数据库所有项目名
    $.ajax({
        url: "/projectManager/api/v1/project",
        type: "get",
        async: false,
        dataType: "json",
        success: function (result) {
            projectNameArr.length = 0;//数组清零
            result.content.forEach(function (element, index, array) {
                projectNameArr.push(element.projectName);
            })
        }
    });
    //表格添加数据
    if (projectName === ''||projectName.match(/^\s*$/)) {
        alert("请输入项目名！！！");
    } else if (projectName.length > 25) {
        alert("项目名长度不能超过25个汉字，请重新输入");
    } else if (projectNameArr.indexOf(projectName) !== -1) {
        alert("项目已经存在，请重新输入项目名！！！");
    } else {
        // 添加数据库
        $.ajax({
            type: "post",
            url: "/projectManager/api/v1/project",
            data: data,
            success: function (result) {
                alert("另存为新项目成功！");
                if (result.state) {
                    $('.selectList').prepend('<li class="">\n' +
                        '\t\t\t\t\t<a >\n' +
                        '\t\t\t\t\t\t<div>\n' +
                        '\t\t\t\t\t\t\t<div class="sideProjectLi" onmouseover="this.title = this.innerHTML;" onclick="sideCheck(' + result.content.id + ',this)">\n' +
                        '\t\t\t\t\t\t\t\t' + result.content.projectName + '\n' +
                        '\t\t\t\t\t\t\t</div>\n' +
                        '\t\t\t\t\t\t\t<div style="position:absolute;bottom:6px;right:5px;">\n' +
                        '\t\t\t\t\t\t\t\t<i class="ace-icon fa fa-pencil align-top bigger-125 purple" id="checkSideLi" onclick="modifyBasicInfo(' + result.content.id + ',this)" data-toggle="modal" data-target="#basicInfo"></i>\n' +
                        '\t\t\t\t\t\t\t\t<i class="ace-icon fa fa-trash-o bigger-120 red" id="deleteSideLi" onclick="removeProject(' + result.content.id + ')"></i>\n' +
                        '\t\t\t\t\t\t\t</div>\n' +
                        '\t\t\t\t\t\t</div>\n' +
                        '\t\t\t\t\t</a>\n' +
                        '\t\t\t\t</li>');
                    //侧边栏高度适应
                    var height = $(window).get(0).innerHeight;//获取屏幕高度
                    if ($('#cityList').children('li').length * 36 < height - 310) {
                        $('.selectList').css('height', $('#cityList').children('li').length * 36);
                    } else {
                        $('.selectList').css('height', height - 310);
                    }
                    //移除属性标注
                    for (var i = 0; i < $('.submenu.nav-show.selectList').find('li').length; i++) {
                        $($('.submenu.nav-show.selectList').find('li')[i]).removeAttr('class');
                    }
                    //高亮项目
                    $('#cityList').children('li').first().attr('class', 'active highlight');
                    //面包屑显示项目名
                    $('.showProjectNameDiv').html($('#cityList').children('li').first()[0].innerText);
                    $('.showProjectNameDiv').removeAttr('style');
                    projectId = result.content.id;//项目全局ID
                    data.id = result.content.id;
                    $('#dynamic-table').DataTable().row.add(data).draw(false);
                    addSelfDefine(result);
                }
            }
        });
        $('#saveAsNewProjectModal').modal('hide');//隐藏模态框
        // 在前台添加表格
    }
}
//删除指定行
function deletRow(){
    /*document.oncontextmenu = function () {
        return false;
    }*/
    $("#mycanDiv").oncontextmenu = function(){
        return false;
    }
    let row = r;
    for(let i=1;i<row;i++){
        if(document.getElementById("td"+i) != null){
            document.getElementById("td"+i).onmouseover = function(){
                let thisId =$(this).attr('id');
                $("#"+thisId).css("backgroundColor","#7bacbb");
            }
            document.getElementById("td"+i).onmouseout = function(){
                let thisId =$(this).attr('id');
                $("#"+thisId).css("backgroundColor","white");
            }
            document.getElementById("td"+i).onmousedown = function (e) {
                let thisId =$(this).attr('id');
                //$("#"+thisId).css("backgroundColor","red");
                if(e.button == 2){
                    //alert($(this).attr('id'));
                    let con = confirm("是否删除该行");
                    if(con == true){
                        $("#"+thisId).remove();
                    }else {
                        $("#"+thisId).css("backgroundColor","white");
                    }
                }
            }
        }
    }
}