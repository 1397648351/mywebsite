;!function (window) {
    "use strict";
    var myjs = function () {
        this.hasPjax = false;
    };
    myjs.prototype.init = function (pin) {
        var options = $.extend(true, {}, pin || {});
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
        if (typeof v == 'undefined')
            v = progress.data('percent');
        if (typeof v == 'undefined') v = 0;
        if (typeof v == 'number')
            progress.css('width', v + "%");
        else if (v.indexOf('%') > -1 || v.indexOf('px') > -1)
            progress.css('width', v);
    };
    myjs.prototype.pjax = function (pin) {
        var options = $.extend(true, {
            element: null,
            bar: '.progress-bar',
            loadingClass: 'is-loading',
            title_prefix: '',
            title: 'data-title',
            readyCallback: null,
            startCallback: null,
            sendCallback: null,
            clickedCallback: null,
            beforeReplaceCallback: null,
            completeCallback: null,
        }, pin || {});
        if (!options.element) return;
        var ele = $(options.element);
        if (!ele) return;
        var bar = ele.find(options.bar).get(0);
        if (!bar) return;
        this.hasPjax = true;
        $(document).pjax('[data-pjax] a, a[data-pjax]', '#pjax-container');
        if (options.readyCallback && typeof options.readyCallback === "function") {
            options.readyCallback();
        }
        $(document).on('pjax:start', function () {
            my.progress(options.element, 0);
            bar.clientWidth;
            ele.addClass(options.loadingClass);
            if (options.startCallback && typeof options.startCallback === "function") {
                options.startCallback();
            }
        });
        $(document).on('pjax:send', function () {
            my.progress(options.element, 15);
            if (options.sendCallback && typeof options.sendCallback === "function") {
                options.sendCallback();
            }
        });
        $(document).on('pjax:clicked', function (event) {
            options.title && $(event.target).attr(options.title) && (document.title = (options.title_prefix ? options.title_prefix : '') + $(event.target).attr(options.title));
            my.progress(options.element, 30);
            if (options.clickedCallback && typeof options.clickedCallback === "function") {
                options.clickedCallback();
            }
        });
        $(document).on('pjax:beforeReplace', function () {
            my.progress(options.element, 80);
            if (options.beforeReplaceCallback && typeof options.beforeReplaceCallback === "function") {
                options.beforeReplaceCallback();
            }
        });
        $(document).on('pjax:complete', function (event, opts, textStatus, xhr) {
            my.progress(options.element, 100);
            ele.removeClass(options.loadingClass);
            if (options.completeCallback && typeof options.completeCallback === "function") {
                options.completeCallback(event, opts, textStatus, xhr);
            }
        });
        $(document).on('pjax:popstate', function (event) {
            console.log(event);
        });
        $(document).on('pjax:click', function (event, xhr) {
        });
    };
    window.my = new myjs();
}(window);