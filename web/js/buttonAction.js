let projectId = 0;//项目Id
let projectName;//项目名
const appResult = null;//word报告
let appNameChinese = '7W4H';//app中文名（必填）
let USER_NAME = '';//当前登录用户名
// 添加项目后，自定义操作
function addSelfDefine(result) {
    $(":checkbox[name=7w4h]").attr("checked", false); //保存后清除ckeckbox选中事件
    deleteTableData();
    $('#mycanDiv').find('thead tr').html('');
    $('#mycanDiv').find('tbody tr').html('');//清空
    //$("#mycanDiv").remove();//清空
    //console.log("add project successful");
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
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("XMLHttpRequest请求状态码：" + XMLHttpRequest.status);
            console.log("XMLHttpRequest状态码：" + XMLHttpRequest.readyState);
            console.log("textStatus是：" + textStatus);
            console.log("errorThrown是：" + errorThrown);
        }
    });
}
// 查看项目后，自定义操作
function checkSelfDefine(node, result) {
    occorPicture();//生成图片
    deleteTableData();//清除数据
    var id = projectId;
    var getTableData = JSON.parse(result.content.appContent);
    $('#mycanDiv').find('thead th').html('');
    $('#mycanDiv').find('tbody tr').html('');//清空
    $(":checkbox[name=7w4h]").attr("checked", false); //查看项目清除原ckeckbox选中事件
    let labelMap = new Map();//标签what与表格中的what（为什么）等映射
    for(let i=0;i<h.length;i++){
        labelMap.set(targetArr[i],h[i]);
    }
    if(getTableData.length != 0){
        let isNull = false; //判断该行元素是否为null
        let container = new Set();//储存isNull
        let setNull = new Set(); //存储行内为null的内容，if(setNull.size==1 && setNull.has(null))->该行内容全为空—>isNull=true
        //判断该行是否为空
        for(let i=0;i<getTableData.length;i++){
            setNull.clear(); //每循环一次清空储存的内容
            for(let j=0;j<getTableData[i].length;j++){
                setNull.add(getTableData[i][j]);
            }
            if(setNull.size == 1 && setNull.has(null)){
                isNull = true;
            }else {
                isNull = false;
            }
            container[i] = isNull;
        }
        //填充表格
        for(let i=0;i<getTableData.length;i++){
            if(container[i] == false){
                if(i == 0){
                    $('#mycanDiv').find('thead ').append('<tr id= td'+0+'></tr>');  //在thead中添加行标签th
                    for(let j=0;j<getTableData[i].length;j++){  //添加td并从填入数据库返回内容
                        $('#mycanDiv').find('thead tr').append('<th id=' + getTableData[0][j] + 'Td'+0+'>' + labelMap.get(getTableData[i][j]) + '</th>');
                        label.add(getTableData[i][j]);  //全局变量：记录每行中有哪些标签
                    }
                }else{ //if(i>0)
                    $('#mycanDiv').find('tbody ').append('<tr id= td'+i+'></tr>');//在tbody中添加行标签tr
                    for(let j=0;j<getTableData[i].length;j++){
                        $('#td'+i+'').append('<td id=' + getTableData[0][j] + 'Td'+i+' contenteditable="true">'+ getTableData[i][j] + '</td>');
                    }
                }
            }
        }
        //根据数据返回内容，对CheckBox进行自动打钩
        for(let i=0;i<querycheckbox.length;i++){
            if(label.has(querycheckbox[i].value)){
                querycheckbox[i].checked = true;
            }
        }
        r = getTableData.length;//把行数返回非r进行记录
    }
    if(getTableData.length>1){
        deletRow();  //查看项目后调用右键点击删除指定行
    }
}
//删除项目后，自定义操作
function removeSelfDefine(result) {
    $("#mycanDiv").remove();//清空
    console.log("remove project successful");
}
// 生成图片函数
function occorPicture(){
    var content=document.getElementById("7w4h-table")
    html2canvas(content, {
        onrendered: function(canvas) {
            //添加属性
            canvas.setAttribute('id','thecanvas');
            //读取属性值
            // var value= canvas.getAttribute('id');
            document.getElementById('images').innerHTML = '';
            document.getElementById('images').appendChild(canvas);
        }
    });
}
// 保存文件函数
function saveFile(data, filename){
    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    save_link.href = data;
    save_link.download = filename;
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    save_link.dispatchEvent(event);
}
function downLoadPicture(){
    occorPicture();
    var oCanvas = document.getElementById("thecanvas");
    // 获取图片资源
    var img_data1 = Canvas2Image.saveAsPNG(oCanvas, true).getAttribute('src');
    saveFile(img_data1, '7W4H_' + new Date().toLocaleDateString() + '.png');
}
//预览图片
function btnDetailShow(){
    occorPicture();
    var modal = document.getElementById('myModal');
    images.style.display = "none";
}
//定制初始化内容
function setCustomContext() {
//	$("#mycanDiv").load(location.href+" #mycanDiv");

    // occorPicture();
    var customText = {//word编辑区自定义文本内容
        'title': "<h2>本次7W4H项目分析结果为：</h2>",
        'chap1': "<h3>通过分析what、why、how等可得到如下分析图：</h3>",
        'img': '',
        'chap3': "<h3>从图上可知，</h3>"
    };
    var img = $("#thecanvas")[0];  //选择页面中的img元素
    var image = new Image();
    if (img != null) {
        image.src = img.toDataURL("image/png");
    }
    customText.img = image;
    for (var custom in customText) {
        $('#WYeditor').append(customText[custom]);
    }
}