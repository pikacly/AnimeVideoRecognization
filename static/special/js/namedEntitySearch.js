function searchAjax(siteId, type, name, page) {
	//清除分页
	$('#pagination_box').html('');
	var url = '/cms/' + siteId + '/special/find/namedentity';
	var param = {
		type : type,
		name : name,
		page : page
	};
	$.get(url, param).done(function(data) {
		var pageNow = data.pageInfo.pageNow;
		var totalPages = data.pageInfo.totalPages;
		$('#totalResource').text(data.pageInfo.totalElements);
		writePage(siteId, data.pageInfo);
		//加载分页 
		$('#pagination_box').html('<ul class="pagination page-links justify-content-center"></ul>');
		$('#pagination_box .page-links').twbsPagination({
			totalPages : totalPages,
			visiblePages : 5,
			startPage : pageNow,
			prev : '上一页',
			next : '下一页',
			first : '首页',
			last : '尾页',
			onPageClick : function(event, page) {
				//当前页不等于下一页
				if(page != pageNow){
					searchAjax(siteId, type, name, page-1);
				}
				$('.pagination').find('li').addClass('page-item');
				$('.pagination').find('a').addClass("page-link");

			}
		});
	})
}

function writePage(siteId, data){
	var text = searchResult(siteId, data);
	$('#entity-tbody').html(text);
}
//封装一下
function searchResult(siteId, data){
	var entitys = data.namedEntitys;
	var text, summary, type, image, button;
	$.each(entitys, function(i, entity){
		summary = entity.summary == '' ? '暂无描述':entity.summary;
		if(entity.type == 'EVENT'){
			type = '会议';
		}else if(entity.type == 'PERSON'){
			type = '人物';
		}else{
			type = '组织机构';
		}
		if(entity.icon == '' || entity.icon == undefined){
			image ='<img  class="img-circle" alt="image" src="/app-assets/images/portrait/small/avatar-s-1.png">';
		}else{
			image ='<img  class="img_named" alt="image" src="/cms/' + siteId + '/file/'+ entity.icon + '"></a>';
		}
		if(entity.hasSpecial != '已创建'){
			//button = '<a href="javascript:void(0)" onclick="chooseTheme(\''+ entity.name +'\',\''+ entity.id +'\',\''+ summary +'\',\''+type+'\',\''+entity.icon+'\')" class="btn btn-sm btn-outline-success"><i class="fa fa-check-square-o"></i> 选择 </a>'
			button = '<button type="button" data-id="'+entity.id+'" data-siteId="'+ siteId +'" class="btn btn-sm btn-outline-success choose-entity"><i class="fa fa-check-square-o"></i> 选择 </button>'
		}else{
			button = '<a href="javascript:void(0)"  class="btn btn-sm btn-danger"><i class="fa fa-star-o"></i> 已有轻专题 </a>';
		}
		text += '<tr>'
			+ '<td class="project-people">'
			+ image
			+ '</td>'
			+ '<td class="project-title" width="200px">'
			+ '<a href="javascript:">'
			+ entity.name
			+ '</a> <br />'
			+ '<span class="tag tag-success">'
			+ type
			+ '</span>'
			+ '</td>'
			+ '<td class="project-completion">'
			+ '<p id="ftellipsis" class="p_shorten">'
			+ summary
			+ '</p>'
			+ '</td>'
			+ '<td class="project-actions">'
			+ '<div class="form-group">'
			+ '<a href="javascript:void(0)" data-id="'+entity.id+'" class="btn btn-sm btn-outline-success entity-show"><i class="fa fa-eye"></i> 查看 </a> <br />'
			+ '</div>'
			+ '<div class="form-group">'
			+ button
			+'</div>' + '</td>' + '</tr>';
		
	})
	return text;
}

$('#entity-tbody').on('click', '.choose-entity', function(){
	var entityId = $(this).attr('data-id');
	var siteId = $(this).attr('data-siteId');
	var url = '/oais/'+ siteId +'/entity/data/info/'+entityId;
	$.post(url).done(function(data){
		var entity = data.namedEntity;
		$("#name").val(entity.name);
		$("#neId").val(entity.id);
		$("#description").val(entity.summary);
		$("#type").val(entity.type);
		uploadFileId(siteId, entity.icon);
		
		$('#option-'+entity.type.toLowerCase()).attr("selected","selected");
		toastr.success('选择本体成功', '成功');
		$('#modal-choose-entity').modal('hide');
	})
})

/*function chooseTheme(name,id,summary,type, icon){
	$("#name").val(name);
	$("#neId").val(id);
	if(type =="人物"){
		$("#option-person").attr("selected","selected");
	} else if(type == "会议"){
		$("#option-event").attr("selected","selected");
	} else if(type == "组织机构"){
		$("#option-org").attr("selected","selected");
	}
	icon = uploadFileId(siteId,icon);
	$('#icon').val(icon);
	$("#type").val(type);
	$("#description").val(summary);
	toastr.success('选择本体成功', '成功');
	$('#modal-choose-entity').modal('hide');
}*/

function uploadFileId(siteId, icon){
	var url = '/cms/'+siteId+'/file/upload/image/'+icon;
	$.post(url).done(function(data){
		if(data.status == 1000){
			$('#icon').val(data.url);
		}
	})
}
//本体图片列表
function searchImg(siteId,page,neId){
	$('.masonry-pagination').html('');
	var url = '/cms/'+siteId+'/special/namedentity/images';
	var param = {page:page, neId:neId};
	$.get(url, param).done(function(data){
		var aipResources = data.aipResources;
		if(aipResources != null && aipResources.length > 0){
			var imageHtml = '';
			$.each(aipResources, function(i, aip){
				imageHtml += '<figure class="col-lg-3 col-md-6 col-12 text-center">'
					+		'<img class="img-thumbnail img-fluid height-150 width-150 choose-resource-image" src="/oais/'+siteId+'/file/' + aip.fileId + '">'
					+	'</figure>'
			})
			$('.masonry-grid').html(imageHtml);
			
			$('.masonry-pagination').html('<ul class="pagination page-links justify-content-center"></ul>');
			$('.masonry-pagination .page-links').twbsPagination({
				totalPages : data.totalPages,
				visiblePages : 5,
				startPage : data.pageNumber,
				prev : '上一页',
				next : '下一页',
				first : '首页',
				last : '尾页',
				onPageClick : function(event, page) {
					//当前页不等于下一页
					if(page != data.pageNumber){
						searchImg(siteId, page ,neId)
					}
					$('.pagination').find('li').addClass('page-item');
					$('.pagination').find('a').addClass("page-link");

				}
			});
			$('#modal-choose-image').modal('show');
		}else{
			toastr.success('该本体暂未图片资源','提示');
		}
	})
}

$('#modal-choose-image').on('click', '.choose-resource-image', function(){
	var src = $(this).attr('src');
	var image = '<img src="'+ src +'" class="main-demo-image"/>';
	thumbnailImage(image);
	$('#modal-choose-image').modal('hide');
})





