
var pdrscroll = (function(lng) {
	
	var CACHE_KEY = 'pdrscrolls';
	
	var PULL_DOWN_EVENT = 'pulldownrefresh';
	
	var PDTR_MSG = 'Tira hacia abajo para actualizar...';
	var RTR_MSG = 'Suelta para actualizar...';
	var LOADING_MSG = 'Cargando...';
	
	var init = function (id) {
		//remove de lng scroll if exists
		lng.View.Scroll.remove(id);
		
		//create our own scroll with pull down to refresh features:
		_createScrollIndexInCache();
		var scrolls = lng.Data.Cache.get(CACHE_KEY);
		
		if(! scrolls[id]) {
			scrolls[id] = _createNewScroll(id);
		} else {
			refresh(id);
		}
	};
	
	var refresh = function(id) {
		var scrolls = lng.Data.Cache.get(CACHE_KEY);
		if(scrolls[id]) {
			scrolls[id].destroy();
			scrolls[id] = undefined;
			init(id);
		}
	};
	
	var _createScrollIndexInCache = function() {
        if (!lng.Data.Cache.exists(CACHE_KEY)) {
            lng.Data.Cache.set(CACHE_KEY, {});
        }
    };
	
	var _createNewScroll = function (id) {
		
		var $$id = $$("#"+id);
		
		if ($$id.children().children(".pull-down").length == 0) {
			var pullDownEl_markup = '<div class="pull-down"> \
				<span class="pull-down-icon"></span><span class="pull-down-label">{{msg}}</span> \
			</div>';
		
			lng.View.Template.create('pde-tpl', pullDownEl_markup);
			var elhtml = lng.View.Template.markup('pde-tpl', {msg: PDTR_MSG});
		
			var innerhtml = $$id.prepend(elhtml).html();
			$$id.prepend(elhtml).html("<div class='scrollwrapper'>"+innerhtml+"</div>");
		}
		
		var pullDownEl = $$id.children().children(".pull-down");
		var pullDownOffset = pullDownEl[0].offsetHeight;
		
		var newScroll = new iScroll(id, {
			useTransition: true,
			
			momentum: true,
	        lockDirection: true,
	        fixedScrollbar: true,
	        fadeScrollbar: true,
	        hideScrollbar: true,
	        
			topOffset: pullDownOffset,
			onRefresh: function () {
				if (pullDownEl.hasClass('loading')) {
					pullDownEl.removeClass('loading');
					pullDownEl.children('.pull-down-label').html(PDTR_MSG);
				}
			},
			onScrollMove: function () {
				if (this.y > 5 && !pullDownEl.hasClass('flip')) {
					pullDownEl.addClass('flip');
					pullDownEl.children('.pull-down-label').html(RTR_MSG);
					this.minScrollY = 0;
				} else if (this.y < 5 && pullDownEl.hasClass('flip')) {
					pullDownEl.removeClass('flip');
					pullDownEl.children('.pull-down-label').html(PDTR_MSG);
					this.minScrollY = -pullDownOffset;
				}
			},
			onScrollEnd: function () {
				if (pullDownEl.hasClass('flip')) {
					pullDownEl.removeClass('flip').addClass('loading');
					pullDownEl.children('.pull-down-label').html(LOADING_MSG);			
					$$id.trigger(PULL_DOWN_EVENT);
				}
			}
		});
		return newScroll;
	};
	
	return {
		init: init,
		refresh: refresh
	}
	
})(LUNGO)