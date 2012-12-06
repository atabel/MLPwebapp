/**
 * Creates a instance of Carousel Element
 *
 * @namespace Lungo.Sugar
 * @class Carousel
 * @version 1.0
 *
 * @author Abel Toledano <atabel87@gmail.com>
 * @author Ignacio Olalde <ina@tapquo.com> || @piniphone
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */


Lungo.Sugar.Carousel = function(element, callback) {

    var _instance = {
        index: 0,
        speed: 300,
        callback: callback,
        container: element,
        element: element.children[0],
        slide: undefined,
        slides: [],
        slides_length: 0,
        width: 0,
        start: {},
        isScrolling: undefined,
        deltaX: 0
    };

    var position = function() {
        return _instance.index;
    };

    var prev = function(delay) {
        if (_instance.index) {
            slide(_instance.index-1, _instance.speed);
        }
    };

    var next = function(delay) {
        if (_instance.index < _instance.slides_length - 1) {
            slide(_instance.index + 1, _instance.speed);
        } else {
            slide(0, _instance.speed);
        }
    };

    var append = function(newEl) {
        Lungo.dom(_instance.element).append(newEl);
        _setup();
    };

    var prepend = function(newEl) {
        Lungo.dom(_instance.element).prepend(newEl);
        _instance.index += 1;
        _setup();
    };

    var _setup = function() {
        _instance.container.style.overflow = 'hidden';
        _instance.element.style.listStyle = 'none';
        _instance.element.style.margin = 0;
        _instance.slides = _instance.element.children;
        _instance.slides_length = _instance.slides.length;
        if (_instance.slides_length < 2) return null;
        _instance.width = ("getBoundingClientRect" in _instance.container) ?
                            _instance.container.getBoundingClientRect().width :
                            _instance.container.offsetWidth;

        if (!_instance.width) return null;
        _instance.container.style.visibility = 'hidden';
        _instance.element.style.width = (_instance.slides.length * _instance.width) + 'px';
        var index = _instance.slides.length;
        while (index--) {
            var el = _instance.slides[index];
            el.style.width = _instance.width + 'px';
            el.style.display = 'table-cell';
            el.style.verticalAlign = 'top';
        }
        slide(_instance.index, 0);
        _instance.container.style.visibility = 'visible';
    };

    var slide = function(index, duration) {
        var style = _instance.element.style;
        if (duration == undefined) {
            duration = _instance.speed;
        }
        if (index < 0 || index >= _instance.slides_length) {
            return null;
        }
        style.webkitTransitionDuration = style.MozTransitionDuration =
        style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration =
        duration + 'ms';

        style.MozTransform = style.webkitTransform = 'translate3d(' + -(index * _instance.width) + 'px,0,0)';
        style.msTransform = style.OTransform = 'translateX(' + -(index * _instance.width) + 'px)';
        _instance.index = index;
    };

    var _handleGestures = function() {
        _instance.element.addEventListener('touchstart', _touchStart, false);
        _instance.element.addEventListener('touchmove', _touchMove, false);
        _instance.element.addEventListener('touchend', _touchEnd, false);
        _instance.element.addEventListener('webkitTransitionEnd', _transitionEnd, false);
        _instance.element.addEventListener('msTransitionEnd', _transitionEnd, false);
        _instance.element.addEventListener('oTransitionEnd', _transitionEnd, false);
        _instance.element.addEventListener('transitionend', _transitionEnd, false);
        window.addEventListener('resize', _setup, false);
    };

    var _touchStart = function(event) {
        _instance.start = {
            pageX: event.touches[0].pageX,
            pageY: event.touches[0].pageY,
            time: Number(new Date())
        };
        _instance.isScrolling = undefined;
        _instance.deltaX = 0;
        _instance.element.style.MozTransitionDuration = _instance.element.style.webkitTransitionDuration = 0;
        event.stopPropagation();
    };

    var _touchMove = function(e) {
        if(e.touches.length > 1 || e.scale && e.scale !== 1) return;
        _instance.deltaX = e.touches[0].pageX - _instance.start.pageX;
        if ( typeof _instance.isScrolling == 'undefined') {
            _instance.isScrolling = !!( _instance.isScrolling || Math.abs(_instance.deltaX) < Math.abs(e.touches[0].pageY - _instance.start.pageY) );
        }
        if (!_instance.isScrolling) {
            e.preventDefault();
            var factor = ((!_instance.index && _instance.deltaX > 0
                    || _instance.index == _instance.slides_length - 1
                    && _instance.deltaX < 0
                    ) ?
                    (Math.abs(_instance.deltaX) / _instance.width + 1)
                    :1);
            _instance.deltaX = _instance.deltaX / factor;
            var pos = (_instance.deltaX - _instance.index * _instance.width);
            _instance.element.style.MozTransform = _instance.element.style.webkitTransform = 'translate3d(' + pos + 'px,0,0)';
            e.stopPropagation();
        }
    };

    var _touchEnd = function(e) {
        var isValidSlide =
            Number(new Date()) - _instance.start.time < 250
            && Math.abs(_instance.deltaX) > 20
            || Math.abs(_instance.deltaX) > _instance.width/2;
        var isPastBounds =
            !_instance.index && _instance.deltaX > 0
            || _instance.index == _instance.slides_length - 1
            && _instance.deltaX < 0;
        if (!_instance.isScrolling) {
            slide( _instance.index + ( isValidSlide && !isPastBounds ? (_instance.deltaX < 0 ? 1 : -1) : 0 ), _instance.speed );
        }
        e.stopPropagation();
    };

    var _transitionEnd = function(event) {
        if(_instance.callback) {
            _instance.callback.apply(_instance.callback, [_instance.index, _instance.slides[_instance.index]]);
        }
    };

    _setup();
    _handleGestures();

    return {
        prev: prev,
        next: next,
        position: position,
        slide: slide,
        append: append,
        prepend: prepend
    };
};