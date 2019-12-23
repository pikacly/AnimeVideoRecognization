/**
 * 
 * @authors GuardianV (tang_dq35@163.com)
 * @date    2018-04-17 14:46:14
 * @version $Id$
 */

function submit_file(url, check_placeholder_list, transform){
	var has_empty = false;
	$('#metadata-form').find('input').each(function(){
		if ($.inArray($(this).attr("id"),check_placeholder_list) != -1 ) {
			console.log($(this));
			if ($(this).val() == ''| $(this).val() == null) {
				toastr.error('提交失败！', $(this).attr('placeholder')+"为空！");
				has_empty = true;
				return false;
			}
		}
	});
//	if ($('textarea[name="description"]').val()=='' && !has_empty) {
//		toastr.error('提交失败！', "描述/摘要为空！");
//		has_empty = true;
//	}
	if ($('.select2-selection__rendered').children('li').text() == '' && !has_empty) {
		toastr.error('提交失败！', "请添加资源标签！");
		has_empty = true;
	}
	if($("#span_nameView0").text() == '请选择分类' && !has_empty){
		toastr.error('提交失败！', "请选择资源分类！");
		has_empty = true;
	}
	if($("#half-star") != null && !has_empty){
		if($("#half-star").children('input').val() == ''){
//			toastr.error('提交失败！', "请对照片进行评分！");
//			has_empty = true;
			$('input[name=score]').val("0")
		}
	}
	//关联本体
	var entityIds = [];
	$("#entity-table").find("tr").each(function(i,e){
		entityIds.push($(e).attr("data-id"));
	})
	if (!has_empty) {
		if(transform != undefined){
			swal({title:'资源转码与解析操作进行中'});
		}else{
			swal({title:'提交中'});
		}
		swal.showLoading();
		$.post(
			url,
			$.param({'classification':$("#hid_category0").val(),"entityIds":entityIds}) + '&' + $('#metadata-form').serialize(),
			function(data){
				if(data.status==1000){
					swal.close();
					if(transform != undefined){
						var locateUrl = '/oais/'+siteId+'/catalog/add/' + data.id + '/1';
						var text = "转码成功，点击确认继续操作";
					}else{
						var locateUrl = document.referrer;
						var text = "已成功添加资源";
					}
					swal(
					{
						title: "Success",   
						text: text,
						type: "success",   
						confirmButtonText: "  OK  ",
					}).then(function(){
						window.location.href = locateUrl;
					});
				}else{
					swal.close();
					toastr.error('提交失败！', data.error);
				}
			}
		);
	};
};