var Heart = function (ctx, x, y, size, count) {
    this.ctx = ctx;
    this.ctx.lineWidth = 1;
    this.ctx.fillStyle = $.rgba($.random(Garden.options.color.rmin, Garden.options.color.rmax), $.random(Garden.options.color.gmin, Garden.options.color.gmax), $.random(Garden.options.color.bmin, Garden.options.color.bmax), Garden.options.color.opacity);
    this.ctx.strokeStyle = $.rgba($.random(Garden.options.color.rmin, Garden.options.color.rmax), $.random(Garden.options.color.gmin, Garden.options.color.gmax), $.random(Garden.options.color.bmin, Garden.options.color.bmax), 1);
    this.x0 = x;
    this.y0 = y;
    this.size = size;
    this.count = count;
    this.points = [];
    for (var i = 0; i < this.count; i++) {
        var step = i / this.count * (Math.PI * 2);
        this.points.push({
            x: this.x0 + this.size * 16 * Math.pow(Math.sin(step), 3),
            y: this.y0 - this.size * (13 * Math.cos(step) - 5 * Math.cos(2 * step) - 2 * Math.cos(3 * step) - Math.cos(4 * step))
        });
    }
};
Heart.prototype.draw = function (angle) {
    this.ctx.beginPath();
    for (var i = 0; i < this.points.length; i++) {
        var xy = $.rotate(this.x0, this.y0, this.points[i].x, this.points[i].y, angle);
        this.ctx.lineTo(xy.x, xy.y);
    }
    this.ctx.closePath();
    this.ctx.stroke();
};

Heart.prototype.drawFlower = function () {
    for (var i = 0; i < this.count; i++) {

    }
};

var Flower = function (ctx, x, y, size, petals) {
    this.ctx = ctx;
    this.ctx.lineWidth = 1;
    this.ctx.fillStyle = $.rgba($.random(Garden.options.color.rmin, Garden.options.color.rmax), $.random(Garden.options.color.gmin, Garden.options.color.gmax), $.random(Garden.options.color.bmin, Garden.options.color.bmax), 0.1);
    this.x0 = x;
    this.y0 = y;
    this.size = size;
    this.count = 300;
    this.petals = petals;
    this.points = [];
    for (var i = 0; i < this.count; i++) {
        var step = i / this.count * (Math.PI * 2);
        this.points.push({
            x: this.x0 + this.size * Math.sin(4 * step) * Math.cos(step),
            y: this.x0 + this.size * Math.sin(4 * step) * Math.sin(step),
        });
    }
};

Flower.prototype.draw = function (angle) {
    this.ctx.beginPath();
    for (var i = 0; i < this.points.length; i++) {
        var xy = $.rotate(this.x0, this.y0, this.points[i].x, this.points[i].y, angle);
        this.ctx.lineTo(xy.x, xy.y);
    }
    this.ctx.closePath();
    this.ctx.fill();
};

var Garden = function(){

};

Garden.options = {
    color: {
        rmin: 128,
        rmax: 255,
        gmin: 0,
        gmax: 128,
        bmin: 0,
        bmax: 128,
        opacity: 0.1
    }
};