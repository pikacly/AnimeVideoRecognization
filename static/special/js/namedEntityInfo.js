function nameInfo(siteId,id){
	var url = '/oais/'+ siteId +'/entity/data/info/'+id;
	$.get(url).done(function(data){
		var entity = data.namedEntity;
		var aipResources = data.aipResources;
		entity.desp = entity.desp == undefined ? '无': entity.desp;
		
		var entityhtml = '<div class="media border-0">'
					+		'<div class="media-left text-bold-700">名称</div>'
					+		'<div class="media-body">'+entity.name+'</div>'
					+	'</div>'
					+	'<div class="media border-0">'
					+		'<div class="media-left text-bold-700">义项名</div>'
					+		'<div class="media-body">'+ entity.desp +'</div>'
					+	'</div>';
		switch(entity.type){
			case "PERSON":
				entityhtml += '<div class="media border-0">'
					+		'<div class="media-left text-bold-700">简介</div>'
					+		'<div class="media-body">'+entity.summary+'</div>'
					+	'</div>'
					+	'<div class="media border-0">'
					+		'<div class="media-left text-bold-700">称号</div>'
					+		'<div class="media-body">'+entity.alias+'</div>'
					+	'</div>'
					+	'<div class="media border-0">'
					+		'<div class="media-left text-bold-700">国籍</div>'
					+		'<div class="media-body">'+entity.nationality+'</div>'
					+	'</div>'
					+	'<div class="media border-0">'
					+		'<div class="media-left text-bold-700">出生时间</div>'
					+		'<div class="media-body">'+entity.birthDate+'</div>'
					+	'</div>'
					+	'<div class="media border-0">'
					+		'<div class="media-left text-bold-700">去世时间</div>'
					+		'<div class="media-body">'+entity.deathDate+'</div>'
					+	'</div>'
					+	'<div class="media border-0">'
					+		'<div class="media-left text-bold-700">职业</div>'
					+		'<div class="media-body">'+entity.occupation+'</div>'
					+	'</div>'
					+	'<div class="media border-0">'
					+		'<div class="media-left text-bold-700">出生地</div>'
					+		'<div class="media-body">'+entity.birthPlace+'</div>'
					+	'</div>'
					+	'<div class="media border-0">'
					+		'<div class="media-left text-bold-700">主要成就</div>'
					+		'<div class="media-body">'+entity.achievements+'</div>'
					+	'</div>'
					+	'<div class="media border-0">'
					+		'<div class="media-left text-bold-700">主要作品</div>'
					+		'<div class="media-body">'+entity.majorWorks+'</div>'
					+	'</div>';
						
				break;
			case "ORG":
				entityhtml += '<div class="media border-0">'
					+		'<div class="media-left text-bold-700">简称</div>'
					+		'<div class="media-body">'+entity.briefName+'</div>'
					+	'</div>'
					+	'<div class="media border-0">'
					+		'<div class="media-left text-bold-700">创办时间</div>'
					+		'<div class="media-body">'+entity.foundDate+'</div>'
					+	'</div>'
					+	'<div class="media border-0">'
					+		'<div class="media-left text-bold-700">所属地区</div>'
					+		'<div class="media-body">'+entity.district+'</div>'
					+	'</div>'
					+	'<div class="media border-0">'
					+		'<div class="media-left text-bold-700">机构类型</div>'
					+		'<div class="media-body">'+entity.orgType+'</div>'
					+	'</div>'
					+	'<div class="media border-0">'
					+		'<div class="media-left text-bold-700">简介</div>'
					+		'<div class="media-body">'+entity.summary+'</div>'
					+	'</div>';
				break;
			case "EVENT":
				entityhtml += '<div class="media border-0">'
					+		'<div class="media-left text-bold-700">时间</div>'
					+		'<div class="media-body">'+entity.birthDate+'--'+entity.deathDate+'</div>'
					+	'</div>'
					+	'<div class="media border-0">'
					+		'<div class="media-left text-bold-700">地点</div>'
					+		'<div class="media-body">'+entity.address+'</div>'
					+	'</div>'
					+	'<div class="media border-0">'
					+		'<div class="media-left text-bold-700">描述</div>'
					+		'<div class="media-body">'+entity.summary+'</div>'
					+	'</div>';
				break;
		}
		$("#entity-info").html(entityhtml);
		
		//自定义属性
		var attributes = entity.attributes;
		var attrStr = "";
		for (var key in attributes) {
			attrStr += '<div class="media border-0">'
					+		'<div class="media-left text-bold-700">'+key+'</div>'
					+		'<div class="media-body">'+attributes[key]+'</div>'
					+	'</div>';
		}
		$("#entity-attributes").append(attrStr);
		
		//已连接资源
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
			urlStr	+= '<a style="color:#404E67;" href="/oais/[[${siteId}]]/sip/'+aipResource.sipId+'"><div class="media border-0">'
					+		'<div class="media-left">'+type+'</div>'
					+		'<div class="media-body">'+aipResource.title+'</div>'
					+	'</div></a>';			
		}
		$("#entity-resource").html(urlStr);
		
		
		$("#named-info").show();
	})
	
}

