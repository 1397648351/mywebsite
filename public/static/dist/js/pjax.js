$(document).pjax('a[data-pjax]', '#pjax-container');
$(document).on('pjax:start', function () {
    my.progress('#page_progress', 0);
    $("#page_progress").addClass('is-loading');
});
$(document).on('pjax:clicked', function (event) {
    document.title = 'bitms-' + event.target.innerHTML;
    my.progress('#page_progress', 15);
});
$(document).on('pjax:popstate', function (event) {
    console.log(event);
});
$(document).on('pjax:send', function () {
    $('#page_progress').css('display', 'block');
    my.progress('#page_progress', 50);
});
$(document).on('pjax:beforeReplace', function () {
    my.progress('#page_progress', 80);
});
$(document).on('pjax:complete', function () {
    my.progress('#page_progress', 100);
    $("#page_progress").removeClass('is-loading');
});