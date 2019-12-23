/**
 * 
 * @authors HeWeiGang
 * @date    2018-06-19 10.50
 * @version 
 */


//实体类页面加载
function initPage(data){
	$('.text-xs-center').html("");
	$("#entity-show").html("");
	var entitys = data.result;
	var str = "";
	
	var selectId = [];
	var tags = $(".case-sensitive-1").find("input");
	for(var i = 0;i<tags.length;i++){
		selectId[i] = $(tags[i]).val();
	}
	
	for(var i = 0;i<entitys.length;i++){
		
		var entity = entitys[i];
		var lngAndLat = "";
		for(var key in entity.typeInfo){
	 		var typeInfo = key +' : '+ entity.typeInfo[key];
	 		lngAndLat = entity.typeInfo[key];
		}
		
		//设置缩略图
		var img = "";
		if(entity.icon != null){
			img = '<img  src="/oais/[[${siteId}]]/file/'+entity.icon+'" style="max-height: 100%;max-width: 100%;margin-top: 10px; " />';
		}
		
		//设置标签
		var tag = "";
		if(entity.type=="PERSON"){
			tag = '<span class="tag tag-success" style="margin-bottom: 4px;">历史人物</span>';
		}
		if(entity.type=="ORG"){
			tag = '<span class="tag tag-warning" style="margin-bottom: 4px;">组织机构</span>';
		}
		if(entity.type=="PLACE"){
			tag = '<span class="tag tag-danger" style="margin-bottom: 4px;">地理位置</span>';
			var address = lngAndLat.split(",");
			img = '<div class="map-container" data-lng="'+address[0]+'" data-lat="'+address[1]+'"></div>';
		}
		if(entity.type=="EVENT"){
			tag = '<span class="tag tag-primary" style="margin-bottom: 4px;">会议</span>';
		}
		
		//设置选中样式
		var style1 = 'display: none;';
		var style2 = 'named-image-hide';
		var entityId = entity.entityId;
		for(var j = 0;j<selectId.length;j++){
			if(selectId[j] == entityId){
				style1 = '';
				style2 = 'named-image';
				break;
			}
		}
		
		str +=     	'<div class="big-div" data-id="'+entity.entityId+'" data-name="'+entity.name+'">'
					+'<div class="check" id="check'+entity.entityId+'" style="'+style1+'" ><i class="fa fa-check"></i>	</div>'
					+'<div class="'+style2+'" id="border'+entity.entityId+'" >'
					+'<div class="border-image">'
					+'<div class="col-lg-4">'
					+ img
					+'</div>'
					+'<div class="col-lg-7">'
					+'	<div class="row" >'
					+'		<h4 style="margin-top: 2px;">'+entity.name+'</h4>'
					+'	</div>'
					+'	<div class="row">'
					+	tag
					+'	</div>'
					+'	<div class="row" >'
					+'		<div style="padding-top: 3px;height: 20px;width:100%;overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">'+typeInfo+'</div>'
					+'	</div>'
					+'	<div class="row" style="margin-top: 10px;height: 60px;width:100%;position: absolute;  overflow: hidden;-ms-text-overflow: ellipsis;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;">'
					+	entity.summary
					+'	</div>'
					+'</div>'
					+'		</div>'
					+'	</div>'
					+'</div>'
	}
	$("#entity-show").html(str);
	
	//分页按钮
	$('.text-xs-center').html('<ul class="pagination page-links"></ul>');
	if(data.pageNum!=0){
		$('.page-links').twbsPagination({
	        totalPages: data.pageTotle,
	        visiblePages: 5,
	        startPage : data.pageNum,
	        prev: '上一页',
	        next: '下一页',
	        first: '<<',
	        last: '>>',
	        onPageClick: function (event, page) {
	        	$("#pageNum").val(page);
	        	if(page != data.pageNum){
	        		$.ajax({
		        		url:'/oais/[[${siteId}]]/entity/data/all',
		        		type:'get',
		        		dataType:'json',
		        		data:{name:$("#entity-name").val(), type:$("#entity-type").val(), mode:$("#entity-mode").val(), orderType:$("#entity-orderType").val(), pageNum:page},
		        		success:function(data){
		        			initPage(data);
		        		}
		        	})
	        	}
	            $(".pagination").find('li').addClass('page-item');
	            $(".pagination").find('a').addClass("page-link");
	        }
		});
		$("#pageText").html("共"+data.pageTotle+"页，当前第"+data.pageNum+"页");
	}
	
	$('div.map-container').each(function(){
		var lng = $(this).data('lng');
		var lat = $(this).data('lat');
		var map = new AMap.Map(this,{
            zoom: 12,
            center:[lng, lat],
			dragEnable: false,
			zoomEnable: false
			
        });
		var marker = new AMap.Marker({
	        position : [lng, lat],
	        offset : new AMap.Pixel(-12,-12),
	        map : map
		});
	}); 
}

//点击按钮后 弹出实体类页面
$("#named-but").click(function(){
	$("#namedEntity").modal('show');
	//将主页面的标签给到弹出页面
	$(".case-sensitive-1").html($(".case-sensitive-2").html());
	var url = "/oais/[[${siteId}]]/entity/data/all";
	$.ajax({
		url:url,
		type:'post',
		data:{name:$("#entity-name").val(), type:$("#entity-type").val(), mode:$("#entity-mode").val(), orderType:$("#entity-orderType").val(), pageNum:$("#pageNum").val()},
		dataType:'json',
		success:function(data){
			initPage(data);
		}
	}) 
	
})

//实体类点击事件
$("body").on("click",".big-div",function(){
	var id = $(this).attr("data-id");
	var name = $(this).attr("data-name");
	//添加被点击的实体类标签
	if($("#check"+id).attr("style") != ""){//实体类处于未选中状态，添加选中样式
		$("#check"+id).attr("style","");
		$("#border"+id).attr("class","named-image");
		//添加标签
		var str = 	'<div class="tag tag'+id+'" data-id="tag'+id+'">'
					+'	<span>'
					+'		<font style="vertical-align: inherit;">'
					+'			<font style="vertical-align: inherit;">＃</font>'
					+'		</font>'
					+'	</span>'
					+'		<font style="vertical-align: inherit;">'
					+'			<font style="vertical-align: inherit;">'+name+'</font>'
					+'			<a role="button" class="tag-i" data-id="'+id+'">'
					+'				<font style="vertical-align: inherit;">×</font>'
					+'			</a>'
					+'		</font>'
					+'	<input type="hidden" name="case-sensitive[]" value="'+id+'">'
		            +'</div>'
	  	$(".case-sensitive-1").append(str);
	}else{//实体类处于选中状态，取消样式
		//删除标签
		$(".case-sensitive-1").find(".tag"+id).remove();
		$("#check"+id).attr("style","display: none;");
		$("#border"+id).attr("class","named-image-hide");
	}
	//右侧加载该实体类详情
	$.ajax({
		url:'/oais/[[${siteId}]]/entity/data/info/'+id,
		data:'get',
		dataType:'json',
		success:function(data){
			var entity = data.namedEntity;
			var aipResources = data.aipResources;
			//基本属性
			$("#entity-info").html("");
			var desp = entity.desp == null ? "" : entity.desp;
			var infoStr = 	'<tr>'
							+'	<th>名称</th>'
							+'	<td><div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width: 200px;">'+entity.name+'</div></td>'
							+'</tr>'
							+'<tr>'
							+'	<th>义项名</th>'
							+'	<td><div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width: 200px;">'+ desp +'</div></td>'
							+'</tr>';
			if(entity.type == "ORG"){//机构
				infoStr +=  '<tr>'
							+'	<th>简称</th>'
							+'	<td><div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width: 200px;">'+entity.briefName+'</div></td>'
							+'</tr>'
							+'<tr>'
							+'	<th>创办时间</th>'
							+'	<td><div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width: 200px;">'+entity.foundDate+'</div></td>'
							+'</tr>'
							+'<tr>'
							+'	<th>所属地区</th>'
							+'	<td><div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width: 200px;">'+entity.district+'</div></td>'
							+'</tr>'
							+'<tr>'
							+'	<th>机构类型</th>'
							+'	<td><div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width: 200px;">'+entity.orgType+'</div></td>'
							+'</tr>'
							+'<tr>'
							+'	<th>简介</th>'
							+'	<td><div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width: 200px;">'+entity.summary+'</div></td>'
							+'</tr>'
			}
			if(entity.type == "PLACE"){
				var address = entity.address == null ? "" : entity.address;
				infoStr +=  '<tr>'
							+'	<th>地理位置</th>'
							+'	<td><div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width: 200px;">'+address+'</div></td>'
							+'</tr>'
							+'<tr>'
							+'	<th>经度</th>'
							+'	<td><div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width: 200px;">'+entity.lng+'</div></td>'
							+'</tr>'
							+'<tr>'
							+'	<th>纬度</th>'
							+'	<td><div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width: 200px;">'+entity.lat+'</div></td>'
							+'</tr>'
			}
			if(entity.type == "PERSON"){
				infoStr +=  '<tr>'
							+'	<th>简介</th>'
							+'	<td><div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width: 200px;">'+entity.summary+'</div></td>'
							+'</tr>'
							+'<tr>'
							+'	<th>称号</th>'
							+'	<td><div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width: 200px;">'+entity.alias+'</div></td>'
							+'</tr>'
							+'<tr>'
							+'	<th>国籍</th>'
							+'	<td><div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width: 200px;">'+entity.nationality+'</div></td>'
							+'</tr>'
							+'<tr>'
							+'	<th>出生时间</th>'
							+'	<td><div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width: 200px;">'+entity.birthDate+'</div></td>'
							+'</tr>'
							+'<tr>'
							+'	<th>去世时间</th>'
							+'	<td><div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width: 200px;">'+entity.deathDate+'</div></td>'
							+'</tr>'
							+'<tr>'
							+'	<th>职业</th>'
							+'	<td><div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width: 200px;">'+entity.occupation+'</div></td>'
							+'</tr>'
							+'<tr>'
							+'	<th>出生地</th>'
							+'	<td><div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width: 200px;">'+entity.birthPlace+'</div></td>'
							+'</tr>'
							+'<tr>'
							+'	<th>主要成就</th>'
							+'	<td><div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width: 200px;">'+entity.achievements+'</div></td>'
							+'</tr>'
							+'<tr>'
							+'	<th>主要作品</th>'
							+'	<td><div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width: 200px;">'+entity.majorWorks+'</div></td>'
							+'</tr>'
			}
			$("#entity-info").append(infoStr);
			
			//自定义属性
			$("#attributes").html("");
			var attributes = entity.attributes;
			var attrStr = "";
			for (var key in attributes) {
				attrStr += 	'<tr>'
						+'	<th>'+key+'</th>'
						+'	<td><div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width: 200px;">'+attributes[key]+'</div></td>'
						+'</tr>'
			}
			$("#attributes").append(attrStr);
			
			//已链接资源
			$("#entity-url").html("");
			var urlStr = "";
			for(var i = 0; i < aipResources.length; i++){
				var aipResource = aipResources[i];
				var imgType = "";
				var type = aipResource.resourceType;
				if(type == "doc"){
					type = '<i class="fa fa-file-word-o"></i> ';
				}
				if(type == "image"){
					type = '<i class="fa fa-file-image-o"></i> ';
				}
				if(type == "video"){
					type = '<i class="fa fa-file-video-o"></i> ';
				}
				if(type == "audio"){
					type = '<i class="fa fa-file-audio-o"></i> ';
				}
				urlStr 	+='<tr>'
						+'<td style="padding-bottom: 0px;"><a style="color:#404E67;" href="/oais/[[${siteId}]]/sip/'+aipResource.sipId+'"> '+ type + aipResource.title+'</a></td>'
						+'</tr>'
			}
			$("#entity-url").append(urlStr);
		}
	})
})

//删除一个选择的实体类
$("body").on("click",".tag-i",function(){
	//定位到父元素
	var input = $(this).parents('.case-sensitive')[0];
	var id = $(this).attr("data-id");
	if($(input).attr("id") == 'case-sensitive-2'){//通过主页面选择的删除，则应该删除主页面跟弹出页面的标签
		//通过类定位元素删除，删除主页面标签，同时删除弹出页面标签
		$(".tag"+id).remove();
	}else{//通过弹出页面选择的删除，只删除弹出页面的标签，不删除主页面标签
		$(input).find(".tag"+id).remove();
	}
	$("#check"+id).attr("style","display: none;");
	$("#border"+id).attr("class","named-image-hide");
})

//提交选择的实体类
$("#named-confirm").click(function(){
	$(".case-sensitive-2").html($(".case-sensitive-1").html());
	$("#namedEntity").modal('hide');
})

//实体类的类型选择
$(".type-but").click(function(){
	var type = $(this).attr("id");
	if(type == 'all'){
		type = '*';
	}
	$("#pageNum").val("1");
	$("#entity-type").val(type);
	$(".dropdown-toggle").html($(this).html());
	$.ajax({
		url:'/oais/[[${siteId}]]/entity/data/all',
		type:'get',
		data:{name:$("#entity-name").val(), type:$("#entity-type").val(), mode:$("#entity-mode").val(), orderType:$("#entity-orderType").val(), pageNum:$("#pageNum").val()},
		dataType:'json',
		success:function(data){
			initPage(data);
		}
	}) 
})

//关联资源数量排序
$(".entityCount").click(function(){
	$("#pageNum").val("1");
	$("#entity-orderType").val("aipsCount");
	var mode = $("#entity-mode").val();
	if(mode == 'asc'){
		$("#entity-mode").val("desc");
		$(".entityCount").attr("class","ft-arrow-down btn btn-sm btn-secondary fc entityCount");
	}else{
		$("#entity-mode").val("asc");
		$(".entityCount").attr("class","ft-arrow-up btn btn-sm btn-secondary fc entityCount");
	}
	$.ajax({
		url:'/oais/[[${siteId}]]/entity/data/all',
		type:'get',
		data:{name:$("#entity-name").val(), type:$("#entity-type").val(), mode:$("#entity-mode").val(), orderType:$("#entity-orderType").val(), pageNum:$("#pageNum").val()},
		dataType:'json',
		success:function(data){
			initPage(data);
		}
	}) 
})

//搜索
$("#entity-find-but").click(function(){
	var name = $("#entity-name-input").val();
	var str = name.replace(/(^\s*)|(\s*$)/g, '');
	if(str == '' | str == undefined | str == null){
		name = "*";
	}
	$("#entity-name").val(name);
	$("#entity-type").val("*");
	$(".dropdown-toggle").html('全部类型');
	$("#entity-mode").val("asc");
	$(".entityCount").attr("class","ft-arrow-up btn btn-sm btn-secondary fc entityCount");
	$("#entity-orderType").val("name");
	$("#pageNum").val("1");
	$.ajax({
		url:'/oais/[[${siteId}]]/entity/data/all',
		type:'get',
		data:{name:$("#entity-name").val(), type:$("#entity-type").val(), mode:$("#entity-mode").val(), orderType:$("#entity-orderType").val(), pageNum:$("#pageNum").val()},
		dataType:'json',
		success:function(data){
			initPage(data);
		}
	});
})

//当提示div加入内容时  添加样式
$("#auto_div").bind("DOMNodeInserted", function(){
	$("#auto_div").attr("style","border:1px solid #000; position:absolute;background-color: white;width: 1046px;z-index:500;margin-top: 40px;");
});

$(function(){
	//鼠标点击其他地方时，隐藏智能提示内容
	document.onclick = function(e){
		var e = e ? e : window.event;  
        var tar = e.srcElement || e.target;  
        if (tar.id != 'entity-name-input') { 
        	//重新给下标置为0
        	index = 0;
            $("#auto_div").hide();
        }else{
        	$("#auto_div").show();
        }  
	}
})

//搜索输入框内容改变时，从服务器取到相关的智能提示内容
$("#entity-name-input").on('input propertychange',function(){
	//下标重新置空
	index = 0;
	var word = $("#entity-name-input").val();
	if(word.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'')!=""&&word!=""){
		$.ajax({
			type:'get',
			url:'/oais/[[${siteId}]]/entity/suggest',
			data:{word:word},
			dataType:'json',
			success:function(data){
				if(data.length>0){
					add(data);
				}
			}
		})
	}else{
		//内容置空，样式置空
		$("#auto_div").html("");
		$("#auto_div").attr("style","");
	}
});	

//点击输入框时，从服务器取到相关的智能提示内容
$("#entity-name-input").on('click',function(){
	var word = $("#entity-name-input").val();
	if(word.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'')!=""&&word!=""){
		$.ajax({
			type:'get',
			url:'/oais/[[${siteId}]]/entity/suggest',
			data:{word:word},
			dataType:'json',
			success:function(data){
				if(data.length>0){
					add(data);
				}
			}
		})
	}else{
		//内容置空，样式置空
		$("#auto_div").html("");
		$("#auto_div").attr("style","");
	}
});	

//添加智能提示内容
function add(data){
	$("#auto_div").html("");
	for(var i = 0;i<data.length;i++){
		var str = '<div class="suggest" style= "font-size: 16px;  padding:10px 10px 10px 10px;" id="suggest'+(i+1)+'">'+data[i]+'</div>';
		$("#auto_div").append(str);
	}
}

//鼠标移入时，鼠标停留的智能提示内容高亮显示
$("#auto_div").on("mouseenter",".suggest",function(){
	$(".suggest").css("background-color", "");
	$(this).css("background-color", "#ccc");
})

//鼠标移出时，取消高亮
$("#auto_div").on("mouseleave",".suggest",function(){
	$(this).css("background-color", "");
})

//鼠标点击时，发送请求
$("#auto_div").on("click",".suggest",function(){
	var name = $(this).text();
	if(name.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'')==""|name==""){
		name = '*';
	}
	$("#entity-name").val(name);
	$("#entity-name-input").val(name);
	$("#entity-type").val("*");
	$("#entity-mode").val("asc");
	$("#entity-orderType").val("name");
	$("#pageNum").val("1");
	$.ajax({
		url:'/oais/[[${siteId}]]/entity/data/all',
		type:'get',
		data:{name:$("#entity-name").val(), type:$("#entity-type").val(), mode:$("#entity-mode").val(), orderType:$("#entity-orderType").val(), pageNum:$("#pageNum").val()},
		dataType:'json',
		success:function(data){
			initPage(data);
		}
	}) 
})

//键盘上下键选择时的当前下标
var index = 0;
//键盘上下选择事件
$("#entity-name-input").keyup(function(event){
	//当前提示有多少条
	var maxIndex = $(".suggest").length;
	//全部取消高亮
	$(".suggest").css("background-color","");
	if(event.keyCode==38){//上
		if(index <= 1){
			index = maxIndex;
		}else{
			index = index-1;
		}
		$("#suggest"+index).css("background-color", "#ccc");
		$("#entity-name-input").val($("#suggest"+index).text());
	}
	if(event.keyCode==40){//下
		if(index >= maxIndex){
			index = 1;
		}else{
			index = index+1;
		}
		$("#suggest"+index).css("background-color", "#ccc");
		$("#entity-name-input").val($("#suggest"+index).text());
	}
	if(event.keyCode==13){//回车
		index = 0;
		$("#auto_div").hide();
		var name = $("#entity-name-input").val();
		if(name.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'')==""|name==""){
			name = '*';
		}
		$("#entity-name").val(name);
		$("#entity-type").val("*");
		$("#entity-mode").val("asc");
		$("#entity-orderType").val("name");
		$("#pageNum").val("1");
		$.ajax({
			url:'/oais/[[${siteId}]]/entity/data/all',
			type:'get',
			data:{name:$("#entity-name").val(), type:$("#entity-type").val(), mode:$("#entity-mode").val(), orderType:$("#entity-orderType").val(), pageNum:$("#pageNum").val()},
			dataType:'json',
			success:function(data){
				initPage(data);
			}
		}) 
	}
})

$("#modal-add-but").click(function(){
	$("#modal-add").modal("show");
	$("#namedEntity").modal("hide");
})

$("#btn-add-canle").click(function(){
	$("#modal-add").modal("hide");
	$("#namedEntity").modal("show");
})

$("#entity-confirm-canle").click(function(){
	$("#modal-add").modal("hide");
	$("#namedEntity").modal("show");
})
// 手动新增实体
$('#btn-add-entity').click(function(){
	var url = '/oais/[[${siteId}]]/enrichment/add/entity';
	var postData = $('#form-add-entity').serialize();
	entityType = $('#form-add-entity [name=type]').val();
	$.post(url, postData, function(data){
		if(data.status == 1000) {
			// 成功响应
			toastr.success('成功新增实体！','实体新增');
			var formName = '#form-confirm-'+entityType.toLowerCase();
			var modalName = '#modal-confirm-'+entityType.toLowerCase();
			fillEntityInfo(formName, data);
			
			if(data.type=='PLACE'){
				
			}
			
			$('#modal-add').modal('hide');
			$(modalName).modal('show');
		}
	})
});

// 点击按钮增加实体
$('#modal-add').on('click', 'button[data-type]', function(){
	var url = '/oais/[[${siteId}]]/entity/add'
	
	var type = $(this).data('type');
	var name = $('span', $(this)).text();
	
	var postData = {type: type, name: name, aipId: aipId};
	
	$.post(url, postData, function(data){
		if(data.status == 1000) {
			//TODO: 完成响应
			console.log(123456);	
		}
	});
});

function fillEntityInfo(formName, data) {
	$('input,textarea', formName).each(function(){
		var fieldName = $(this).attr('name');
		$(this).val(data.entity[fieldName]);
	});
	
	if(entityType == 'PLACE') {
		bigMap.setCenter([data.entity.lng, data.entity.lat]);
		getAddress(bigMap.getCenter());
	} else if (entityType == 'PERSON'){
		$('.sense-options').hide();	
		var sensesHtml = '';
		var senses = data.entity.senses;
		for(var i = 0; i < senses.length; i++) {
			var sense = senses[i];
			var senseInfo = sense.split('##');
			sensesHtml += '<button type="button" class="btn btn-outline-success" data-url="' + senseInfo[1] + '">'+senseInfo[0]+'</button>'
		}
		$('#div-sense').html(sensesHtml);
	}
	entityId = data.entity.id;
}

var bigMap = new AMap.Map('modal-map', {
	zoom: 14,
	center:[116.397477,39.908692],
});

var geocoder = new AMap.Geocoder({
    radius: 1000,
    extensions: "all"
});

getAddress(bigMap.getCenter());
function getAddress(lngLat){
	geocoder.getAddress(lngLat, function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
            var address = result.regeocode.formattedAddress; //返回地址描述
            $("#modal-confirm-place").find("input[name='address']").val(address);
        }
    });
}

//实体确认
$('.btn-confirm').click(function(){
	var $form = $(this).parents('.modal').find('form');
	// 完整性检查
	if(!inputCheck($form)){
		return false;
	}
	
	var postData = $form.serializeArray();
	var entityName = $('input[name=name]', $form).val();
	postData.push({name: 'entityId', value: entityId});
	postData.push({name: 'entityType', value: entityType});
	
	var url = '/oais/[[${siteId}]]/enrichment/confirm/entity';
	$.post(url, postData).done(function(data){
		if(data.status == 1000) {
			toastr.success('确认成功', entityName);
			$('.modal').modal('hide');
			$("#namedEntity").modal("show");
		} else {
			toastr.error('出错啦！');	
		}
	});
	
	return false;
})

// 表单完整性检查方法
function inputCheck($form){
	var complete = true;
	var $inputs = $('[data-msg]', $form);
	var n = $inputs.size();
	for(var i = 0; i < n; i ++) {
		var $input = $inputs.eq(i);
		if($input.val() == '') {
			$input.siblings('small.danger').text($input.data('msg'));
			$input.parents('div.form-group').addClass('has-danger').removeClass('has-success');
			complete = false;
		} else {
			$input.siblings('small.danger').text('');
			$input.parents('div.form-group').addClass('has-success').removeClass('has-danger');
		}
	}
	
	return complete;
}

//更改义项按钮
$('#btn-change-entity').on('click', function(){
	$('.sense-options').toggle();
});

//更改义项
$('#div-sense').on('click', 'button', function(){
	var url = '/oais/[[${siteId}]]/enrichment/change/sense';
	var senseUrl = encodeURIComponent($(this).data('url'));
	var desp = $(this).text();
	var $form = $(this).parents('.modal').find('form');
	var entityName = $('input[name=name]', $form).val();
	var postData = {
		entityType: entityType,
		name: entityName,
		desp: desp,
		senseUrl: senseUrl,
	};
	
	$.post(url, postData).done(function(data){
		if(data.status == 1000) {
			var formName = '#form-confirm-person';
			fillEntityInfo(formName, data);
		} else {
			
		}
	});
});