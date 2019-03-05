;!function (window) {
    "use strict";
    var myjs = function () {
        // this
    };
    myjs.prototype.init = function () {
        var th = this, progress = $('.progress');
        if (progress.length > 0) {
            progress.each(function (index, element) {
                if (element.id !== 'page_progress')
                    th.progress(element);
            })
        }
    };
    myjs.prototype.progress = function (e, v) {
        var ele = $(e);
        if (ele.length <= 0) return;
        var progress = ele.find('.progress-bar');
        if (typeof (v) == 'undefined')
            v = progress.data('percent');
        if (typeof (v) == 'undefined') v = 0;
        if (typeof (v) == 'number')
            progress.css('width', v + "%");
        else if (v.indexOf('%') > -1 || v.indexOf('px') > -1)
            progress.css('width', v);
    };
    myjs.prototype.pjax = function () {
        var ele = $("#page_progress");
        var bar = $("#page_progress .progress-bar").get(0);
        if (!bar) return;
        $(document).pjax('[data-pjax] a, a[data-pjax]', '#pjax-container');
        $(document).on('pjax:start', function () {
            my.progress('#page_progress', 0);
            bar.clientWidth;
            ele.addClass('is-loading');
        });
        $(document).on('pjax:send', function () {
            my.progress('#page_progress', 15);
        });
        $(document).on('pjax:clicked', function (event) {
            document.title = 'bitms-' + event.target.innerHTML;
            my.progress('#page_progress', 30);
        });
        $(document).on('pjax:beforeReplace', function () {
            my.progress('#page_progress', 80);
        });
        $(document).on('pjax:complete', function () {
            my.progress('#page_progress', 100);
            $("#page_progress").removeClass('is-loading');
        });
        $(document).on('pjax:popstate', function (event) {
            console.log(event);
        });
    };
    window.my = new myjs();
}(window);