(function() {
    var scripts = document.getElementsByTagName('script'),
        localhostTests = [
            /^localhost$/,
            /\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(:\d{1,5})?\b/ // IP v4
        ],
        host = window.location.hostname,
        isDevelopment = null,
        queryString = window.location.search,
        test, path, i, ln, scriptSrc, match;

    for (i = 0, ln = scripts.length; i < ln; i++) {
        scriptSrc = scripts[i].src;

        match = scriptSrc.match(/bootstrap\.js$/);

        if (match) {
            path = scriptSrc.substring(0, scriptSrc.length - match[0].length);
            break;
        }
    }

    if (queryString.match('(\\?|&)debug') !== null) {
        isDevelopment = true;
    }
    else if (queryString.match('(\\?|&)nodebug') !== null) {
        isDevelopment = false;
    }

    if (isDevelopment === null) {
        for (i = 0, ln = localhostTests.length; i < ln; i++) {
            test = localhostTests[i];

            if (host.search(test) !== -1) {
                isDevelopment = true;
                break;
            }
        }
    }

    if (isDevelopment === null && window.location.protocol === 'file:') {
        isDevelopment = true;
    }
    
    var html = '';
    // ------------------------------------------------- Include lib Start -------------------------------------------------
    // import base css files
    var cssArray = new Array(
    	'bootstrap/css/bootstrap', // bootstrap
    	'bootstrap/css/bootstrap-responsive', // bootstrap
    	'we/css/r-bootstrap', // bootstrap
    	'font-awesome/css/font-awesome', // font-awesome
    	'shelf/css/erp', // 基础架构
    	'shelf/css/erp-response', // 基础架构
    	'shelf/css/erp-rewrite', // 基础架构
    	'chosen/css/chosen', // 下拉框样式
    	'iCheck/skins/minimal/minimal', // 单选/复选框
    	'mmGrid/$grid', // mmGrid
    	'mmGrid/theme/bootstrap/$grid.bootstrap', // mmGrid
    	'msgbox/css/msgBoxLight', // 提示
    	'popup/css/popup-bootstrap', // 弹出窗popup
    	'xwin/css/xwin', // 弹出查询
    	'zTree/css/zTreeStyle', // 树
    	'smooth-confirm/css/smoothConfirm', // 一个类似于新浪微博的确认提示框
    	'we/css/r-chosen', // 自己的样式
    	'we/css/r-iCheck', // 自己的样式
    	'upload/css/upload.bootstrap',//上传
    	'getJqGrid/css/jquery-ui.theme',//Grid外观
    	'getJqGrid/css/jquery.searchFilter',//搜索
    	'getJqGrid/css/ui.jqgrid',//默认样式
    	'getJqGrid/css/ui.multiselect',//选择行样式
    	'getJqGrid/css/jquery-ui'//选择行样式
    );
    for (var i = 0, ln = cssArray.length; i < ln; i++) {
    	html += '<lin' + 'k rel="stylesheet" type="text/css" href="' + path + cssArray[i] + (isDevelopment ? '' : '.min') + '.css"/>';
    }
    
    // import others css files
    // font-awesome
    html += '<!--[if IE 7]>';
    html += '<lin' + 'k rel="stylesheet" type="text/css" href="' + path + 'font-awesome/css/font-awesome-ie7' + (isDevelopment ? '' : '.min') + '.css"/>';
    html += '<![endif]-->';
    // 基础架构
    html += '<!--[if lte IE 8]>';
    html += '<lin' + 'k rel="stylesheet" type="text/css" href="' + path + 'shelf/css/erp-ie' + (isDevelopment ? '' : '.min') + '.css"/>';
    html += '<![endif]-->';
    
    // import base javascript file
    var jsArray = new Array(
        'jquery/jquery-1.8.3', // jquery
        'we/js/context', // 上下文
        'handlebars/js/handlebars-1.0.0', // 字符串拼接
        'bootstrap/js/bootstrap', // bootstrap
        'shelf/js/erp-elements', // 基础架构
        'shelf/js/erp', // 基础架构
        'chosen/js/chosen.jquery', // 下拉框样式
        'My97DatePicker/WdatePicker', // 日期
        'iCheck/jquery.icheck', // 单选/复选框
        'mmGrid/$grid', // mmGrid
        'msgbox/js/jquery.msgBox', // 提示
        'popup/js/popup-bootstrap', // 弹出窗popup
        'iCheck/jquery.icheck', // 弹出查询
        'xwin/js/jquery.xwin', // 单选/复选框
        'zTree/js/jquery.ztree.all-3.5', // 树
        'smooth-confirm/js/jquery.smoothConfirm', // 一个类似于新浪微博的确认提示框
        'valid/js/jquery.validate', // 校验
        'we/js/client', // 公用方法
        'we/js/init', // 公用方法
        'we/js/pui', // 公用方法
        'we/js/jquery.pui', // 公用方法
        'upload/js/jquery.upload',//上传
        'getJqGrid/js/grid.locale-en',//英文Grid
        'getJqGrid/js/jquery.contextmenu',//内容
        'getJqGrid/js/jquery.jqGrid.min-3.8',//Grid_Min
        'getJqGrid/js/jquery.tablednd',//Grid底部，用于底部导航栏增删改
        'ajaxFileUpload/ajaxfileupload'//文件上传
        
        
    );
    for (var i = 0, ln = jsArray.length; i < ln; i++) {
    	html += '<scr' + 'ipt type="text/javascript" charset="UTF-8" src="' + path + jsArray[i] + (isDevelopment ? '' : '.min') + '.js"></scr' + 'ipt>';
    }
    // ------------------------------------------------- Include PUI lib End -------------------------------------------------
    document.write(html);
})();
