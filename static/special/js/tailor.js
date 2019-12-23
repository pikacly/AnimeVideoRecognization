	//图片裁剪
	function imagetailor(){
		//让裁剪框居中
		 var _Jw = ($("#targetImg").width()) / 2 ,
	  	    _Jh = ($("#targetImg").height()) / 2 
			$("#upload_img_id").Jcrop({
			 	setSelect: [0,0, 400, 300],
		        onChange: showThumbnail,
		        onSelect: showThumbnail,
		        bgFade: true,
		        bgColor: "white",
		        aspectRatio: 4/3,
		        bgOpacity: .5,	        
			});
	}

	//图片上传按钮
	function uploadchange(event){
		var siteId = $('#siteId').val();
		var url = "/cms/"+siteId+"/file/upload/image";
		$('#metadata-form').ajaxSubmit({
			type:'post',
			url:url,
			data:$(this).serialize(),
			success:function(data){
				console.log(data.url);
				if(data.status == 1000){
					$("#targetImg img").attr('src', data.url);
					$("#thumbnailPath").val(data.url);
					imagetailor();
				}
			}
		});  
	}
	//裁剪后点击提交后图片上传
	/*$('#thumbnail-upload-modal').on('click','#thumbnail-upload-confirm',function(){
		var siteId = $('#siteId').val();
		var url = '';
		if(siteId.length != 0){
			url = '/cms/[[${siteId}]]/special/detail/[[${sid}]]/clippingImage';
			var $form = $('#metadata-form');
			var isComplete = checkFormComplete($form);
			if(!isComplete) {
				return;
			}
		}else{
			url = '/5/clippingImage';
		}
		var data = thumbnailData();
		if(!data){	
			swal('提示','请上传图片','error');
			return;
		}
		$.post(url, data).done(function(res){
			if(res.status==1000){
				if(siteId.length != 0){
					var type = $('#thumbnail-upload-confirm').attr('data-type');
					var $data = $.param({uri:res.path})+'&'+$('#metadata-form').serialize();
					uploadFileImage(siteId, $data, type, res.path);
					
				}else{
					$('#coverImg').val(res.path);
				}
				$('#coverImg').val(res.path);
				$('#local-img-upload').modal('hide');
			}else{
				sweetAlert("提示","图片处理失败","error");
			}
		})
		
	})*/
	
	/**
	 * 保存图片信息
	 * @param sietId
	 * @param $data
	 * @returns
	 */
	/*function uploadFileImage(siteId, $data, type, uri){
		var url = '/cms/'+siteId+'/lightspecial/light_special/saveGallery';
		$.post(url, $data).done(function(data){
			if(data.status == 1000){
				console.log($data);
				if(type == 'right'){
					$('#right-edit-image').siblings('img').attr('src', uri);
				}else if(type == 'section'){
					$('#section-edit-image').siblings('img').attr('src', uri);
					$('#section-form #uri').val(uri);
					$('#add-section-modal').modal('show');
				}else if(type == 'modal1'){
					imageBackground(siteId,uri);
				}else if(type == 'modal1-image'){
					var left = $('#thumbnail-upload-confirm').attr('data-left');
					var top = $('#thumbnail-upload-confirm').attr('data-top');
					var title = $('#aiptitle').val();
					imageList(siteId, uri, left, top, title);
					
				}else if(type == 'modal2'){
					$('#time-line-edit-image').siblings('img').attr('src', uri);
					$('#time-line-uri').val(uri);
					$('#add-time-line-modal').modal('show');
				}
			}
		})
	}*/
	
	/*function imageBackground(siteId, uri){
		var url = '/cms/'+siteId+'/lightspecial/light_special/saveMapGallery';
		$.post(url, {uri:uri}).done(function(data){
			if(data.status == 1000){
				window.location.href = '/cms/'+siteId+'/lightspecial/light_special/modal1';
			}
		})
	}*/
	
	/**
	 * 保存模板一标记信息
	 * @param siteId
	 * @param uri
	 * @param left
	 * @param top
	 * @returns
	 */
	/*function imageList(siteId, uri, left, top, title){
		var url = '/cms/'+siteId+'/lightspecial/light_special/saveLightMap';
		$.post(url, {uri:uri, left:left, top:top, title:title}).done(function(data){
			if(data.status == 1000){
				window.location.href = '/cms/'+siteId+'/lightspecial/light_special/modal1';
			}
		})
	}*/
	
	
	//本地图片上传参数
	/*function thumbnailData(){
		var filePath = $('#thumbnailPath').val();
		var x = $('#x').val();
		var y = $('#y').val();
		var w = $('#w').val();
		var h = $('#h').val();
		var iw = $('.thumbnail_w img').width();
		var ih = $('.thumbnail_w img').height();
		if(filePath == ''){
			return false;
		}
		var data ={filePath:filePath, x:x, y:y, w:w, h:h, iw:iw, ih:ih};
		return data;	
	}*/

	//查验表单是否为空
	function checkFormComplete($form) {
			var flag = true;
			$('[required]', $form).each(function(){
				var value = $(this).val();
				if(value=='') {
					flag = false;
					$(this).css('border', '2px solid #D05454');
				} else {
					$(this).css('border', '1px solid #e5e6e7');
				}
			});
			return flag;
		}
	
	
	//选择图片之后显示在剪切板上
	function selectCoverPicture(){
		$("#img_list").find(".big-div").each(function(index,value){
			if($(value).find(".check").css("display")=="block"){
				var title = $(value).find(".check").find("#checkaip-title").val();
				var subject = $(value).find(".check").find("#checkaip-subject").val();
				var description= $(value).find(".check").find("#checkaip-description").val();
				var keyword = $(value).find(".check").find("#checkaip-keyword").val();
				var date = $(value).find(".check").find("#checkaip-date").val();
				var point = $(value).find(".check").find("#checkaip-address").val();
				var imgsrc = $(value).find(".check").find("#checkaip-fileId").val();
				var tags =  keyword.split(" ");
				$('#tags-input').tagging("add", tags);
				$("#aipsubject").val(subject);
				$("#aipdescription").val(description);
				$("#aipdate").val(date);
				$("#upload_img_id").attr("src","/search/findByImage/"+imgsrc);
				$("#aiptitle").val(title);
				$("#aippoint").val(point);
				$("#modal-choose-image").modal("hide");
				$("#local-img-upload").modal("show");
				$("#thumbnailPath").val(imgsrc);
				$("#aipdata").val(date);
				$("#thumbnail-upload-button").css("display","none");
				
				$("#coverImg").val(imgsrc);
				imagetailor();
				
				$(".hi").each(function (index,value){
					var name = $(value).find("input").attr("name");
					
					 if(name != "point"){
						$(value).find("input").attr("readonly","readonly");
						$(value).find("textarea").attr("readonly","readonly");
					} 
				})
			}
		})
	}

	//裁剪方法
	function pre_img(obj, rx, iw, ry, ih, cx, cy, ow, oh){
	    obj.css({
	        width: Math.round(rx * iw) + 'px',
	        height: Math.round(ry * ih) + 'px'
	    });
	    if( cy >= oh && cx >= ow){
	        obj.css({
	            marginLeft: '-' + Math.round(rx * (cx - ow)) + 'px',
	            marginTop: '-' + Math.round(ry * (cy - oh)) + 'px'
	        });
	    }else if( cy <= oh && cx >= ow){
	        obj.css({
	            marginLeft: "-" + Math.round(rx * (cx - ow)) + 'px',
	            marginTop: Math.round(ry * (oh - cy)) + 'px'
	        });
	    }else if( cy >= oh && cx <= ow){
	        obj.css({
	            marginLeft: Math.round(rx * (ow - cx)) + 'px',
	            marginTop: '-' + Math.round(ry * (cy - oh)) + 'px'
	        });
	    }else if( cy <= oh && cx <= ow){
	        obj.css({
	            marginLeft: Math.round(rx * (ow - cx)) + 'px',
	            marginTop: Math.round(ry * (oh - cy)) + 'px'

	        });
	    }

	}
	
	function showThumbnail(c){
		var iw = $('.thumbnail_w>img').width(),
			ih = $('.thumbnail_w>img').height(),
	        ow = (690 - iw) / 2,
	        oh = (370 - ih) / 2,
			rx = 690 / c.w,
			ry = 370 / c.h;

		pre_img($('.pre-1 img'), rx, iw, ry, ih, c.x, c.y, ow, oh);
		$('#x').val(c.x);
		$('#y').val(c.y);
		$('#w').val(c.w);
		$('#h').val(c.h);
	}
	
	//资源确认页面点击取消之后清空值
	$("#close-upload-confirm").click(function(){
		$('[required]', '#metadata-form').each(function(){
			$(this).val('');
		});
		/*$("#upload_img_id").attr("src","/app-assets/images/slider/slider-5.png")*/
		$("#tags-info .tag").remove();
		$("#targetImg").empty();
		$("#targetImg").append('<img src="/app-assets/images/slider/slider-5.png" width="690" height="370" id="upload_img_id" class="img1"/>');
	})
