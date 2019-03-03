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
    $('#page_progress').css('display', 'block');
    element.progress('page-progress', '50%');
});
$(document).on('pjax:beforeReplace', function () {
    element.progress('page-progress', '80%');
});
$(document).on('pjax:complete', function () {
    element.progress('page-progress', '100%');
    setTimeout(function () {
        $('#page_progress').css('display', 'none');
        element.progress('page-progress', '0%');
    }, 400);
});