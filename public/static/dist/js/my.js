;!function (window) {
    "use strict";
    var myjs = function () {
        // this
    };
    myjs.prototype.init = function () {
        var th = this, progress = $('.progress');
        if (progress.length > 0) {
            progress.each(function (index, element) {
                th.progress(element)
            })
        }
    };
    myjs.prototype.progress = function (e, v) {
        var ele = $(e);
        if (ele.length <= 0) return;
        var progress = ele.find('.progress-bar');
        if(typeof(v) == 'undefined')
            v = progress.data('percent');
        if(typeof(v) == 'undefined') v = 0;
        if (typeof (v) == 'number')
            progress.css('width', v + "%");
        else if (v.indexOf('%') > -1 || v.indexOf('px') > -1)
            progress.css('width', v);
    };
    myjs.prototype.pjax = function(){

    };
    window.my = new myjs();
}(window);