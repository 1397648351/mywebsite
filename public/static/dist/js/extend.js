(function ($) {
    $.fn.typewriter = function (pin) {
        var p = $.extend(true, {
            timeout: 75
        }, pin || {});
        this.each(function () {
            var $ele = $(this), str = $ele.html(), progress = 0;
            $ele.html('');
            var timer = setInterval(function () {
                var current = str.substr(progress, 1);
                if (current == '<') {
                    progress = str.indexOf('>', progress) + 1;
                } else {
                    progress++;
                }
                $ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
                if (progress >= str.length) {
                    clearInterval(timer);
                }
            }, p.timeout);
        });
        return this;
    };
    $.extend({
        random: function (min, max) {
            return Math.random() * (max - min) + min
        },
        randomInt: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        rgba: function (r, g, b, a) {
            return "rgba(" + r + "," + g + "," + b + "," + a + ")";
        },
        rotate: function (x0, y0, x, y, angle) {
            return {
                x: (x - x0) * Math.cos(angle) - (y - y0) * Math.sin(angle) + x0,
                y: (x - x0) * Math.sin(angle) + (y - y0) * Math.cos(angle) + y0
            };
        }
    })
})(jQuery);