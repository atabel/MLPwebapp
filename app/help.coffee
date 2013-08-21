root = exports ? this

root.App.Help = do (lng=Lungo) ->

	_container = lng.dom "<div></div>"

	show = (html) ->
		_container.html html
		_container.show()



	_init = () ->
		lng.dom("body").append _container[0]
		_container.hide()
		_container.style "position", "absolute"
		_container.style "width", "100%"
		_container.style "height", "100%"
		_container.style "z-index", "5"
		_container.style "background", "none"
		_container.style "background-color", "rgba(0, 0, 0, 0.8)"

	hide = ->
		_container.hide()

	lng.ready ->
		_init()

	{
		show: show
		hide: hide
	}
