class __View.Countryli extends Monocle.View

	events:
		"tap li.country-li": "onClickLi"

	container: "article#all-primas ul"
	
	template_url: "app/resources/templates/country_li.mustache"

	onClickLi: (evt) =>
		@model.active()