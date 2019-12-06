$.fn.pageBar = function(options) {  
    var configs = {  
        PageIndex: 1,  
        PageSize: 15,  
        TotalPage: 0,  
        RecordCount: 0,  
        showPageCount: 4,  
        onPageClick: function(pageIndex) {  
            return false;   //默认的翻页事件  
        }  
    }  
    $.extend(configs, options);  
    var tmp = "", 
    i = 0,  
    j = 0,  
    a = 0,  
    b = 0,  
    totalpage = parseInt(configs.RecordCount / configs.PageSize);  
    totalpage = configs.RecordCount % configs.PageSize > 0 ? totalpage + 1 : totalpage;  
    tmp += "<li><a>首页</a></li>";
    if (configs.PageIndex > 1) {  
    	//当前页面不是第一页
        tmp += "<li><a  aria-label=\"Previous\"><span aria-hidden=\"true\">&laquo;</span></a></li>" ;
    } else {  
    	//当前页面是第一页，禁用前一页按钮
        tmp += "<li class=\"disabled\"><a aria-label=\"Previous\"><span aria-hidden=\"true\">&laquo;</span></a></li>"  
    }  
    tmp += "<li><a>1</a></li>";  
    if (totalpage > configs.showPageCount + 1) {  
    	//总页数大于初始显示页数
        if (configs.PageIndex <= configs.showPageCount) {  
        	//指针页数在1的初始显示页数之中
            i = 2;  
            j = i + configs.showPageCount;  
            a = 1;  
        } else if (configs.PageIndex > totalpage - configs.showPageCount) {  
        	//指针页数不在1的初始显示页数之中，且后无需要省略的页数
            i = totalpage - configs.showPageCount;  
            j = totalpage;  
            b = 1;  
        } else {  
        	//指针页数不在1的初始显示页数之中，且后面有需要省略的页数
            var k = parseInt((configs.showPageCount - 1) / 2);  
            i = configs.PageIndex - k;  
            j = configs.PageIndex + k + 1;  
            a = 1;  
            b = 1;  
            if ((configs.showPageCount - 1) % 2) {  
                i -= 1  
            }  
        }  
    }  
    else {  
    	//总页数小于初始显示页数
        i = 2;  
        j = totalpage;  
    }  
    if (b) {  //当前页面不再1的初始显示页面之中
        tmp += "<li class=\"disabled\"><a aria-label=\"Previous\"><span aria-hidden=\"true\">…</span></a></li>"  
    }  
    for (; i < j; i++) {  //增加页面的按钮
        tmp += "<li><a>" + i + "</a></li>"  
    }  
    if (a) {  
        tmp += " <li class=\"disabled\"><a aria-label=\"Previous\"><span aria-hidden=\"true\">…</span></a></li> "  
    }  
    if (totalpage > 1) {  
        tmp += "<li><a>" + totalpage + "</a></li>"  
    }  
    if (configs.PageIndex < totalpage) {  
        tmp += "<li><a  aria-label=\"Next\"><span aria-hidden=\"true\">&raquo;</span></a></li>";
    } else {  
        tmp += "<li class = \"disabled\"><a  aria-label=\"Next\"><span aria-hidden=\"true\">&raquo;</span></a></li>"  
    }  
    tmp += "<li><a>尾页</a></li>";
    var pager = this.html(tmp); 
    pager.children('li').click(function() {  
        var cls = $(this).attr('class');  
        if (this.innerHTML == '<a aria-label="Previous"><span aria-hidden="true">«</span></a>') {  
        	 if (cls != 'disabled') {  
                 configs.onPageClick(configs.PageIndex-1)  
             }   
        } else if (this.innerHTML == '<a aria-label="Next"><span aria-hidden="true">»</span></a>') {  
            if (cls != 'disabled') {  
                configs.onPageClick(configs.PageIndex+1)  
            }  
        } else if(this.innerHTML == "<a>首页</a>"){
        	configs.onPageClick(1); 
        }else if(this.innerHTML == "<a>尾页</a>"){
        	configs.onPageClick(configs.TotalPage);
        }else {  
        	console.log(this.innerHTML);
            if (cls != 'active') {  
                configs.onPageClick(parseInt(this.innerHTML.replace(/[^0-9]+/g, '')));  
            }  
        }  
    }).each(function() {  
        if (configs.PageIndex == parseInt(this.innerHTML.replace(/[^0-9]+/g, ''))) {  
            $(this).attr("class","active");
        }
    })  
}   