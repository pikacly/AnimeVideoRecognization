document.write('<script src="/app-assets/vendors/js/forms/icheck/icheck.min.js" type="text/javascript"></script>>');
document.write('<link rel="stylesheet" type="text/css" href="/app-assets/vendors/css/forms/icheck/icheck.css">');
document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"/cardListTable/cardListTable.css\">");




function CardListTable(option){
    this.statusMap = {
        "default": 'badge badge-warning',
        "待审核": "badge bg-blue-grey",
        "待录入": 'badge badge-secondary',
        "待交接": 'badge badge-info',
        "通过交接": 'badge badge-success',
        "拒绝交接": 'badge badge-danger',
    };
    var statusMap = this.statusMap;

    this.resourceTypeMap = {
        'doc': "<span class=\"text-label\">文本</span>",
        'image': "<span class=\"img-label\">图片</span>",
        'audio': "<span class=\"audio-label\">音频</span>",
        'video': "<span class=\"video-label\">视频</span>"
    };
    var resourceTypeMap = this.resourceTypeMap;

    this.optionExample = "/*{\n"+
        "    'position': \"#myTable\", // 插入位置的ID\n"+
        "    'title': \"功能模块标题\", // 大标题\n"+
        "\n"+
        "    // 'canBatchActive': true, // 是否开启批量启用 默认开启\n"+
        "    // 'canBatchForbid': true, // 是否开启批量禁用 默认开启\n"+
        "    // 'canBatchDelete': true, // 是否开启批量删除 默认开启\n"+
        "\n"+
        "    'canSelect': false, // 是否开启筛选 默认不开启\n"+
        "    'selectors': [\n"+
        "        {\n"+
        "            \"待审核\": \"123\",\n"+
        "            \"已审核\": \"456\"\n"+
        "        },\n"+
        "        {\n"+
        "            \"文本\": \"123\",\n"+
        "            \"图片\": \"456\"\n"+
        "        }\n"+
        "    ], // 筛选器 每一个列表为一组筛选条件 key为筛选元素值 value为筛选元素ID以方便绑定事件\n"+
        "\n"+
        "    'canSearch': true, // 是否开启搜索 默认不开启\n"+
        "\n"+
        "    // 'viewImage': true, // 缩略图视图 默认开启\n"+
        "    // 'viewList': true, // 列表视图 默认开启\n"+
        "    // 'viewTable': true, // 表格视图 默认开启\n"+
        "\n"+
        "    /!* 排序的参数 *!/\n"+
        "    'orderList': {\n"+
        "        \"按时间排序\": \"order-by-time\"\n"+
        "    },\n"+
        "\n"+
        "    /!* 缩略图的参数 *!/\n"+
        "    'thumbnailArgs': {\n"+
        "        'showTag': false, // 是否显示右上角的Tag 根据文件后缀判断Tag标签\n"+
        "        'colsNum': 4, // 默认为4 可选值 2 3 4 6\n"+
        "        // 'canCheck': true, // 默认开启\n"+
        "        // 'canEdit': false, // 默认开启\n"+
        "        // 'canDelete': true // 默认开启\n"+
        "    },\n"+
        "\n"+
        "    /!* 列表参数 *!/\n"+
        "    'listArgs': {\n"+
        "        'hasTypeIcon': true,\n"+
        "        'hasDescription': true,\n"+
        "        'descriptionVals': ['title', 'date', 'description', 'size'],\n"+
        "        'hasClassification': true,\n"+
        "        'hasStatus': true,\n"+
        "        'hasUploader': true,\n"+
        "        // 'canCheck': true, // 默认开启\n"+
        "        // 'canEdit': true, // 默认开启\n"+
        "        // 'canDelete': true, // 默认开启\n"+
        "    },\n"+
        "\n"+
        "    /!* 表格参数 *!/\n"+
        "    'tableArgs': {\n"+
        "        'cols': [\n"+
        "            {\"name\": \"序号\", \"width\": \"5%\", \"field\": \"\"},\n"+
        "            {\"name\": \"标题\", \"width\": \"10%\", \"field\": \"title\"},\n"+
        "            {\"name\": \"作者\", \"width\": \"10%\", \"field\": \"author\"},\n"+
        "            {\"name\": \"描述\", \"width\": \"40%\", \"field\": \"description\"},\n"+
        "            {\"name\": \"状态\", \"width\": \"10%\", \"field\": \"status\"},\n"+
        "            {\"name\": \"操作\", \"width\": \"15%\", \"field\": \"\"},\n"+
        "        ],\n"+
        "        // 'canCheck': true, // 默认开启\n"+
        "        // 'canEdit': true, // 默认开启\n"+
        "        // 'canDelete': true, // 默认开启\n"+
        "    },\n"+
        "\n"+
        "    /!* 数据参数 *!/\n"+
        "    'data': [\n"+
        "        {\n"+
        "            \"title\": \"titletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitle\",\n"+
        "            \"author\": \"authorauthorauthorauthorauthorauthor\",\n"+
        "            \"description\": \"descriptiondescriptiondescriptiondescriptiondescriptiondescription\",\n"+
        "            \"status\": \"待审核\",\n"+
        "            \"resourceType\": \"doc\",\n"+
        "            \"imgSrc\": \"http://image.liulichao.com/2017-11-04/5247cd5-160909.jpg\",\n"+
        "            \"date\": \"2019-07-11\",\n"+
        "            \"size\": \"17kb\",\n"+
        "            \"classification\": \"通知公告\",\n"+
        "            \"uploaderIcon\": \"http://image.liulichao.com/2017-11-04/5247cd5-160909.jpg\",\n"+
        "            \"id\": \"123\"\n"+
        "        },\n"+
        "        {\n"+
        "            \"title\": \"titletitletitletitletitletitletitletitle\",\n"+
        "            \"author\": \"authorauthorauthorauthorauthorauthor\",\n"+
        "            \"description\": \"descriptiondescriptiondescriptiondescriptiondescriptiondescription\",\n"+
        "            \"status\": \"待审核\",\n"+
        "            \"resourceType\": \"doc\",\n"+
        "            \"imgSrc\": \"http://image.liulichao.com/2017-11-04/5247cd5-160909.jpg\",\n"+
        "            \"date\": \"2019-07-11\",\n"+
        "            \"size\": \"17kb\",\n"+
        "            \"classification\": \"通知公告\",\n"+
        "            \"uploaderIcon\": \"http://image.liulichao.com/2017-11-04/5247cd5-160909.jpg\",\n"+
        "            \"id\": \"123\"\n"+
        "        }\n"+
        "    ],\n"+
        "    'fieldNames': {\n"+
        "        'resourceType': \"resourceType\", // 资源类型 文件后缀\n"+
        "        'imgSrcType': \"direct\",// direct表示存的是url indirect表示存的是id\n"+
        "        'imgSrc': \"imgSrc\",\n"+
        "        'title': \"title\",\n"+
        "        'date': \"date\", // 著录时间\n"+
        "        'description': \"description\", // 资源描述\n"+
        "        'size': \"size\", // 资源大小\n"+
        "        'classification': \"classification\", // 通知公告？？\n"+
        "        'status': \"status\", // 状态 已交接 未交接\n"+
        "        'uploaderIcon': \"uploaderIcon\", // 上传者头像\n"+
        "        'author': \"author\", // 原作者\n"+
        "        'id': \"id\", // 唯一标识该资源的ID\n"+
        "    }, // 数据字段名\n"+
        "\n"+
        "    'canDrag': false // 是否开启拖拽\n"+
        "    'timeFilter': false // 是否开启时间筛选\n"+
        "    'userFilter': false // 是否开启用户筛选\n"+
        "};*/\n";

    this.option = option;
    var $option = this.option;

    /* 构造视图对象方法 */
    function isDefined(o, $default) {
        return typeof o == "undefined" ? $default : o;
    }

    function card(data, args, index) {
        // alert(args['colsNum']);
        var colNum = args['colsNum'] || 4;
        var colClass = "col-xl-" + 12/colNum;
        var hasTag = isDefined(args['showTag'], true);
        var e = $(data);

        var result = [];
        result.push("<div class=" + colClass + " data-id=" + e.attr($option.fieldNames['id']) +" data-order="+ index +">");
        result.push("<div class=\"card\">");

        var temp = e.attr($option.fieldNames['resourceType']);
        if (temp == "image") {
            var imgSrcType = $option.fieldNames['imgSrcType'];
            if (imgSrcType == "direct")
                result.push("<img src=\""+ e.attr($option.fieldNames['imgSrc']) +"\">");
            else if (imgSrcType == "indirect")
                result.push("<img src=\"/oais/"+ $option.siteId + "/file/" + e.attr($option.fieldNames['imgSrc']) + "\">");
        } else if (temp == "doc"){
            result.push("<img src='/app-assets/images/file_thumbnail/doc.png'>");
        } else if (temp == "audio") {
            result.push("<img src='/app-assets/images/file_thumbnail/mp3.png'>");
        } else if (temp == "video") {
            result.push("<img src='/app-assets/images/file_thumbnail/mp4.png'>");
        }

        if (hasTag)
            result.push(resourceTypeMap[e.attr($option.fieldNames['resourceType'])]);
        result.push("<div class=\"check\"><input type=\"checkbox\" ></div>");
        result.push("<title>" + e.attr($option.fieldNames['title']) + "</title>");
        result.push("</div>");

        if (isDefined(args['canCheck'], true)
            || isDefined(args['canEdit'], true)
            || isDefined(args['canDelete'], true)) {
            result.push("<div data-id="+ e.attr($option.fieldNames['id']) + ">");
            if (isDefined(args['canCheck'], true))
                result.push("<a name=\"view\"><i class='ft-eye'></i>查看</a>");
            if (isDefined(args['canEdit'], true) && e.attr($option.fieldNames['status']) != "通过交接")
                result.push("<a name=\"edit\"><i class='ft-edit'></i>编辑</a>");
            if (isDefined(args['canDelete'], true) && e.attr($option.fieldNames['status']) != "通过交接")
                result.push("<a name=\"delete\"><i class='fa fa-times-circle-o'></i>删除</a>");
            result.push("</div>");
        }
        result.push("</div>");

        return result.join("");
    }

    function list(data, args, index) {
        function convert(tag, data) {
            var e = $(data);
            if (tag == "title") {
                return "<h4>" + e.attr($option.fieldNames['title']) + "</h4>";
            } else if (tag == "date") {
                return "<span>著录时间：" + e.attr($option.fieldNames['date']) + "</span>";
            } else if (tag == "description") {
                return "<span class='list-resource-description-span'>资源描述：" + e.attr($option.fieldNames['description']) + "</span>";
            } else if (tag == "size") {
                return "<span>资源大小：" + e.attr($option.fieldNames['size']) + "</span>";
            }
        }

        var e = $(data);
        var result = [];

        result.push("<tr class=\"list-resource\" data-id="+ e.attr($option.fieldNames['id']) + " data-order=" + index + ">");
        result.push("<td class=\"check\"><input type=\"checkbox\" ></td>");
        if (args['hasTypeIcon'])
            result.push("<td class=\"list-resource-type-icon\">" +
                "<img src=\"/app-assets/images/file_thumbnail/"+ e.attr($option.fieldNames['fileSuffix']) + ".png\">" +
                "</td>");
        if (args['descriptionVals']) {
            result.push("<td class=\"list-resource-description\">");
            for (var i in args['descriptionVals']) {
                var tag = args['descriptionVals'][i];
                result.push(convert(tag, data));
            }
            result.push("</td>");
        }
        if (args['hasClassification']) {
            result.push("<td class=\"list-resource-type\">" +
                "<div class=\"badge badge-success\">" + e.attr($option.fieldNames['classification']) + "</div>" +
                "</td>");
        }
        if (args['hasStatus']) {
            var status = e.attr($option.fieldNames['status']);
            var statusClass = statusMap[status] || statusMap['default'];
            result.push("<td class=\"list-resource-status\">" +
                "<div class=\"" + statusClass + "\">" + status + "</div>" +
                "</td>");
        }
        if (args['hasUploader']) {
            result.push("<td class=\"list-resource-uploader\">");
            var icon = e.attr($option.fieldNames['uploaderIcon']);
            if (icon != null)
                result.push("<img src=\"" + icon + "\" title=\"" + e.attr("uploadUserName") + "\">");
        }
        if (isDefined(args['canCheck'], true)
            || isDefined(args['canEdit'], true)
            || isDefined(args['canDelete'], true)) {
            result.push("<td class=\"list-resource-edit\" data-id=" + e.attr($option.fieldNames['id']) +">");
            if (isDefined(args['canCheck'], true))
                result.push("<a name=\"view\"><i class='ft-eye'></i>查看</a>");
            if (isDefined(args['canEdit'], true) && e.attr($option.fieldNames['status']) != "通过交接")
                result.push("<a name=\"edit\"><i class='ft-edit'></i>编辑</a>");
            if (isDefined(args['canDelete'], true) && e.attr($option.fieldNames['status']) != "通过交接")
                result.push("<a name=\"delete\"><i class='fa fa-times-circle-o'></i>删除</a>");
            result.push("</td>")
        }
        result.push("</tr>");

        return result.join("");
    }

    function table(data, args, index, isHeader) {
        function convert0(tag, content, width) {
            if (tag == "序号") {
                return "<td class=\"table-resource-order\" style=\"width:" + width + "\"" + "><h4>"  + content + "</h4></td>";
            } else if (tag == "标题") {
                return "<td class=\"table-resource-title\" style=\"width:" + width + "\"" + "><h4>"  + content + "</h4></td>";
            } else if (tag == "作者") {
                return "<td class=\"table-resource-author\" style=\"width:" + width + "\"" + "><h4>"  + content + "</h4></td>";
            } else if (tag == "描述") {
                return "<td class=\"table-resource-description\" style=\"width:" + width + "\"" + "><h4>"  + content + "</h4></td>";
            } else if (tag == "状态") {
                return "<td class=\"table-resource-status\" style=\"width:" + width + "\"" + "><h4>"  + content + "</h4></td>";
            } else if (tag == "操作") {
                return "<td class=\"table-resource-edit\" style=\"width:" + width + "\"" + "><h4>"  + content + "</h4></td>";
            }
        }

        function convert(tag, content, width, id) {
            if (tag == "序号") {
                return "<td class=\"table-resource-order\" style=\"width:" + width + "\"" + ">"  + index + "</td>";
            } else if (tag == "标题") {
                return "<td class=\"table-resource-title\" style=\"width:" + width + "\"" + "><span>"  + content + "</span></td>";
            } else if (tag == "作者") {
                return "<td class=\"table-resource-author\" style=\"width:" + width + "\"" + "><span>"  + content + "</span></td>";
            } else if (tag == "描述") {
                return "<td class=\"table-resource-description\" style=\"width:" + width + "\"" + "><span>"  + content + "</span></td>";
            } else if (tag == "状态") {
                var statusClass = statusMap[content] || statusMap['default'];
                return "<td class=\"table-resource-status\" style=\"width:" + width + "\"" + "><div class=\"" + statusClass +"\">" + content + "</div></td>";
            } else if (tag == "操作") {
                var temp = "<td class=\"table-resource-edit\" data-id="+ id + ">";
                if (isDefined(args['canCheck'], true))
                    temp += "<a name=\"view\"><i class='ft-eye'></i>查看</a>";
                if (isDefined(args['canEdit'], true) && e.attr($option.fieldNames['status']) != "通过交接")
                    temp += "<a name=\"edit\"><i class='ft-edit'></i>编辑</a>";
                if (isDefined(args['canDelete'], true) && e.attr($option.fieldNames['status']) != "通过交接")
                    temp += "<a name=\"delete\"><i class='fa fa-times-circle-o'></i>删除</a>"
                temp += "</td>";
                return temp;
            }
        }

        var e = $(data);
        var result = [];

        if(isHeader) {
            result.push("<tr class=\"table-resource\">");
            result.push("<td class=\"check\"></td>");
        }
        else {
            result.push("<tr class=\"table-resource\" data-id="+ e.attr($option.fieldNames['id']) + " data-order=" + index + ">");
            result.push("<td class=\"check\">" +
                "<input type=\"checkbox\" >" +
                "</td>");
        }

        for (var i in args["cols"]) {
            var col = args["cols"][i];
            var name = col['name'],
                width = col['width'],
                field = col['field'];

            if (isHeader) {
                result.push(convert0(name, name, width));
            } else {
                result.push(convert(name, e.attr(field), width, e.attr($option.fieldNames['id'])));
            }
        }

        result.push("</tr>");
        return result.join("");
    }

    function resize() {
        /* 窗口大小改变时调整img的最大宽度和高度 */
        if (isDefined($option.viewImage, true)) {
            if ($("#card-area > div > .card")[0] && $("#card-area > div > .card")[0].offsetWidth && $("#card-area > div > .card")[0].offsetHeight) {
                $("#card-area > div > div > img").css("max-width", $("#card-area > div > .card")[0].offsetWidth).css("max-height", $("#card-area > div > .card")[0].offsetHeight);
                clearInterval(this.$t);
            }
            window.onresize = function () {
                if ($("#card-area > div > .card")[0] && $("#card-area > div > .card")[0].offsetWidth && $("#card-area > div > .card")[0].offsetHeight) {
                    $("#card-area > div > div > img").css("max-width", $("#card-area > div > .card")[0].offsetWidth).css("max-height", $("#card-area > div > .card")[0].offsetHeight);
                    clearInterval(this.$t);
                }
            }
        }
    };

    function afterInit() {
        /* 绑定切换视图点击函数 */
        $("#card-view").click(function () {
            $("#card-area").show();
            $("#list-area").hide();
            $("#table-area").hide();
        });
        $("#list-view").click(function() {
            $("#card-area").hide();
            $("#list-area").show();
            $("#table-area").hide();
        });
        $("#table-view").click(function() {
            $("#card-area").hide();
            $("#list-area").hide();
            $("#table-area").show();
        });

        /* 注册批量操作绑定函数 */
        if (isDefined($option.canBatchDelete, true) ||
            isDefined($option.canBatchForbid, true) ||
            isDefined($option.canBatchActive, true)) {
            ["#btn-batch-active", "#btn-batch-forbid", "#btn-batch-delete"].forEach(function (item, index, arr) {
                $(item).click(function () {
                    $("#table-header").hide();
                    $("#batch-area").show();
                    $("#batch-area").attr("from", $(this).attr("id"));
                    $(".check").each(function () {
                        $(this).show();
                    });
                });
            });
        }

        /* 绑定选择框 */
        $(".check input").iCheck({
            checkboxClass : 'icheckbox_square-blue'
        });

        /* 绑定全选按钮 */
        $("#all-select").click(function () {
            if ($(this).html() == "全选") {
                $(this).html("取消全选");
                $(".check input").iCheck('check');
            } else {
                $(this).html("全选");
                $(".check input").iCheck('uncheck');
            }
        });

        /* 绑定取消按钮 */
        $("#cancel").click(function () {
            $("#table-header").show();
            $("#batch-area").hide();
            $("#batch-area").attr("from", 'none');
            $(".check").each(function () {
                $(this).hide();
            });
            $(".check input").iCheck('uncheck');
            $("#all-select").html("全选");
        });

        /* list-resource交互 */
        /* list-resource交互 */
        /* table-resource交互 */
        $("body").on("mouseover", "#card-area > div", function () {
            $(this).children()[1].style.visibility = "visible";
        }).on("mouseout", "#card-area > div", function () {
            $(this).children()[1].style.visibility = "hidden";
        });
        
        $("body").on("mouseover", "#list-area > table > tbody > .list-resource", function () {
            $(this).css("background", "#b8b8b81a");
            $(this).find(".list-resource-edit a").show().css("display", "block");
        });

        $("body").on("mouseout", "#list-area > table > tbody > .list-resource", function () {
            $(this).css("background", "");
            $(this).find(".list-resource-edit a").hide();
        });

        $("body").on("mouseover", "#table-area > table > tbody > .table-resource", function () {
            $(this).css("background", "#b8b8b81a");
        });

        $("body").on("mouseout", "#table-area > table > tbody > .table-resource", function () {
            $(this).css("background", "");
        });

        /* 点击交互 */
        function clickCheck() {
            if ($("#batch-area").css("display") != "none") {
                var temp = $($(this).find("input")[0]);
                if (temp.parent().hasClass("checked"))
                    temp.iCheck("uncheck");
                else
                    temp.iCheck("check");
            }
        }

        $("body").on("mouseover", "#card-area > div > .card", function() {
            $(this).css("background", "#d9d9d9e6");
        }).on("mouseout", "#card-area > div > .card", function() {
            $(this).css("background", "#ececece6");
        }).on("click", "#card-area > div > .card", clickCheck);

        $("#list-area").on("click", ".list-resource", clickCheck);
        $("#table-area").on("click", ".table-resource", clickCheck);



        /* 拖动交互 */
        if ($option.canDrag) {
            document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"/app-assets/vendors/css/ui/dragula.min.css\">");
            document.write("<script type=\"text/javascript\" src=\"/app-assets/vendors/js/extensions/dragula.min.js\"></script>");
            dragula([ document.getElementById("card-area") ]).on("drag", function() {
                alert(123);
            });
        }

        /* 开启resizeOn */
        this.$t = setInterval(resize, 100);

        /* 用户筛选和日期筛选 */
        if ($option.timeFilter || $option.userFiler) {
            if ($option.timeFilter) {
                document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"/app-assets/vendors/css/pickers/daterange/daterangepicker.css\">");
                document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"/app-assets/vendors/css/pickers/datetime/bootstrap-datetimepicker.css\">");
                document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"/app-assets/vendors/css/pickers/pickadate/pickadate.css\">");
                document.write("<script src=\"/app-assets/vendors/js/pickers/dateTime/moment-with-locales.min.js\" type=\"text/javascript\"></script>");
                document.write("<script src=\"/app-assets/vendors/js/pickers/daterange/daterangepicker.js\" type=\"text/javascript\"></script>");

                $("body").append("<!-- 著录时间model -->" +
                        "<div class=\"modal text-xs-left\" id=\"filter-time-modal\" role=\"dialog\" aria-labelledby=\"myModalLabel6\" aria-hidden=\"true\">" +
                            "<div class=\"modal-dialog\" role=\"document\">" +
                                "<div class=\"modal-content\">" +
                                    "<div class=\"modal-header\">" +
                                        "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">" +
                                            "<span aria-hidden=\"true\">×</span>" +
                                        "</button>" +
                                    "</div>" +
                                    "<div class=\"modal-body\">" +
                                        "<div class=\"input-group\">" +
                                            "<input type=\"text\" id=\"select-time-text\" class=\"form-control daterange\" readonly />" +
                                            "<span class=\"input-group-btn\">" +
                                                "<button id=\"select-time-btn\" class=\"btn btn-primary border-left-primary border-left-darken-3 dropdown-toggle\">选择时间</button>\n" +
                                            "</span>" +
                                        "</div>" +
                                    "</div>" +
                                    "<div class=\"modal-footer\">" +
                                        "<button type=\"button\" class=\"btn grey btn-outline-secondary\" data-dismiss=\"modal\">关闭</button>" +
                                        "<button type=\"button\" class=\"btn btn-outline-primary\" id=\"search-byuptime\">查询</button>" +
                                    "</div>" +
                                "</div>" +
                            "</div>" +
                        "</div>");
                // 添加筛选日期按钮
                $("#selectors-area > span").after("<div id=\"filter-time-button\" class=\"form-control form-control-sm btn btn-secondary btn-sm\">通过时间筛选</div>");
                $("#select-time-btn").click(function(){
                    $("#select-time-text").click()
                });
                $("#select-time-text").daterangepicker({
                    timePicker : false,
                    timePicker24Hour : true,
                    linkedCalendars : false,
                    timePickerSeconds:"secondNot",
                    locale : {
                        applyLabel:'确定',
                        cancelLabel:'取消',
                        fromLabel:'起始时间',
                        toLabel:'结束时间',
                        customRangeLabel:'自定义',
                        daysOfWeek:['日','一','二','三','四','五','六'],
                        monthNames:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
                        firstDay:1,
                        format:'YYYY-MM-DD'
                    },
                    timePickerIncrement:30
                }, function(start,end,label){});

            }

            if ($option.userFilter) {
                document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"/app-assets/vendors/css/forms/selects/select2.min.css\">");
                document.write("<script src=\"/app-assets/vendors/js/forms/select/select2.full.min.js\" type=\"text/javascript\"></script>");
                $("body").append("<!-- 选择用户modal -->" +
                    "<div class=\"modal text-xs-left\" id=\"filter-user-modal\" role=\"dialog\" aria-labelledby=\"myModalLabel6\" aria-hidden=\"true\">" +
                    "   <div class=\"modal-dialog modal-lg\" role=\"document\">" +
                    "       <div class=\"modal-content\">" +
                    "           <div class=\"modal-header\">" +
                    "               <h4 class=\"modal-title\" id=\"myModalLabel6\"><i class=\"fa fa-users\"></i> 查询用户</h4>" +
                    "               <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">" +
                    "                   <span aria-hidden=\"true\">&times;</span>" +
                    "               </button>" +
                    "           </div>" +
                    "           <div class=\"modal-body\">" +
                    "               <form class=\"form form-horizontal\">" +
                    "                   <div class=\"form-body\">" +
                    "                       <fieldset class=\"form-group\">" +
                    "                           <div class=\"text-bold-600 font-medium-2\">用户</div>" +
                    "                           <select class=\"select2-data-ajax form-control\" id=\"user-select\"></select>" +
                    "                           <p>输入用户名或邮箱.</p>" +
                    "                       </fieldset>" +
                    "                   </div>" +
                    "              </form>" +
                    "           </div>" +
                    "           <div class=\"modal-footer\">" +
                    "               <button type=\"button\" class=\"btn grey btn-outline-secondary\" data-dismiss=\"modal\">取消</button>" +
                    "               <button type=\"button\" class=\"btn btn-outline-primary\" id=\"filter-confirm\">确认</button>" +
                    "           </div>" +
                    "       </div>" +
                    "   </div>" +
                    "</div>");

                // 添加筛选用户按钮
                $("#selectors-area > span").after("<div id=\"filter-user-button\" class=\"form-control form-control-sm btn btn-secondary btn-sm\" >通过用户筛选</div>");
                // 初始化用户选择ajax select
                $(".select2-data-ajax").select2({
                    placeholder: "输入邮箱或用户名检索",
                    width : '100%',
                    ajax: {
                        url: "/oais/" + $option.siteId + "/user/repo/inject",
                        dataType: 'json',
                        delay: 250,
                        data: function (params) {
                            return {
                                q: params.term, // search term
                                page: params.page
                            };
                        },
                        processResults: function (data, params) {
                            params.page = params.page || 1;
                            return {
                                results: data.items,
                                pagination: {
                                    more: (params.page * 30) < data.total_count
                                }
                            };
                        },
                        cache: true
                    },
                    escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
                    minimumInputLength: 1,
                    templateResult: function(repo){
                        if (repo.loading) return repo.text;
                        if(repo.userIcon==null){
                            repo.userIcon = "/app-assets/images/portrait/small/avatar-s-1.png"
                        }
                        var markup = "<div class='select2-result-repository clearfix'>" +
                            "<div class='select2-result-repository__avatar'><img src='" + repo.userIcon + "' /></div>" +
                            "<div class='select2-result-repository__meta'>" +
                            "<div class='select2-result-repository__title'>" + repo.name+" ("+repo.username+") " + "</div>" +
                            "<div class='select2-result-repository__description'>" + repo.email + "</div>";
                        return markup;
                    },
                    templateSelection: function(repo){
                        if(repo.username!=null){
                            return repo.name + "  (" + repo.username + ")";
                        }
                    }
                });
            }
        }


    }

    this.init = function () {
        var html = [];
        var $flag = true; // 判断是否已经插入了某一种视图

        html.push("<div id='cardTableList-area'>");
        if (this.option.title)
            html.push("<h3>" + this.option.title + "</h3>");
        /* 插入标题行 */
        html.push("<div class='card'>");
        html.push('<div id="table-header">');
        html.push('<div class="table-header-blank"></div>');
        /* 批量操作按钮 */
        html.push('<div id="btn-batch-area" class="btn-batch">');

        /* buttons start */
        var buttons = "";
        if (isDefined(this.option.canBatchActive, true))
            buttons += "<button type=\"button\" class=\"btn mr-1 mb-1 btn-primary btn-sm\" id=\"btn-batch-active\">批量启用</button>";
        if (isDefined(this.option.canBatchForbid, true))
            buttons += "<button type=\"button\" class=\"btn mr-1 mb-1 btn-dark btn-sm\" id=\"btn-batch-forbid\">批量禁用</button>";
        if (isDefined(this.option.canBatchDelete, true))
            buttons += "<button type=\"button\" class=\"btn mr-1 mb-1 btn-danger btn-sm\" id=\"btn-batch-delete\">批量删除</button>";
        html.push(buttons);
        html.push("</div>");
        /* end buttons */

        /* 筛选框和搜索栏 start */
        html.push('<div id="selectAndsearch">');
        if (this.option.canSelect) {
            html.push('<div id="selectors-area"><span>筛选：</span>');
            for (var i in this.option.selectors) {
                var group = this.option.selectors[i];

                var select = "<select class=\"form-control form-control-sm btn btn-secondary btn-sm\">";
                for (var key in group)
                    select += "<option id=" + group[key] +">" + key + "</option>";
                select += "</select>";
                html.push(select);
            }
            html.push('</div>');
        }
        /* end 筛选框 */
        /* 搜索栏 */
        if (this.option.canSearch)
            html.push("<div id=\"search-area\">" +
                "<span>检索：</span>" +
                "<input placeholder=\"请输入关键词...\" id=\"search\" class=\"form-control form-control-sm\">" +
                "</div>");
        html.push('</div>');
        /* end 搜索栏 */
        if (this.option.viewImage || this.option.viewList || this.option.viewTable || this.option.orderList) {
            html.push('<div id="switch-area">');
            if (isDefined(this.option.viewImage, true)
                || isDefined(this.option.viewList, true)
                || isDefined(this.option.viewTable, true)) {
                html.push('<div class="dropdown nav-item"><a id="switch-menu"><i class="fa fa-list"></i></a>');
                html.push('<div class="dropdown-menu dropdown-menu-right">');
                if (isDefined(this.option.viewImage, true))
                    html.push('<a class="dropdown-item" id="card-view">' +
                        '<i class="ft-grid"></i>' +
                        '卡片视图' +
                        '</a>');
                if (isDefined(this.option.viewList, true))
                    html.push('<a class="dropdown-item" id="list-view">' +
                        '<i class="ft-list"></i>' +
                        '列表视图' +
                        '</a>');
                if (isDefined(this.option.viewTable, true))
                    html.push('<a class="dropdown-item" id="table-view">' +
                        '<i class="ft-align-justify"></i>' +
                        '表格视图' +
                        '</a>');
                html.push('</div>');
                html.push('</div>');
            }
            if (this.option.orderList) {
                html.push('<div class="dropdown nav-item"><a id="order-menu"><i class="fa fa-outdent"></i></a>');
                html.push('<div class="dropdown-menu dropdown-menu-right">');
                for (var key in this.option.orderList) {
                    var temp = "<a class=\"dropdown-item\" id=" + this.option.orderList[key] + ">" + key + "</a>";
                    html.push(temp);
                }
                html.push('</div>');
                html.push('</div>');

            }
            html.push('</div>');
        }
        html.push('</div>'); // close table-header
        /* 确认取消按钮 */
        html.push('<div id="batch-area" from="none">' +
            '           <div class="btn-batch">' +
            '                <button type="button" class="btn mr-1 mb-1 btn-primary btn-sm" id="all-select">全选</button>' +
            '                <button type="button" class="btn mr-1 mb-1 btn-drak btn-sm" id="confirm">确认</button>' +
            '                <button type="button" class="btn mr-1 mb-1 btn-danger btn-sm" id="cancel">取消</button>' +
            '           </div>' +
            '</div>');

        /* 缩略图展示区 */
        if (isDefined(this.option.viewImage, true)) {
            if ($flag && (isDefined(this.option.viewDefault, "list") == "card")) {
                $flag = false;
                html.push("<div class=\"row\" id=\"card-area\">");
            }
            else
                html.push("<div class=\"row\" style='display: none' id=\"card-area\">");

            for (var i in this.option.data) {
                html.push(card(this.option.data[i], this.option.thumbnailArgs || {}, Number(i)+1));
            }
            html.push("</div>");
        }

        /* 列表展示区 */
        if (isDefined(this.option.viewList, true)) {
            if ($flag && (isDefined(this.option.viewDefault, "list") == "list")) {
                html.push("<div id=\"list-area\"><table><tbody>");
                $flag = false;
            }
            else
                html.push("<div id=\"list-area\" style=\"display: none\"><table><tbody>");
            for (var i in this.option.data) {
                html.push(list(this.option.data[i], this.option.listArgs || {}, Number(i)+1));
            }
            html.push("</tbody></table></div>");
        }

        /* 表格展示区 */
        if (isDefined(this.option.viewTable, true)) {
            if ($flag && (isDefined(this.option.viewDefault, "list") == "table"))
                html.push("<div id=\"table-area\"><table><tbody>");
            else
                html.push("<div id=\"table-area\" style=\"display: none;\"><table><tbody>");
            html.push(table(null, this.option.tableArgs || {}, 0, true));
            for (var i in this.option.data) {
                html.push(table(this.option.data[i], this.option.tableArgs || {}, Number(i)+1, false));
            }
            html.push("</tbody></table></div>");
        }


        html.push("</div>");
        html.push("</div>"); // ALl END
        $("#" + this.option.position).empty().append(html.join(""));

        /* 绑定下拉菜单 */
        ["#switch-menu", "#order-menu"].forEach(function(item, index, arr) {
            $(item).click(function () {
                var parent = $(this).parent();
                if (parent.hasClass("show"))
                    parent.removeClass("show");
                else {
                    $("#switch-menu").parent().removeClass("show");
                    $("#order-menu").parent().removeClass("show");
                    parent.addClass("show");
                }
            });
        });

        /* 点击空白处隐藏菜单 */
        $(document).click(function (event) {
            var temp = $(event.target).parent();
            if (!$("#switch-menu").is(temp) && !$("#order-menu").is(temp)) {
                var menus = $("#switch-area").children();
                menus.each(function (index, item) {
                    if ($(this).hasClass("show"))
                        $(this).removeClass("show");
                });
            }
        });

        afterInit();
    };

    this.setOption = function (option) {
        this.option = option;
        $option = option;
    };

    this.addCardElement = function (data) {
        $("#card-area").append(card(data, $option['thumbnailArgs'], $("#card-area").children.length + 1));
    };

    this.addListElement = function (data) {
        $("#list-area > table > tbody").append(list(data, $option['listArgs'], $(".list-resource").length + 1));
    };

    this.addTableElement = function (data) {
        $("#table-area > table > tbody").append(table(data, $option['tableArgs'], $(".table-resource").length), false);
    };

    this.reset = function (datas) {
        $("#card-area").empty();
        $("#list-area > table > tbody").empty();
        $("#table-area > table > tbody").children().each(function (index, item) {
            if (index != 0) {
                $(item).remove();
            }
        });

        for (var i in datas) {
            var e = datas[i];
            if (isDefined($option.viewImage, true))
                this.addCardElement(e);
            if (isDefined($option.viewList, true))
                this.addListElement(e);
            if (isDefined($option.viewTable, true))
                this.addTableElement(e);
        }

        resize();

    };

    this.bindSearch = function(f) {
        $("#search").on("click", f);
    };

    this.bindView = function(f) {
        $("#cardTableList-area").on("click", "[name=view]", f);
    };

    this.bindEdit = function(f) {
        $("#cardTableList-area").on("click", "[name=edit]", f);
    };

    this.bindDelete = function(f) {
        $("#cardTableList-area").on("click", "[name=delete]", f);
    };

    this.setStatusMap = function(map) {
        this.statusMap = map;
        statusMap = this.statusMap;
    };

    this.setResourceTypeMap = function(map) {
        this.resourceTypeMap = map;
        resourceTypeMap = map;
    };

    this.getHelp = function() {
        console.log(this.optionExample);
    };

    this.resizeOn = resize;

    this.init();
}