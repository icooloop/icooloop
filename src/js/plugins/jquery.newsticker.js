(function ($) {
    function init(opts, obj) {
        this.config = $.extend({}, {
            height: 60,
            speed: 800,
            start: 0,
            interval: 3000,
            move: null
        }, opts);
        var self = this;
        this.$newsticker = obj;
        this.$prevBtn = this.$newsticker.find('.prev');
        this.$nextBtn = this.$newsticker.find('.next');
        this.$frame = this.$newsticker.children('ul');
        this.$item = this.$frame.children('li');
        this.$next = null;
        this.stop = false;

        function init() {
            self.$item.eq(0).addClass('current'); //set start item
            suspend();
            self.animate();
        };

        function suspend() {
            self.$newsticker.on('mouseover mouseout', function (e) {
                if (e.type == 'mouseover') {
                    self.stop = true;
                } else { //mouseout
                    self.stop = false;
                }
            });
            self.$prevBtn.on('click', function (e) {
                self.move('prev')
            });
            self.$nextBtn.on('click', function (e) {
                self.move('next')
            });
        };
        init();
    }

    init.prototype = {
        move: function (direction) {
            var self = this;
            var $current = self.$frame.find('.current');
            var drt = direction === 'prev' ? '+=' : '-=';
            self.$frame.animate({
                top: drt + self.config.height + 'px'
            }, self.config.speed, function () {
                self.$next = self.$frame.find('.current').next();
                self.$next.addClass('current');
                $current.removeClass('current');
                $current.clone().appendTo(self.$frame);
                $current.remove();
                self.$frame.css('top', self.config.start + 'px');
            });

        },
        animate: function () {
            var self = this;
            setInterval(function () {
                if (!self.stop) {
                    self.move();
                }
            }, self.config.interval);
        }
    }
    // initialize every element
    $.fn.newsticker = function (opts) {
        this.each(function () {
            var $self = $(this);
            var newSticker = $self.data('newSticker');
            if (typeof opts == 'opts') {
                newSticker.init['move'](opts);
            } else {
                if (!newSticker) $self.data('newSticker', (newSticker = new init(opts, $self)));
            }
        });
        return this;
    };
})(jQuery);