$(function () {
    layui.config({
        version: false, //一般用于更新模块缓存，默认不开启。设为true即让浏览器不缓存。也可以设为一个固定的值，如：201610
        debug: false, //用于开启调试模式，默认false，如果设为true，则JS模块的节点会保留在页面
        base: '/static/vendor/layui/lay/extramodules/' //设定扩展的Layui模块的所在目录，一般用于外部模块扩展
    });
    layui.use('element', function(){
        var element = layui.element;
        $(document).pjax('a[data-pjax]', '#pjax-container');
        $(document).on('pjax:start', function () {
            layui.cache.event = {};
        });
        $(document).on('pjax:clicked', function (event) {
            document.title = 'bitms-' + event.target.innerHTML;
        });
        $(document).on('pjax:popstate', function (event) {
            console.log(event);
        });
        $(document).on('pjax:send', function () {
            $('#page_progress').css('display','block');
            element.progress('page-progress','50%');
        });
        $(document).on('pjax:beforeReplace', function () {
            element.progress('page-progress','80%');
        });
        $(document).on('pjax:complete', function () {
            element.progress('page-progress','100%');
            setTimeout(function () {
                $('#page_progress').css('display','none');
                element.progress('page-progress','0%');
            },400);
        });
    });
    if ($('.layui-side-menu .layui-this').length > 0) {
        var curitem = $('.layui-side-menu .layui-this');
        document.title = 'bitms-' + curitem.text();
        if (curitem.parent().parent().hasClass('layui-nav-item')) {
            curitem.parent().parent().addClass('layui-nav-itemed');
        }
    }
});