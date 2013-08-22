root = exports ? this

root.App.Animations = do (lng = Lungo, $ = Quo) ->

	ANIMATIONS_END_EVENTS = ["webkitAnimationEnd", "animationend"]

	init = () ->
		$body = lng.dom "body"
		for event in ANIMATIONS_END_EVENTS
			$body.delegate "[data-animation]", event, _onAnimationEnd


	_onAnimationEnd = (event) ->
		$el = lng.dom event.target
		$el.removeAttr "data-animation-direction"
		$el.removeClass "animating"
		console.warn "animationEnd in ", $el


	$.fn.animate = (animation, direction) ->
		@data("animation", animation).data("animation-direction", direction).addClass("animating")

	init: init,
