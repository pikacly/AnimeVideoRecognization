function check(){
	var chestr="";
	var oInput = document.getElementsByName("check");
	for(var i=0; i<oInput.length; i++){
		if(oInput[i].checked == true){
			chestr+=oInput[i].value+",";
		}
	}
	if(chestr == ""){
		return false;
	}
	return chestr;
}


//多选操作
function checkBoxResource(available){
	   if(check() === false){
		   swal('提示','请选择需要查看的资源！','error');
	}else{
		checkTheme("");
	}	
}


function checkTheme(pageid) {
	var chestrId = check();
	if(pageid != ""){
		chestrId = pageid;
	}
	var url="/[[${siteId}]]/findByCheckedAipSiteId";
	var param = {aipId:chestrId};
	 $.ajax({
		 type:"get",
		 url:url,
		 data:param,
		 dataType:"JSON",
		 success:function(data){
			 var aipResource = data.aipResource;
			 var site = data.site;
			 $('input').iCheck('uncheck');  
			 $("#show_AipInfo").empty();
			 var text = '';
			 var name = '';
			 var img = '';
			 for(var i = 0; i <aipResource.length;i++){
				 	if(aipResource[i].fileSuffix=="doc"){img = '<img class="img_size_file" src="/img/file_thumbnail/doc.png"/>'}
				 	if(aipResource[i].fileSuffix=="docx"){img = '<img class="img_size_file"  src="/img/file_thumbnail/docx.png"/>'}
				 	if(aipResource[i].fileSuffix=="file"){img = '<img class="img_size_file" src="/img/file_thumbnail/file.png"/>'}
				 	if(aipResource[i].fileSuffix=="flv"){img = '<img class="img_size_file" src="/img/file_thumbnail/flv.png"/>'}
				 	if(aipResource[i].fileSuffix=="html"){img = '<img class="img_size_file" src="/img/file_thumbnail/html.png"/>'}
				 	if(aipResource[i].fileSuffix=="jpeg"){img = '<img class="img_size_file" src="/img/file_thumbnail/jpeg.png"/>'}
				 	if(aipResource[i].fileSuffix=="jpg"){img = '<img class="img_size_file" src="/img/file_thumbnail/jpg.png"/>'}
				 	if(aipResource[i].fileSuffix=="mkv"){img = '<img class="img_size_file" src="/img/file_thumbnail/mkv.png"/>'}
				 	if(aipResource[i].fileSuffix=="mov"){img = '<img class="img_size_file" src="/img/file_thumbnail/mov.png"/>'}
				 	if(aipResource[i].fileSuffix=="mp3"){img = '<img class="img_size_file" src="/img/file_thumbnail/mp3.png"/>'}
				 	if(aipResource[i].fileSuffix=="mp4"){img = '<img class="img_size_file" src="/img/file_thumbnail/mp4.png"/>'}
				 	if(aipResource[i].fileSuffix=="pdf"){img = '<img class="img_size_file" src="/img/file_thumbnail/pdf.png"/>'}
				 	if(aipResource[i].fileSuffix=="png"){img = '<img class="img_size_file" src="/img/file_thumbnail/png.png"/>'}
				 	if(aipResource[i].fileSuffix=="ppt"){img = '<img class="img_size_file" src="/img/file_thumbnail/ppt.png"/>'}
				 	if(aipResource[i].fileSuffix=="pptx"){img = '<img class="img_size_file" src="/img/file_thumbnail/pptx.png"/>'}
				 	if(aipResource[i].fileSuffix=="txt"){img = '<img class="img_size_file" src="/img/file_thumbnail/txt.png"/>'}
				 	if(aipResource[i].fileSuffix=="wav"){img = '<img class="img_size_file" src="/img/file_thumbnail/wav.png"/>'}
				 	if(aipResource[i].fileSuffix=="ogv"){img = '<img class="img_size_file" src="/img/file_thumbnail/ogv.png"/>'}
				 text = '<div class="top-div">' 
					+'<div style="height: 40px; width: 40px;">'
 				 	+ img 
 				 	+'<input type="hidden" id="aipId_value" name="aipId" value="'+ aipResource[i].id +'">'
				 	+'</div>'
 					+'<div class="font-color">'
					+'<p class=" font-size">'  
					+ aipResource[i].title
					+'</p>'
					+'<p class="border-foot">简介</p>'
					+'</div>'
					+'</div>'
					+'<div class="box_wrap containerr">'
					+'<table class="tr_padding">'
					+'<tr >'
					+'<th class="th-text">资源名称：</th>'
					+'<td>'+ aipResource[i].title +'</td>'
					+'</tr>'
					+'<tr >'
					+'<th class="th-text">上传时间：</th>'
					+'<td >'+ aipResource[i].uploadTime +'</td>'
					+'</tr>'
					+'<tr >'
					+'<th class="th-text">描述：</th>'
					+'<td><p class="p_shorten">' + aipResource[i].description + '</p></td>'
					+'</tr>'
					+'<tr >'
					+'<th class="th-text">上传者：</th>'
					+'<td>' + aipResource[i].uploadUserName + '</td>'
					+'</tr>'
					+'<tr >'
					+'<th class="th-text">作者：</th>'
					+'<td >'+ aipResource[i].author +'</td>'
					+'</tr>'
					+'</table>'
					+'</div>'
					+'</div>';
			 }
			 
			 for(var i = 0; i < site.length;i++){
				 name += '<div class="big-mydiv" data-id="'+site[i].id+'">'
					 	+'<div class="check" id="'+site[i].id+'" data-id="'+ site[i].id +'"  name="div_siteId" style="display: none;"><i class="fa fa-check"></i>	</div>'
						+'<div class="named-image-hide card-body" id="border'+ site[i].id +'" >'
						+'<div class="border-image">'
						+'<div class="col-lg-3">'
						+'<img class="img_size" src="/file/'+ site[i].coverImg +'"/>'
						+'</div>'
						+'<div class="col-lg-9" style="position: absolute;  left: 25%; top: 5px;">'	
						+'<div class="row"><h4 style="margin-top: 2px;">'+ site[i].name +'</h4>	</div>'
						+'<div class="row">'		
						+'<div style="padding-top: 3px;height: 20px;width:185px;overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">'
						+'<span class="tag tag-success" style="margin-bottom: 5px;">'
						+'描述:' 
						+'</span>'
						+'</div>'	
						+'</div>'	
						+'<div class="row" style="margin-top: 10px;height: 80px;width:100%;position: absolute;  overflow: hidden;-ms-text-overflow: ellipsis;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 4;">'
						+site[i].description
						+'</div>'
						+'</div>'
						+'</div>'	
						/*+'<div class="row skin skin-flat">'
						+'<input type="checkbox" class="skin-flat _checkBox" name="check1" id="check'+ site[i].id +'" value="'+ site[i].id +'" >'
						+'</div>'*/
						+'</div>'
						+'</div>';
			 }
			 $("#entity-show").empty();
			 $("#entity-show").append(name);
			 $("#entity-info").empty();
			 $("#entity-info").append(text);
			 $("#namedEntity").modal('show');
		 }
	 })
	 
}



function affirmResourceAjax(aipId,sitId,available){
	var asa = {aipId:aipId,sIds:sitId,available:available}
	$.ajax({
		type:"GET",
		url:"/[[${siteId}]]/checkSiteResource",
		data:asa,
		dataType:"JSON",
		success:function(data){
			var message = data.message;
			var info = '';
			if(message=="success"){
				swal('提示','确认成功！','success');
				$("#check"+id).iCheck('uncheck');
				setTimeout(function(){
					$("#close_div").attr("data-dismiss","modal");
					reloadPage();
					},1500);
				info = 'succ';
				return info;
			} else if(message!="success"){
				var site = message.split(',');
				var name = site[0];
				var id = site[1];
				swal('提示',"轻专题："+name+"已被确认",'error');
				$("#"+id).attr("style","display: none;");
				$("#border"+id).attr("class","named-image-hide");
				info = 'fail';
				return info;
			}
		}
	})
}
$("body").on("click",".big-mydiv",function(){
		var id = $(this).attr("data-id");
		if($("#"+id).attr("style") != ""){//实体类处于未选中状态，添加选中样式
			$("#"+id).attr("style","");
			$("#border"+id).attr("class","named-image");
		}else{//实体类处于选中状态，取消样式
			//删除标签
			$("#"+id).attr("style","display: none;");
			$("#border"+id).attr("class","named-image-hide");
		}
})
//确认使用资源
function affirmResource(available){
	var aipId =  $("input[name='aipId']").val();
	var div_length= $("div[name='div_siteId']").length;
	
	var obj =  $("div[name='div_siteId']");
	var sitId = '';
	var flag = '';
	swal({
		 title:"提示",
	   	  text:"未选中资源默认不使用",
	   	  type:"warning",
	   	  showConfirmButton:"true",
	   	  confirmButtonText:"知道了",
	   	  animation:"slide-from-top"
	}).then(function(){
		for(var i = 0;i<div_length;i++){
			sitId = obj[i].id;
			if(obj[i].style.display == ""){
				affirmResourceAjax(aipId,sitId,available);
			} else if(obj[i].style.display != ""){
				affirmResourceAjax(aipId,sitId,false);
			}
		}
	});
	
	
		
	
}

